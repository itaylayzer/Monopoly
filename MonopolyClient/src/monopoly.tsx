import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { Player, PlayerJSON } from "./assets/player";
import "./monopoly.css";
import MonopolyNav, { MonopolyNavRef } from "./components/nav";
import MonopolyGame, { MonopolyGameRef } from "./components/game";

import monopolyJSON from "./assets/monopoly.json";

function App({ socket, name }: { socket: Socket; name: string }) {
    const [clients, SetClients] = useState<Map<string, Player>>(new Map());
    const [currentId, SetCurrent] = useState<string>("");
    const [gameStarted, SetGameStarted] = useState<boolean>(false);
    const [imReady, SetReady] = useState<boolean>(false);
    const engineRef = useRef<MonopolyGameRef>(null);
    const navRef = useRef<MonopolyNavRef>(null);

    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );

    useEffect(() => {
        //#region socket handeling
        socket.on(
            "initials",
            (args: { turn_id: string; other_players: Array<PlayerJSON> }) => {
                SetCurrent(args.turn_id.toString());
                for (const x of args.other_players) {
                    SetClients(
                        clients.set(
                            x.id,
                            new Player(x.id, x.username).recieveJson(x)
                        )
                    );
                }
            }
        );

        socket.on("new-player", (args: PlayerJSON) => {
            SetClients(
                new Map(
                    clients.set(
                        args.id,
                        new Player(args.id, args.username).recieveJson(args)
                    )
                )
            );
        });

        socket.on("start-game", () => {
            SetGameStarted(true);
        });

        socket.on("disconnected-player", (disconnectedId: string) => {
            clients.delete(disconnectedId);
            SetClients(new Map(clients));
        });
        socket.on(
            "turn-finished",
            (args: { from: string; turnId: string; pJson: PlayerJSON }) => {
                console.log(
                    `just finished: ${
                        args.turnId
                    } ${currentId} which is my id? ${args.turnId == socket.id}`
                );
                const x = clients.get(args.from);
                if (args.from !== socket.id && x) {
                    x.recieveJson(args.pJson);
                    SetClients(new Map(clients.set(args.from, x)));
                }
                SetCurrent(args.turnId);

                navRef.current?.reRenderPlayerList();
            }
        );
        socket.on("message", (message: { from: string; message: string }) => {
            navRef.current?.addMessage(message);
        });
        socket.on(
            "dice_roll_result",
            (args: {
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
                    onDone: (finish) => {
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
                                                proprety?.price ?? 0;
                                            localPlayer.properties.push({
                                                posistion: localPlayer.position,
                                                count: 0,
                                                group:
                                                    propretyMap.get(
                                                        localPlayer.position
                                                    )?.group ?? "",
                                            });
                                        } else if (b === "someones") {
                                            const players = Array.from(
                                                clients.values()
                                            );
                                            for (const p of players) {
                                                for (const prp of p.properties) {
                                                    if (
                                                        prp.posistion ===
                                                        location
                                                    ) {
                                                        var payment_ammount = 0;
                                                        if (prp.count === 0) {
                                                            payment_ammount =
                                                                proprety?.rent ??
                                                                0;
                                                        }
                                                        if (
                                                            typeof prp.count ===
                                                                "number" &&
                                                            prp.count > 0
                                                        ) {
                                                            payment_ammount =
                                                                (proprety?.multpliedrent ?? [
                                                                    0, 0, 0, 0,
                                                                ])[prp.count] ??
                                                                0;
                                                        }
                                                        if (prp.count === "h") {
                                                            payment_ammount =
                                                                (proprety?.multpliedrent ?? [
                                                                    0, 0, 0, 0,
                                                                    0,
                                                                ])[4] ?? 0;
                                                        }

                                                        localPlayer.balance -=
                                                            payment_ammount;
                                                        socket.emit("pay", {
                                                            balance:
                                                                payment_ammount,
                                                            from: socket.id,
                                                            to: p.id,
                                                        });
                                                        console.log(
                                                            `local player has payed ${payment_ammount} to ${p.id} for the posistion ${prp.posistion}`
                                                        );
                                                    }
                                                }
                                            }
                                        } else if (b === "nothing") {
                                            if (
                                                (proprety?.id ?? "") ==
                                                "gotojail"
                                            ) {
                                                localPlayer.isInJail = true;
                                                localPlayer.jailTurnsRemaining = 3;
                                                localPlayer.position = 10;
                                            }
                                            if (proprety?.id === "incometax") {
                                                localPlayer.balance -= 200;
                                            }
                                            if (proprety?.id === "luxerytax") {
                                                localPlayer.balance -= 100;
                                            }
                                        }

                                        SetClients(
                                            new Map(
                                                clients.set(
                                                    socket.id,
                                                    localPlayer
                                                )
                                            )
                                        );
                                        console.log(
                                            `player landed in ${location} and emitting finish-turn while his ballance is ${localPlayer.balance}`
                                        );
                                        finish();
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
                                    addedMoney = true;
                                    SetClients(
                                        new Map(
                                            clients.set(args.turnId, xplayer)
                                        )
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
            }
        );

        socket.on(
            "member_updating",
            (args: {
                playerId: string;
                animation: "recieveMoney";
                additional_props: any[];
                pJson: PlayerJSON;
            }) => {
                const p = clients.get(args.playerId);
                p?.recieveJson(args.pJson);

                if (socket.id === args.playerId) {
                    console.warn(
                        `SERVER ANIMATION WAS REQUESTED ${
                            args.animation
                        } with the additionalPROPS ${JSON.stringify(
                            args.additional_props
                        )}`
                    );
                }
            }
        );

        socket.on(
            "chorch_result",
            (args: {
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
                engineRef.current?.chorch(
                    args.element,
                    args.is_chance,
                    numOfTime
                );

                setTimeout(() => {
                    const c = args.element;
                    const xplayer = clients.get(args.turnId);
                    if (xplayer === undefined) return;

                    function addBalanceToOthers(amnout: number) {
                        if (xplayer === undefined) return;
                        const other_players = Array.from(
                            clients.values()
                        ).filter((v) => v.id !== xplayer.id);
                        for (const p of other_players) {
                            p.balance += amnout;
                            SetClients(new Map(clients.set(p.id, p)));
                        }
                    }

                    function playerMoveGENERATOR(
                        final_position: number,
                        xplayer: Player
                    ) {
                        var sum_moves =
                            (final_position - xplayer.position) % 40;
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
                                    xplayer.position =
                                        (xplayer.position + 1) % 40;
                                    if (xplayer.position == 0) {
                                        xplayer.balance += 200;
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
                                    if (i == sum_moves - 1) {
                                        xplayer.position = final_position;
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
                            if (c.tileid) {
                                const p = new Map(
                                    monopolyJSON.properties.map((obj) => {
                                        return [obj.id, obj];
                                    })
                                );
                                const targetPos = p.get(c.tileid)?.posistion;
                                if (!targetPos) break;
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

                        case "addfunds":
                            xplayer.balance += c.amount ?? 0;
                            break;
                        case "jail":
                            if (c.subaction !== undefined) {
                                switch (c.subaction) {
                                    case "getout":
                                        // TODO: can save that kind of card!!
                                        xplayer.getoutCards += 1;
                                        break;
                                    case "goto":
                                        xplayer.isInJail = true;
                                        xplayer.jailTurnsRemaining = 3;
                                        break;
                                }
                            }
                            break;

                        case "removefunds":
                            xplayer.balance -= c.amount ?? 0;
                            break;
                        // amount
                        case "removefundstoplayers":
                            xplayer.balance -= c.amount ?? 0;
                            addBalanceToOthers(c.amount ?? 0);
                            break;

                        case "addfundsfromplayers":
                            xplayer.balance += c.amount ?? 0;
                            addBalanceToOthers(-(c.amount ?? 0));
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

                            const generatorResults = playerMoveGENERATOR(
                                findNextValue(arr, xplayer.position),
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
                        if (xplayer.id === socket.id) {
                            console.log(
                                `player landed in ${location} and emitting finish-turn while his ballance is ${xplayer.balance}`
                            );
                            socket.emit(
                                "finish-turn",
                                (clients.get(socket.id) as Player).toJson()
                            );
                        }
                    }, time_till_finish);
                }, numOfTime);
            }
        );
        //#endregion

        socket.emit("name", name);
    }, [socket]);

    useEffect(() => {
        navRef.current?.reRenderPlayerList();
    }, [clients]);

    return gameStarted ? (
        <main>
            <MonopolyNav
                currentTurn={currentId}
                ref={navRef}
                name={name}
                socket={socket}
                players={Array.from(clients.values())}
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
    ) : (
        <>
            <h3>Hello there {name}</h3>
            the players that are currently in the lobby are
            <div>
                {Array.from(clients.values()).map((v, i) => {
                    return (
                        <p className="lobby-players" key={i}>
                            {v.username} [{v.position}]
                        </p>
                    );
                })}
            </div>
            {imReady
                ? "You Are Ready to start the MATCH!"
                : "You are Not Ready to start the match"}
            <button
                onClick={() => {
                    socket.emit("ready", !imReady);
                    SetReady(!imReady);
                }}
            >
                Set Ready
            </button>
        </>
    );
}

export default App;
