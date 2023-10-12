import { Player, PlayerJSON } from "../player";
import { MonopolyModes, history, GameTrading, MonopolyMode, botInitial } from "../types.ts";
import { io } from "../sockets.ts";
import monopolyJSON from "../monopoly.json";
export async function main(host: string, initials: botInitial) {
    const socket = await io(host);

    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );
    // @ts-ignore
    let currentId: string = "";
    let clients = new Map<string, Player>();
    let selectedMode: MonopolyMode = MonopolyModes[0];
    // @ts-ignore
    let trade: GameTrading | boolean | undefined = undefined;

    //#region engineref
    const engineRef: {
        diceResults: (args: { l: [number, number]; time: number; onDone: () => void }) => void;
        setStreet: (args: {
            location: number;
            rolls: number;
            onResponse: (action: "nothing" | "buy" | "someones" | "special_action" | "advance-buy", info: object) => void;
        }) =>
            | {
                  actions: number[] | string[];
                  action: (act: number | string) => void;
              }
            | undefined;
    } = {
        diceResults: (args) => {
            setTimeout(() => {
                args.onDone();
            }, args.time);
        },
        setStreet: (args) => {
            // find data based on location
            const localPlayer = clients.get(socket.id);

            const x = propretyMap.get(args.location);

            if (x && args.location !== -1 && args.location < 40 && args.location >= 0) {
                function searchForButtons(
                    advanced: boolean,
                    location: number,
                    fartherInfo?: {
                        rolls: number;
                    }
                ) {
                    if (advanced) {
                        const _property = propretyMap.get(location);
                        if (!_property) return;

                        if (localPlayer === undefined) return;
                        const propId = Array.from(new Map(localPlayer.properties.map((v, i) => [i, v])).entries()).filter(
                            (v) => v[1].posistion === args.location
                        )[0][0];

                        function transformCount(v: 0 | 2 | 1 | 3 | 4 | "h") {
                            switch (v) {
                                case "h":
                                    return 5;

                                default:
                                    return v;
                            }
                        }
                        const actions = ["continue"];
                        const genereatedActions: { [key: string]: () => void } = {};
                        const count: number = transformCount(localPlayer.properties[propId].count);
                        for (let index = count + 1; index < 6; index++) {
                            const actionName = `${index}houses${index > 1 ? "s" : ""}`;

                            if (!((index - count) * (_property.housecost ?? 0) > localPlayer.balance ?? 0)) {
                                actions.push(actionName);
                                genereatedActions[actionName] = () => {
                                    args.onResponse("advance-buy", {
                                        state: index,
                                        money: index - count,
                                    });
                                };
                            }
                        }
                        return {
                            actions,
                            action(act: number | string) {
                                if (act === "continue") {
                                    args.onResponse("nothing", {});
                                } else if (act === "hotel") {
                                    args.onResponse("advance-buy", {
                                        state: 5,
                                        money: 1,
                                    });
                                } else {
                                    if (typeof act === "string" && Object.keys(genereatedActions).includes(act)) {
                                        genereatedActions[act]();
                                    } else args.onResponse("nothing", {});
                                }
                            },
                        };
                    } else {
                        return {
                            actions: ["buy", "cancel"],
                            action(act: number | string) {
                                if (act === "buy") {
                                    if (fartherInfo !== undefined)
                                        args.onResponse("special_action", {
                                            rolls: fartherInfo.rolls,
                                        });
                                    else args.onResponse("buy", {});
                                } else {
                                    args.onResponse("nothing", {});
                                }
                            },
                        };
                    }
                }

                var belong_to_me = false;
                var belong_to_others = false;
                var count: 0 | 1 | 2 | 3 | 4 | "h" = 0;
                // check states
                if (localPlayer === undefined) return;
                for (const _prp of localPlayer.properties) {
                    if (!belong_to_me && _prp.posistion === args.location) {
                        belong_to_me = true;
                        count = _prp.count;
                    }
                }
                const players = Array.from(clients.values());
                for (const _p of players) {
                    for (const _prp of _p.properties) {
                        if (_prp.posistion === args.location && _p.id != localPlayer.id) belong_to_others = true;
                    }
                }

                if (x.group === "Special") {
                    args.onResponse("nothing", {});
                } else if (x.group === "Utilities") {
                    if (!belong_to_me) {
                        if (belong_to_others) {
                            args.onResponse("someones", {});
                            return;
                        } else {
                            if (localPlayer.balance - (x?.price ?? 0) < 0) {
                                args.onResponse("nothing", {});
                                return;
                            } else {
                                return searchForButtons(false, args.location, {
                                    rolls: args.rolls,
                                });
                            }
                        }
                    } else {
                        args.onResponse("nothing", {});
                    }
                } else if (x.group === "Railroad") {
                    if (!belong_to_me) {
                        if (belong_to_others) {
                            args.onResponse("someones", {});
                            return;
                        } else {
                            if (localPlayer.balance - (x?.price ?? 0) < 0) {
                                args.onResponse("nothing", {});
                                return;
                            } else {
                                return searchForButtons(false, args.location);
                            }
                        }
                    } else {
                        args.onResponse("nothing", {});
                    }
                } else {
                    if (!belong_to_me && localPlayer.balance - (x?.price ?? 0) < 0) {
                        args.onResponse("nothing", {});
                        return;
                    }

                    if (belong_to_me) {
                    } else {
                        if (belong_to_others) {
                            args.onResponse("someones", {});
                            return;
                        }
                    }
                    if (belong_to_me && count === "h") {
                        args.onResponse("nothing", {});
                        return;
                    }

                    return searchForButtons(belong_to_me, args.location);
                }
            } else {
                args.onResponse("nothing", {});
            }
        },
    };
    //#endregion
    const socket_Initials = (args: { turn_id: string; other_players: Array<PlayerJSON>; selectedMode: MonopolyMode }) => {
        currentId = args.turn_id.toString();
        for (const x of args.other_players) {
            clients.set(x.id, new Player(x.id, x.username).recieveJson(x));
        }
        selectedMode = args.selectedMode;
    };

    const socket_NewPlayer = (args: PlayerJSON) => {
        clients.set(args.id, new Player(args.id, args.username).recieveJson(args));
    };

    const socket_Ready = (args: { id: string; state: boolean; selectedMode: MonopolyMode }) => {
        const x = clients.get(args.id);
        if (x === undefined) return;
        x.ready = args.state;
        clients.set(x.id, x);
        selectedMode = args.selectedMode;
    };

    const socket_DisconnectedPlayer = (args: { id: string; turn: string }) => {
        currentId = args.turn;
        clients.delete(args.id);
    };

    const socket_TurnFinished = (args: { from: string; turnId: string; pJson: PlayerJSON; WinningMode: string }) => {
        const x = clients.get(args.from);

        if (args.from !== socket.id && x) {
            x.recieveJson(args.pJson);
            clients.set(args.from, x);
        }

        currentId = args.turnId;
        if (args.turnId === socket.id) {
            const x = clients.get(args.turnId);
            setTimeout(() => {
                socket.emit("roll_dice");
                if (x && x.isInJail) {
                } else {
                }
            }, Math.round(Math.random() * 1000));
        }
    };
    function playerMoveGENERATOR(
        final_position: number,
        _xplayer: Player,
        get200whengo: boolean = true,
        afterFinished?: () => void,
        adding: boolean = true
    ) {
        var sum_moves = (final_position - _xplayer.position) % 40;
        if ((final_position < _xplayer.position || sum_moves < 0) && adding) {
            sum_moves = 40 - _xplayer.position + final_position;
        }

        if (!adding) {
            sum_moves = _xplayer.position - final_position;
            if (sum_moves < 0) {
                sum_moves += 40;
            }
        }

        const time = 0.35 * 1000 * sum_moves;

        console.log(
            `${initials.name}`,
            `${new Date().toTimeString()} generator ${Math.random()} target ${final_position} time ${time} current ${_xplayer.position}`
        );
        function _playerMoveFunc() {
            var firstPosition = 0;
            var addedMoney = false;
            var i = 0;

            firstPosition = _xplayer.position;
            _xplayer.position += 1;
            const movingAnim = () => {
                if (i < sum_moves) {
                    i += 1;
                    _xplayer.position = (_xplayer.position + (adding ? 1 : -1)) % 40;
                    if (_xplayer.position == 0 && get200whengo) {
                        _xplayer.balance += 200;

                        addedMoney = true;
                        clients.set(_xplayer.id, _xplayer);
                    }
                    if (i == sum_moves - 1) {
                        _xplayer.position = final_position;

                        if (!addedMoney && firstPosition > _xplayer.position && get200whengo) {
                            _xplayer.balance += 200;
                            addedMoney = true;

                            clients.set(_xplayer.id, _xplayer);
                        }
                        if (afterFinished) afterFinished();
                    } else {
                        setTimeout(movingAnim, 0.35 * 1000);
                    }
                }
            };
            setTimeout(movingAnim, 0.35 * 1000);
        }

        return {
            func: _playerMoveFunc,
            time,
        };
    }

    const socket_DiceRollResult = (args: { listOfNums: [number, number, number]; turnId: string }) => {
        // const sumTimes = args.listOfNums[0] + args.listOfNums[1];
        const localPlayer = clients.get(socket.id) as Player;
        const xplayer = clients.get(args.turnId) as Player;
        const dice_generatorResults = playerMoveGENERATOR(args.listOfNums[2], xplayer, true, () => {
            if (args.turnId != socket.id && args.listOfNums[2] === 30) {
                setTimeout(() => {
                    const generatorResults = playerMoveGENERATOR(10, xplayer, false, () => {
                        xplayer.position = 10;
                        xplayer.isInJail = true;
                        xplayer.jailTurnsRemaining = 3;
                    });
                    generatorResults.func();
                }, 800);
            }
        });

        engineRef.diceResults({
            l: [args.listOfNums[0], args.listOfNums[1]],
            time: localPlayer.isInJail ? 2000 : dice_generatorResults.time + 2000 + 800,
            onDone: () => {
                if (socket.id !== args.turnId) return;

                const location = clients.get(socket.id)?.position ?? -1;
                const proprety = propretyMap.get(location);
                if (proprety != undefined) {
                    if (proprety.id === "communitychest" || proprety.id === "chance") {
                        socket.emit("chorch_roll", { is_chance: proprety.id === "chance", rolls: args.listOfNums[0] + args.listOfNums[1] });
                    } else {
                        const actionList = engineRef.setStreet({
                            location,
                            rolls: args.listOfNums[1] + args.listOfNums[0],
                            onResponse: (b, info) => {
                                var time_till_free = 0;
                                if (b === "buy") {
                                    localPlayer.balance -= (proprety?.price ?? 0) * 1;
                                    localPlayer.properties.push({
                                        posistion: localPlayer.position,
                                        count: 0,
                                        group: propretyMap.get(localPlayer.position)?.group ?? "",
                                    });

                                    socket.emit(
                                        "history",
                                        history(`${clients.get(socket.id)?.username ?? "unknown player"} bought ${proprety.name}`)
                                    );
                                } else if (b === "advance-buy") {
                                    const propId = Array.from(new Map(localPlayer.properties.map((v, i) => [i, v])).entries()).filter(
                                        (v) => v[1].posistion === location
                                    )[0][0];

                                    const _info = info as {
                                        state: 1 | 2 | 3 | 4 | 5;
                                        money: number;
                                    };

                                    localPlayer.properties[propId].count = _info.state === 5 ? "h" : _info.state;

                                    if (_info.state === 5) {
                                        localPlayer.balance -= proprety.ohousecost ?? 0;
                                    } else {
                                        localPlayer.balance -= (proprety.housecost ?? 0) * _info.money;
                                    }

                                    socket.emit(
                                        "history",
                                        history(`${clients.get(socket.id)?.username ?? "unknown player"} advanced ${proprety.name}`)
                                    );
                                } else if (b === "someones") {
                                    const players = Array.from(clients.values());
                                    for (const p of players) {
                                        for (const prp of p.properties) {
                                            if (prp.posistion === location) {
                                                var payment_ammount = 0;

                                                if (proprety.group === "Utilities" && prp.rent) {
                                                    const multy_ = p.properties.filter((v) => v.group === "Utilities").length === 2 ? 10 : 4;
                                                    payment_ammount = prp.rent * multy_;
                                                } else if (proprety.group === "Railroad") {
                                                    const count = p.properties
                                                        .filter((v) => v.group === "Railroad")
                                                        .filter(
                                                            (v) => v.morgage === undefined || (v.morgage !== undefined && v.morgage === false)
                                                        ).length;
                                                    const rents = [0, 25, 50, 100, 200];
                                                    payment_ammount = rents[count];
                                                } else if (prp.count === 0) {
                                                    payment_ammount = proprety?.rent ?? 0;
                                                } else if (typeof prp.count === "number" && prp.count > 0) {
                                                    payment_ammount = (proprety?.multpliedrent ?? [0, 0, 0, 0])[prp.count - 1] ?? 0;
                                                } else if (prp.count === "h") {
                                                    payment_ammount = (proprety?.multpliedrent ?? [0, 0, 0, 0, 0])[4] ?? 0;
                                                }

                                                if (prp.morgage === undefined || (prp.morgage !== undefined && prp.morgage === false))
                                                    localPlayer.balance -= payment_ammount;

                                                socket.emit("pay", {
                                                    balance: payment_ammount,
                                                    from: socket.id,
                                                    to: p.id,
                                                });

                                                socket.emit(
                                                    "history",
                                                    history(`
                                                ${clients.get(socket.id)?.username ?? "unknown user"} pay ${payment_ammount} to ${
                                                        clients.get(p.id)?.username ?? "unknown user"
                                                    }
                                                `)
                                                );
                                            }
                                        }
                                    }
                                } else if (b === "nothing") {
                                    if ((proprety?.id ?? "") == "gotojail") {
                                        const generatorResults = playerMoveGENERATOR(10, xplayer, false, () => {
                                            xplayer.position = 10;
                                            xplayer.isInJail = true;
                                            xplayer.jailTurnsRemaining = 3;
                                        });

                                        time_till_free = generatorResults.time;
                                        generatorResults.func();
                                    }

                                    if (proprety?.id === "incometax") {
                                        localPlayer.balance -= 200;

                                        socket.emit("history", history(`${clients.get(socket.id)?.username ?? "unknown player"} payed income taxes`));
                                    }
                                    if (proprety?.id === "luxerytax") {
                                        localPlayer.balance -= 100;

                                        socket.emit("history", history(`${clients.get(socket.id)?.username ?? "unknown player"} payed luxery taxes`));
                                    }
                                } else if (b === "special_action") {
                                    localPlayer.balance -= (proprety?.price ?? 0) * 1;

                                    const _info = info as {
                                        rolls: number;
                                    };
                                    const prp = propretyMap.get(localPlayer.position);
                                    const calculateRent = _info.rolls;
                                    localPlayer.properties.push({
                                        posistion: localPlayer.position,
                                        count: 0,
                                        rent: calculateRent,
                                        group: prp?.group ?? "",
                                    });

                                    socket.emit(
                                        "history",
                                        history(
                                            `${clients.get(socket.id)?.username ?? "unknown player"} bought ${
                                                prp?.name ?? "unkown place"
                                            } with rent of ${calculateRent}`
                                        )
                                    );
                                }

                                setTimeout(() => {
                                    clients.set(socket.id, localPlayer);
                                    const json = (clients.get(socket.id) as Player).toJson();
                                    socket.emit("finish-turn", json);
                                }, time_till_free);
                            },
                        });
                        actionList?.action(actionList.actions[Math.floor(Math.random() * actionList.actions.length)]);
                    }
                }
            },
        });

        if (xplayer.isInJail) {
            setTimeout(() => {
                if (args.listOfNums[0] == args.listOfNums[1]) {
                    xplayer.isInJail = false;
                    setTimeout(() => {
                        dice_generatorResults.func();
                    }, 2000);
                } else if (xplayer.jailTurnsRemaining > 0) {
                    xplayer.jailTurnsRemaining -= 1;
                    if (xplayer.jailTurnsRemaining === 0) {
                        xplayer.isInJail = false;
                    }
                }
                clients.set(args.turnId, xplayer);
            }, 1500);
        } else {
            setTimeout(() => {
                dice_generatorResults.func();
            }, 2000);
        }
    };
    const socket_Unjail = (args: { to: string; option: "card" | "pay" }) => {
        const x = clients.get(args.to);
        if (x) {
            if (args.option === "card") {
                x.getoutCards -= 1;
            } else {
                x.balance -= 50;
            }
            x.isInJail = false;
            x.jailTurnsRemaining = 0;
            clients.set(args.to, x);
        }
    };
    const socket_MemberUpdating = (args: {
        playerId: string;
        animation: "recieveMoney";
        additional_props: any[];
        pJson: [PlayerJSON, PlayerJSON];
    }) => {
        for (const x of args.pJson) {
            const p = clients.get(x.id);
            x.position = p?.position ?? x.position;
            p?.recieveJson(x);
        }
    };
    const socket_ChorchResult = (args: {
        element: {
            title: string;
            action: string;
            tileid: string;
            groupid?: undefined;
            rentmultiplier?: undefined;
            amount?: undefined;
            subaction?: undefined;
            count?: undefined;
            buildings?: undefined;
            hotels?: undefined;
        };
        rolls: number;
        is_chance: boolean;
        turnId: string;
    }) => {
        const numOfTime = 3000;

        setTimeout(() => {
            const c = args.element;
            const xplayer = clients.get(args.turnId);
            if (xplayer === undefined) return;
            function addBalanceToOthers(amnout: number) {
                if (xplayer === undefined) return 0;

                const other_players = Array.from(clients.values()).filter((v) => v.id !== xplayer.id);

                if (xplayer.id === socket.id) {
                    if (amnout > 0) {
                        // give money
                        socket.emit(
                            "history",
                            history(
                                `${xplayer.username ?? "unknown user"} gave ${amnout} money to [${other_players.map((v) => v.username).join(", ")}]`
                            )
                        );
                    } else {
                        // get money!
                        socket.emit(
                            "history",
                            history(
                                `${xplayer.username ?? "unknown user"} recieve ${-amnout} money from [${other_players
                                    .map((v) => v.username)
                                    .join(", ")}]`
                            )
                        );
                    }
                }

                for (const p of other_players) {
                    p.balance += amnout;
                    clients.set(p.id, p);

                    if (xplayer.id === socket.id) {
                        if (amnout > 0) {
                            socket.emit("pay", {
                                balance: amnout,
                                from: socket.id,
                                to: p.id,
                            });
                        } else {
                            // recieve money
                            socket.emit("pay", {
                                balance: amnout,
                                from: p.id,
                                to: socket.id,
                            });

                            socket.emit(
                                "history",
                                history(`
                            ${clients.get(socket.id)?.username ?? "unknown user"} pay ${payment_ammount} to ${
                                    clients.get(xplayer.id)?.username ?? "unknown user"
                                }
                            `)
                            );
                        }
                    }
                }
                return other_players.length;
            }

            var time_till_finish = 0;
            switch (c.action) {
                case "move":
                    if (c.tileid) {
                        const p = new Map(
                            monopolyJSON.properties.map((obj) => {
                                return [obj.id, obj];
                            })
                        );
                        const targetPos = p.get(c.tileid)?.posistion;
                        if (targetPos === undefined) break;

                        const _generatorResults = playerMoveGENERATOR(targetPos, xplayer);
                        time_till_finish = _generatorResults.time;
                        _generatorResults.func();
                    } else if (c.count) {
                        const _generatorResults = playerMoveGENERATOR((xplayer.position + c.count) % 40, xplayer, true, () => {}, c.count >= 0);
                        time_till_finish = _generatorResults.time;
                        _generatorResults.func();
                    }
                    break;

                case "addfunds":
                    xplayer.balance += c.amount ?? 0;
                    break;
                case "jail":
                    if (c.subaction !== undefined) {
                        switch (c.subaction) {
                            case "getout":
                                xplayer.getoutCards += 1;
                                break;
                            case "goto":
                                const _generatorResults = playerMoveGENERATOR(10, xplayer, false, () => {
                                    xplayer.position = 10;
                                    xplayer.isInJail = true;
                                    xplayer.jailTurnsRemaining = 3;
                                });
                                time_till_finish = _generatorResults.time;
                                _generatorResults.func();
                                break;
                        }
                        clients.set(xplayer.id, xplayer);
                    }
                    break;

                case "removefunds":
                    xplayer.balance -= c.amount ?? 0;
                    break;
                // amount
                case "removefundstoplayers":
                    addBalanceToOthers(c.amount ?? 0);
                    // xplayer.balance -= (c.amount ?? 0) * l;
                    break;

                case "addfundsfromplayers":
                    addBalanceToOthers(-(c.amount ?? 0));
                    // xplayer.balance += (c.amount ?? 0) * l;
                    break;

                case "movenearest":
                    if (!c.groupid) return;

                    function findNextValue(arr: number[], X: number) {
                        // Sort the array in ascending order
                        arr.sort((a, b) => a - b);

                        // Loop through the array to find the next value
                        for (let i = 0; i < arr.length; i++) {
                            if (arr[i] > X) {
                                return arr[i];
                            }
                        }

                        // If no value greater than X is found, return the first element (wrap around)
                        return arr[0];
                    }

                    var p = "";

                    if (c.groupid === "utility") {
                        p = "Utilities";
                    } else {
                        p = "Railroad";
                    }
                    const arr = monopolyJSON.properties.filter((v) => v.group === p).map((v) => v.posistion);
                    const ongoingLocation = findNextValue(arr, xplayer.position);
                    const _generatorResults = playerMoveGENERATOR(ongoingLocation, xplayer);
                    time_till_finish = -1;
                    _generatorResults.func();
                    setTimeout(() => {
                        if (xplayer.id === socket.id) {
                            const location = xplayer?.position ?? -1;
                            const proprety = propretyMap.get(location);
                            if (proprety !== undefined) {
                                engineRef.setStreet({
                                    location,
                                    rolls: args.rolls,
                                    onResponse: (b, info) => {
                                        if (b === "buy") {
                                            xplayer.balance -= (proprety?.price ?? 0) * 1;

                                            const prp = propretyMap.get(xplayer.position);
                                            xplayer.properties.push({
                                                posistion: xplayer.position,
                                                count: 0,
                                                group: prp?.group ?? "",
                                            });

                                            clients.set(socket.id, xplayer);
                                            // engineRef.freeDice();
                                            const json = (clients.get(socket.id) as Player).toJson();
                                            socket.emit("finish-turn", json);

                                            socket.emit(
                                                "history",
                                                history(
                                                    `${clients.get(socket.id)?.username ?? "unknown player"} bought ${prp?.name ?? "unkown place"}`
                                                )
                                            );
                                        } else if (b === "special_action") {
                                            console.log(`${initials.name}`, info);
                                            xplayer.balance -= (proprety?.price ?? 0) * 1;

                                            const _info = info as {
                                                rolls: number;
                                            };

                                            const calculateRent = _info.rolls;
                                            const prp = propretyMap.get(xplayer.position);
                                            xplayer.properties.push({
                                                posistion: xplayer.position,
                                                count: 0,
                                                rent: calculateRent,
                                                group: prp?.group ?? "",
                                            });

                                            clients.set(socket.id, xplayer);
                                            // engineRef.freeDice();
                                            const json = (clients.get(socket.id) as Player).toJson();
                                            socket.emit("finish-turn", json);

                                            socket.emit(
                                                "history",
                                                history(
                                                    `${clients.get(socket.id)?.username ?? "unknown player"} bought ${
                                                        prp?.name ?? "unkown place"
                                                    } with rent of ${calculateRent}`
                                                )
                                            );
                                        } else if (b === "someones") {
                                            const players = Array.from(clients.values());

                                            for (const p of players) {
                                                for (const prp of p.properties) {
                                                    if (prp.posistion === location) {
                                                        var payment_ammount = 0;

                                                        if (proprety.group === "Utilities" && prp.rent) {
                                                            const l = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
                                                            socket.emit(
                                                                "history",
                                                                history(
                                                                    `${clients.get(socket.id)?.username ?? "unknown player"} rolled [${l[0]}, ${
                                                                        l[1]
                                                                    }]`
                                                                )
                                                            );

                                                            engineRef.diceResults({
                                                                l: [l[0], l[1]],
                                                                time: 2000,
                                                                onDone: () => {
                                                                    payment_ammount = (l[0] + l[1]) * (c.rentmultiplier ?? 1);

                                                                    xplayer.balance -= payment_ammount;
                                                                    socket.emit("pay", {
                                                                        balance: payment_ammount,
                                                                        from: socket.id,
                                                                        to: p.id,
                                                                    });

                                                                    socket.emit(
                                                                        "history",
                                                                        history(
                                                                            `${
                                                                                clients.get(socket.id)?.username ?? "unknown player"
                                                                            } pay ${payment_ammount} to ${
                                                                                clients.get(p.id)?.username ?? "unknown player"
                                                                            }`
                                                                        )
                                                                    );

                                                                    clients.set(socket.id, xplayer);
                                                                    // engineRef.freeDice();
                                                                    const json = (clients.get(socket.id) as Player).toJson();
                                                                    socket.emit("finish-turn", json);
                                                                },
                                                            });
                                                        } else if (proprety.group === "Railroad") {
                                                            const count = p.properties
                                                                .filter((v) => v.group === "Railroad")
                                                                .filter(
                                                                    (v) => v.morgage === undefined || (v.morgage !== undefined && v.morgage === false)
                                                                ).length;
                                                            const rents = [0, 25, 50, 100, 200];
                                                            payment_ammount = rents[count] * (c.rentmultiplier ?? 1);

                                                            if (prp.morgage === undefined || (prp.morgage !== undefined && prp.morgage === false))
                                                                xplayer.balance -= payment_ammount;
                                                            socket.emit("pay", {
                                                                balance: payment_ammount,
                                                                from: socket.id,
                                                                to: p.id,
                                                            });
                                                            socket.emit(
                                                                "history",
                                                                history(
                                                                    `${
                                                                        clients.get(socket.id)?.username ?? "unknown player"
                                                                    } pay ${payment_ammount} to ${clients.get(p.id)?.username ?? "unknown player"}`
                                                                )
                                                            );
                                                            clients.set(socket.id, xplayer);
                                                            // engineRef.freeDice();
                                                            const json = (clients.get(socket.id) as Player).toJson();
                                                            socket.emit("finish-turn", json);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            // engineRef.freeDice();
                                            const json = (clients.get(socket.id) as Player).toJson();
                                            socket.emit("finish-turn", json);
                                        }
                                    },
                                });
                            }
                        }
                    }, _generatorResults.time);
                    break;

                case "propertycharges":
                    function sum(b: number[]) {
                        var s = 0;
                        for (const x of b) {
                            s += x;
                        }
                        return 1;
                    }
                    var payment_ammount =
                        (c.buildings ?? 1) * sum(xplayer.properties.filter((v) => typeof v.count === "number").map((v) => v.count as number)) +
                        (c.hotels ?? 1) * xplayer.properties.filter((v) => v.count === "h").length;
                    console.log(
                        `${initials.name}`,
                        `
${(c.buildings ?? 1) * sum(xplayer.properties.filter((v) => typeof v.count === "number").map((v) => v.count as number))} + 
${(c.hotels ?? 1) * xplayer.properties.filter((v) => v.count === "h").length} 
which is ${payment_ammount}
                    `
                    );
                    xplayer.balance -= payment_ammount;
                    clients.set(xplayer.id, xplayer);
                    break;
                default:
                    break;
            }

            if (time_till_finish >= 0) {
                setTimeout(() => {
                    clients.set(xplayer.id, xplayer);
                    if (xplayer.id === socket.id) {
                        // engineRef.freeDice();
                        socket.emit("finish-turn", (clients.get(socket.id) as Player).toJson());
                    }
                }, time_till_finish);
            }
        }, numOfTime);
    };
    function socket_Mouse(args: { id: string; x: number; y: number }) {
        const xplayer = clients.get(args.id);
        if (xplayer === undefined) return;
        xplayer.positions = { x: args.x, y: args.y };
        clients.set(args.id, xplayer);
    }

    function socket_playerUpdate(args: { playerId: string; pJson: PlayerJSON }) {
        const x = clients.get(args.playerId);
        if (x === undefined) return;
        x.recieveJson(args.pJson);
    }

    socket.on("initials", socket_Initials);
    socket.on("new-player", socket_NewPlayer);
    socket.on("ready", socket_Ready);
    socket.on("disconnected-player", socket_DisconnectedPlayer);
    socket.on("turn-finished", socket_TurnFinished);
    socket.on("dice_roll_result", socket_DiceRollResult);
    socket.on("unjail", socket_Unjail);
    socket.on("member_updating", socket_MemberUpdating);
    socket.on("chorch_result", socket_ChorchResult);
    socket.on("mouse", socket_Mouse);
    socket.on("disconnect", () => {
        console.log(`${initials.name}`, "bot disconnected");
    });
    socket.on("player_update", socket_playerUpdate);
    // Trade
    socket.on("trade", () => {
        if (!selectedMode.AllowDeals) return;
        trade = true;
    });
    socket.on("cancel-trade", () => {
        if (!selectedMode.AllowDeals) return;
        trade = undefined;
    });
    socket.on("trade-update", (x: GameTrading) => {
        if (!selectedMode.AllowDeals) return;
        trade = x;
    });

    socket.on("submit-trade", (args: { pJsons: [PlayerJSON, PlayerJSON]; action: string }) => {
        if (!selectedMode.AllowDeals) return;
        trade = undefined;
        for (const PJS of args.pJsons) {
            const client = clients.get(PJS.id);
            if (client !== undefined) {
                client.recieveJson(PJS);
            }
        }
    });
    socket.emit("name", `${initials.name}`);
    socket.emit("ready", {
        ready: true,
    });
}
