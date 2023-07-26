import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { Player, PlayerJSON } from "./assets/player";
import "./monopoly.css";
import MonopolyNav, { MonopolyNavRef } from "./components/nav";
import MonopolyGame, { MonopolyGameRef } from "./components/game";
import NotifyElement, { NotificatorRef } from "./components/notificator";
import monopolyJSON from "./assets/monopoly.json";

function App({ socket, name }: { socket: Socket; name: string }) {
    const [clients, SetClients] = useState<Map<string, Player>>(new Map());
    const players = Array.from(clients.values());

    const [currentId, SetCurrent] = useState<string>("");
    const [gameStarted, SetGameStarted] = useState<boolean>(false);
    const [imReady, SetReady] = useState<boolean>(false);

    const engineRef = useRef<MonopolyGameRef>(null);
    const navRef = useRef<MonopolyNavRef>(null);
    const notifyRef = useRef<NotificatorRef>(null);

    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );

    useEffect(() => {
        function destroyPlayer(playerId: string) {
            console.log(`destroy player ${playerId}`);

            // remove player from clients
            function removePlayer() {
                clients.delete(playerId);
                SetClients(new Map(clients));

                // 1 frame to check if it isnt removed
                requestAnimationFrame(() => {
                    if (clients.has(playerId)) {
                        // request a loop frame!
                        requestAnimationFrame(removePlayer);
                    } else {
                        console.log("id was removed from clients");
                        console.log(players.filter((v) => v.id === playerId));
                    }
                });
            }
            removePlayer();

            // removing child from game div
            function removeChild() {
                const _element = document.querySelector(
                    `div.player[player-id="${playerId}"]`
                );
                if (_element === null) return;
                if (_element.parentElement)
                    _element.parentElement.removeChild(_element);
                _element.remove();

                // 1 frame to check if it isnt removed
                requestAnimationFrame(() => {
                    if (
                        document.querySelector(
                            `div.player[player-id="${playerId}"]`
                        ) !== null
                    ) {
                        // request a loop frame!
                        requestAnimationFrame(removeChild);
                    } else {
                        console.log("player icon was removed from game view");
                    }
                });
            }
            removeChild();
        }

        //#region socket handeling
        const socket_Initials = (args: {
            turn_id: string;
            other_players: Array<PlayerJSON>;
        }) => {
            SetCurrent(args.turn_id.toString());
            for (const x of args.other_players) {
                SetClients(
                    clients.set(
                        x.id,
                        new Player(x.id, x.username).recieveJson(x)
                    )
                );
            }
        };

        const socket_NewPlayer = (args: PlayerJSON) => {
            SetClients(
                new Map(
                    clients.set(
                        args.id,
                        new Player(args.id, args.username).recieveJson(args)
                    )
                )
            );
        };

        const socket_Ready = (args: { id: string; state: boolean }) => {
            const x = clients.get(args.id);
            if (x === undefined) return;
            x.ready = args.state;
            SetClients(new Map(clients.set(x.id, x)));
        };
        const socket_StartGame = () => {
            SetGameStarted(true);
        };

        const socket_DisconnectedPlayer = (args: {
            id: string;
            turn: string;
        }) => {
            destroyPlayer(args.id);
            SetCurrent(args.turn);
            if (clients.size > 2) {
                const name = clients.get(args.id)?.username ?? "player";
                notifyRef.current?.message(`${name} disconected`, "error");
            } else {
                notifyRef.current?.dialog((close_func, createButton) => ({
                    innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                        clients.get(socket.id)?.balance ?? 0
                    } </p>`,
                    buttons: [
                        createButton("PLAY ANOTHER GAME", () => {
                            close_func();
                            document.location.reload();
                        }),
                    ],
                }));
            }
        };

        const socket_TurnFinished = (args: {
            from: string;
            turnId: string;
            pJson: PlayerJSON;
        }) => {
            const x = clients.get(args.from);
            if (args.from !== socket.id && x) {
                x.recieveJson(args.pJson);
                SetClients(new Map(clients.set(args.from, x)));
            }

            if (args.pJson.balance < 0) {
                if (args.pJson.id !== socket.id) {
                    if (clients.size > 2) {
                        const name = args.pJson.username;
                        notifyRef.current?.message(`${name} lost`, "info");
                    } else {
                        if (clients.has(socket.id)) {
                            notifyRef.current?.dialog(
                                (close_func, createButton) => ({
                                    innerHTML: `<h3> YOU WON! </h3> <p> your the only left player with the balance of ${
                                        clients.get(socket.id)?.balance ?? 0
                                    } </p>`,
                                    buttons: [
                                        createButton(
                                            "PLAY ANOTHER GAME",
                                            () => {
                                                close_func();
                                                document.location.reload();
                                            }
                                        ),
                                    ],
                                })
                            );
                        } else {
                            const xclient = Array.from(clients.values()).filter(
                                (v) => v.id !== args.pJson.id
                            )[0];
                            const name = xclient.username ?? 0;

                            notifyRef.current?.dialog(
                                (close_func, createButton) => ({
                                    innerHTML: `<h3> ${name} WON! </h3> <p> ${name} won with the balance of ${
                                        clients.get(socket.id)?.balance ?? 0
                                    } </p>`,
                                    buttons: [
                                        createButton(
                                            "PLAY ANOTHER GAME",
                                            () => {
                                                close_func();
                                                document.location.reload();
                                            }
                                        ),
                                    ],
                                })
                            );
                        }
                    }
                } else {
                    notifyRef.current?.dialog((close_func, createButton) => ({
                        innerHTML: `<h3> YOU LOST! </h3> <p> you lost your money and lost the monopol with a wanted balance of ${-(
                            clients.get(socket.id)?.balance ?? 0
                        )} </p>`,
                        buttons: [
                            createButton("CONTINUE WATCHING", () => {
                                close_func();
                            }),
                            createButton("PLAY ANOTHER GAME", () => {
                                close_func();
                                document.location.reload();
                            }),
                        ],
                    }));
                }

                destroyPlayer(args.pJson.id);
            }

            SetCurrent(args.turnId);
            if (args.turnId === socket.id) {
                console.log("checking controllers");
                const x = clients.get(args.turnId);
                if (x && x.isInJail) {
                    console.log("new controllers");
                    engineRef.current?.showJailsButtons(
                        (x?.getoutCards ?? -1) > 0
                    );
                } else {
                    console.log("no controllers??");
                }
            }
            navRef.current?.reRenderPlayerList();
        };

        const socket_Message = (message: { from: string; message: string }) => {
            navRef.current?.addMessage(message);
        };
        const socket_DiceRollResult = (args: {
            listOfNums: [number, number, number];
            turnId: string;
        }) => {
            const sumTimes = args.listOfNums[0] + args.listOfNums[1];
            const localPlayer = clients.get(socket.id) as Player;
            const xplayer = clients.get(args.turnId) as Player;
            engineRef.current?.diceResults({
                l: [args.listOfNums[0], args.listOfNums[1]],
                time: localPlayer.isInJail
                    ? 2000
                    : 0.35 * 1000 * sumTimes + 2000 + 800,
                onDone: () => {
                    if (socket.id !== args.turnId) return;

                    const location = clients.get(socket.id)?.position ?? -1;
                    const proprety = propretyMap.get(location);
                    if (proprety != undefined) {
                        if (
                            proprety.id === "communitychest" ||
                            proprety.id === "chance"
                        ) {
                            socket.emit(
                                "chorch_roll",
                                proprety.id === "chance"
                            );
                        } else {
                            engineRef.current?.setStreet({
                                location,
                                onResponse: (b, info) => {
                                    if (b === "buy") {
                                        localPlayer.balance -=
                                            (proprety?.price ?? 0) * 1;
                                        engineRef.current?.applyAnimation(1);
                                        localPlayer.properties.push({
                                            posistion: localPlayer.position,
                                            count: 0,
                                            group:
                                                propretyMap.get(
                                                    localPlayer.position
                                                )?.group ?? "",
                                        });
                                    } else if (b === "advance-buy") {
                                        const propId = Array.from(
                                            new Map(
                                                localPlayer.properties.map(
                                                    (v, i) => [i, v]
                                                )
                                            ).entries()
                                        ).filter(
                                            (v) => v[1].posistion === location
                                        )[0][0];

                                        const _info = info as {
                                            state: 1 | 2 | 3 | 4 | 5;
                                            money: number;
                                        };

                                        localPlayer.properties[propId].count =
                                            _info.state === 5
                                                ? "h"
                                                : _info.state;

                                        if (_info.state === 5) {
                                            localPlayer.balance -=
                                                proprety.ohousecost ?? 0;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        } else {
                                            proprety.housecost;
                                            localPlayer.balance -=
                                                (proprety.housecost ?? 0) *
                                                _info.money;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                    } else if (b === "someones") {
                                        const players = Array.from(
                                            clients.values()
                                        );
                                        for (const p of players) {
                                            for (const prp of p.properties) {
                                                if (
                                                    prp.posistion === location
                                                ) {
                                                    var payment_ammount = 0;
                                                    if (prp.count === 0) {
                                                        payment_ammount =
                                                            proprety?.rent ?? 0;
                                                    }
                                                    if (
                                                        typeof prp.count ===
                                                            "number" &&
                                                        prp.count > 0
                                                    ) {
                                                        payment_ammount =
                                                            (proprety?.multpliedrent ?? [
                                                                0, 0, 0, 0,
                                                            ])[prp.count - 1] ??
                                                            0;
                                                    }
                                                    if (prp.count === "h") {
                                                        payment_ammount =
                                                            (proprety?.multpliedrent ?? [
                                                                0, 0, 0, 0, 0,
                                                            ])[4] ?? 0;
                                                    }

                                                    localPlayer.balance -=
                                                        payment_ammount;
                                                    engineRef.current?.applyAnimation(
                                                        1
                                                    );
                                                    socket.emit("pay", {
                                                        balance:
                                                            payment_ammount,
                                                        from: socket.id,
                                                        to: p.id,
                                                    });
                                                    engineRef.current?.applyAnimation(
                                                        1
                                                    );
                                                }
                                            }
                                        }
                                    } else if (b === "nothing") {
                                        if (
                                            (proprety?.id ?? "") == "gotojail"
                                        ) {
                                            localPlayer.isInJail = true;
                                            localPlayer.jailTurnsRemaining = 3;
                                            localPlayer.position = 10;
                                        }
                                        if (proprety?.id === "incometax") {
                                            localPlayer.balance -= 200;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                        if (proprety?.id === "luxerytax") {
                                            localPlayer.balance -= 100;
                                            engineRef.current?.applyAnimation(
                                                1
                                            );
                                        }
                                    }

                                    SetClients(
                                        new Map(
                                            clients.set(socket.id, localPlayer)
                                        )
                                    );
                                    engineRef.current?.freeDice();
                                    socket.emit(
                                        "finish-turn",
                                        (
                                            clients.get(socket.id) as Player
                                        ).toJson()
                                    );
                                },
                            });
                        }
                    }
                },
            });

            function playerMove() {
                var firstPosition = 0;
                var addedMoney = false;
                setTimeout(() => {
                    var i = 0;
                    const element = document.querySelector(
                        `div.player[player-id="${args.turnId}"]`
                    ) as HTMLDivElement;

                    firstPosition = xplayer.position;
                    xplayer.position += 1;
                    element.style.animation =
                        "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                    const movingAnim = () => {
                        if (i < sumTimes) {
                            i += 1;
                            xplayer.position = (xplayer.position + 1) % 40;
                            if (xplayer.position == 0) {
                                xplayer.balance += 200;
                                if (xplayer.id === socket.id)
                                    engineRef.current?.applyAnimation(2);
                                addedMoney = true;
                                SetClients(
                                    new Map(clients.set(args.turnId, xplayer))
                                );
                            }
                            if (i == sumTimes - 1) {
                                xplayer.position = args.listOfNums[2];
                                element.style.animation =
                                    "part 0.9s cubic-bezier(0,.7,.57,1)";
                                setTimeout(() => {
                                    element.style.animation = "";
                                }, 900);

                                if (
                                    !addedMoney &&
                                    firstPosition > xplayer.position
                                ) {
                                    xplayer.balance += 200;
                                    if (xplayer.id === socket.id)
                                        engineRef.current?.applyAnimation(2);
                                    addedMoney = true;

                                    SetClients(
                                        new Map(
                                            clients.set(args.turnId, xplayer)
                                        )
                                    );
                                }
                            } else {
                                element.style.animation =
                                    "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                                setTimeout(movingAnim, 0.35 * 1000);
                            }
                        }
                    };
                    setTimeout(movingAnim, 0.35 * 1000);
                }, 2000);
            }

            if (xplayer.isInJail) {
                setTimeout(() => {
                    if (args.listOfNums[0] == args.listOfNums[1]) {
                        xplayer.isInJail = false;
                        playerMove();
                    } else if (xplayer.jailTurnsRemaining > 0) {
                        xplayer.jailTurnsRemaining -= 1;
                        if (xplayer.jailTurnsRemaining === 0) {
                            xplayer.isInJail = false;
                        }
                    }
                    SetClients(new Map(clients.set(args.turnId, xplayer)));
                }, 1500);
            } else {
                playerMove();
            }
        };
        const socket_Unjail = (args: {
            to: string;
            option: "card" | "pay";
        }) => {
            const x = clients.get(args.to);
            if (x) {
                if (args.option === "card") {
                    x.getoutCards -= 1;
                } else {
                    x.balance -= 50;
                }
                x.isInJail = false;
                x.jailTurnsRemaining = 0;
                SetClients(new Map(clients.set(args.to, x)));
            }
        };
        const socket_MemberUpdating = (args: {
            playerId: string;
            animation: "recieveMoney";
            additional_props: any[];
            pJson: PlayerJSON;
        }) => {
            const p = clients.get(args.playerId);
            p?.recieveJson(args.pJson);

            if (socket.id === args.playerId) {
                engineRef.current?.applyAnimation(2);
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
            is_chance: boolean;
            turnId: string;
        }) => {
            const numOfTime = 3000;
            engineRef.current?.chorch(args.element, args.is_chance, numOfTime);

            setTimeout(() => {
                const c = args.element;
                const xplayer = clients.get(args.turnId);
                if (xplayer === undefined) return;
                console.log({ c });
                function addBalanceToOthers(amnout: number) {
                    if (xplayer === undefined) return 0;
                    const other_players = Array.from(clients.values()).filter(
                        (v) => v.id !== xplayer.id
                    );
                    for (const p of other_players) {
                        p.balance += amnout;
                        SetClients(new Map(clients.set(p.id, p)));
                    }
                    return other_players.length;
                }

                function playerMoveGENERATOR(
                    final_position: number,
                    xplayer: Player,
                    get200whengo: boolean = true,
                    afterFinished?: () => void
                ) {
                    var sum_moves = (final_position - xplayer.position) % 40;
                    function _playerMoveFunc() {
                        var firstPosition = 0;
                        var addedMoney = false;
                        var i = 0;
                        const element = document.querySelector(
                            `div.player[player-id="${args.turnId}"]`
                        ) as HTMLDivElement;

                        firstPosition = xplayer.position;
                        xplayer.position += 1;
                        element.style.animation =
                            "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                        const movingAnim = () => {
                            if (i < sum_moves) {
                                i += 1;
                                xplayer.position = (xplayer.position + 1) % 40;
                                if (xplayer.position == 0 && get200whengo) {
                                    xplayer.balance += 200;
                                    if (xplayer.id === socket.id)
                                        engineRef.current?.applyAnimation(2);
                                    addedMoney = true;
                                    SetClients(
                                        new Map(
                                            clients.set(args.turnId, xplayer)
                                        )
                                    );
                                }
                                if (i == sum_moves - 1) {
                                    xplayer.position = final_position;
                                    element.style.animation =
                                        "part 0.9s cubic-bezier(0,.7,.57,1)";
                                    setTimeout(() => {
                                        element.style.animation = "";
                                    }, 900);

                                    if (
                                        !addedMoney &&
                                        firstPosition > xplayer.position &&
                                        get200whengo
                                    ) {
                                        xplayer.balance += 200;
                                        if (xplayer.id === socket.id)
                                            engineRef.current?.applyAnimation(
                                                2
                                            );
                                        addedMoney = true;

                                        SetClients(
                                            new Map(
                                                clients.set(
                                                    args.turnId,
                                                    xplayer
                                                )
                                            )
                                        );
                                    }
                                    if (afterFinished) afterFinished();
                                } else {
                                    element.style.animation =
                                        "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                                    setTimeout(movingAnim, 0.35 * 1000);
                                }
                            }
                        };
                        setTimeout(movingAnim, 0.35 * 1000);
                    }

                    return {
                        func: _playerMoveFunc,
                        time: 0.35 * 1000 * sum_moves,
                    };
                }

                var time_till_finish = 0;
                switch (c.action) {
                    case "move":
                        console.log("got that move");
                        if (c.tileid) {
                            console.log(`got that tileid ${c.tileid}`);
                            const p = new Map(
                                monopolyJSON.properties.map((obj) => {
                                    return [obj.id, obj];
                                })
                            );
                            const targetPos = p.get(c.tileid)?.posistion;
                            if (targetPos === undefined) {
                                console.log(`didnot found "${c.tileid}"`);
                                console.log(`his length "${c.tileid.length}"`);
                                const _arr = Array.from(p.keys());
                                console.log(_arr);
                                console.log(_arr.filter((v) => v == c.tileid));
                                break;
                            }
                            const generatorResults = playerMoveGENERATOR(
                                targetPos,
                                xplayer
                            );
                            time_till_finish = generatorResults.time;
                            generatorResults.func();
                        } else if (c.count) {
                            const generatorResults = playerMoveGENERATOR(
                                xplayer.position + c.count,
                                xplayer
                            );
                            time_till_finish = generatorResults.time;
                            generatorResults.func();
                        }
                        break;

                    case "addfunds":
                        xplayer.balance += c.amount ?? 0;
                        if (xplayer.id === socket.id)
                            engineRef.current?.applyAnimation(2);
                        break;
                    case "jail":
                        if (c.subaction !== undefined) {
                            switch (c.subaction) {
                                case "getout":
                                    xplayer.getoutCards += 1;
                                    console.log(
                                        `getoutcards was added one to player ${xplayer.id}`
                                    );
                                    break;
                                case "goto":
                                    const generatorResults =
                                        playerMoveGENERATOR(
                                            10,
                                            xplayer,
                                            false,
                                            () => {
                                                xplayer.position = 10;
                                                xplayer.isInJail = true;
                                                xplayer.jailTurnsRemaining = 3;
                                            }
                                        );
                                    time_till_finish = generatorResults.time;
                                    generatorResults.func();
                                    break;
                            }
                            SetClients(
                                new Map(clients.set(xplayer.id, xplayer))
                            );
                        }
                        break;

                    case "removefunds":
                        xplayer.balance -= c.amount ?? 0;
                        if (xplayer.id === socket.id)
                            engineRef.current?.applyAnimation(1);
                        break;
                    // amount
                    case "removefundstoplayers":
                        var l = addBalanceToOthers(c.amount ?? 0);
                        xplayer.balance -= (c.amount ?? 0) * l;
                        if (xplayer.id === socket.id)
                            engineRef.current?.applyAnimation(1);
                        break;

                    case "addfundsfromplayers":
                        var l = addBalanceToOthers(-(c.amount ?? 0));
                        xplayer.balance += (c.amount ?? 0) * l;
                        if (xplayer.id === socket.id)
                            engineRef.current?.applyAnimation(2);
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
                        const arr = monopolyJSON.properties
                            .filter((v) => v.group === p)
                            .map((v) => v.posistion);
                        console.log(arr);
                        const ongoingLocation = findNextValue(
                            arr,
                            xplayer.position
                        );
                        console.log({ ongoingLocation });
                        const generatorResults = playerMoveGENERATOR(
                            ongoingLocation,
                            xplayer
                        );
                        time_till_finish = generatorResults.time;
                        generatorResults.func();
                        break;

                    case "propertycharges":
                    // TODO: Later!
                    default:
                        break;
                }

                setTimeout(() => {
                    SetClients(new Map(clients.set(xplayer.id, xplayer)));
                    if (xplayer.id === socket.id) {
                        engineRef.current?.freeDice();
                        socket.emit(
                            "finish-turn",
                            (clients.get(socket.id) as Player).toJson()
                        );
                    }
                }, time_till_finish);
            }, numOfTime);
        };
        socket.on("initials", socket_Initials);
        socket.on("new-player", socket_NewPlayer);
        socket.on("ready", socket_Ready);
        socket.on("start-game", socket_StartGame);
        socket.on("disconnected-player", socket_DisconnectedPlayer);
        socket.on("turn-finished", socket_TurnFinished);
        socket.on("message", socket_Message);
        socket.on("dice_roll_result", socket_DiceRollResult);
        socket.on("unjail", socket_Unjail);
        socket.on("member_updating", socket_MemberUpdating);
        socket.on("chorch_result", socket_ChorchResult);

        var to_emit_name = true;
        //#endregion
        if (to_emit_name) socket.emit("name", name);

        return () => {
            to_emit_name = false;

            socket.off("initials", socket_Initials);
            socket.off("new-player", socket_NewPlayer);
            socket.off("ready", socket_Ready);
            socket.off("start-game", socket_StartGame);
            socket.off("disconnected-player", socket_DisconnectedPlayer);
            socket.off("turn-finished", socket_TurnFinished);
            socket.off("message", socket_Message);
            socket.off("dice_roll_result", socket_DiceRollResult);
            socket.off("unjail", socket_Unjail);
            socket.off("member_updating", socket_MemberUpdating);
            socket.off("chorch_result", socket_ChorchResult);
        };
    }, [socket]);

    useEffect(() => {
        navRef.current?.reRenderPlayerList();
    }, [clients]);

    return gameStarted ? (
        <>
            <main>
                <MonopolyNav
                    currentTurn={currentId}
                    ref={navRef}
                    name={name}
                    socket={socket}
                    players={players}
                />

                <MonopolyGame
                    clickedOnBoard={(a) => {
                        navRef.current?.clickedOnBoard(a);
                    }}
                    ref={engineRef}
                    socket={socket}
                    players={Array.from(clients.values())}
                    myTurn={currentId === socket.id}
                />
            </main>
            <NotifyElement ref={notifyRef} />
        </>
    ) : (
        <div className="lobby">
            <h3>Hello there {name}</h3>
            the players that are currently in the lobby are
            <div>
                {Array.from(clients.values()).map((v, i) => {
                    return (
                        <p
                            style={v.ready ? { backgroundColor: "green" } : {}}
                            className="lobby-players"
                            key={i}
                        >
                            {v.username} [{v.position}]
                        </p>
                    );
                })}
            </div>
            <center>
                <button
                    onClick={() => {
                        socket.emit("ready", !imReady);
                        SetReady(!imReady);
                    }}
                >
                    {!imReady ? "Ready" : "Not Ready"}
                </button>
            </center>
        </div>
    );
}

export default App;
