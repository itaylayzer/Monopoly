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
        console.log("called");
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

                engineRef.current?.diceResults({
                    l: [args.listOfNums[0], args.listOfNums[1]],
                    time: 0.35 * 1000 * sumTimes + 2000 + 800,
                    onDone: (finish) => {
                        if (socket.id !== args.turnId) return;

                        const location = clients.get(socket.id)?.position ?? -1;
                        engineRef.current?.setStreet({location, onResponse:(b)=>{
                            const localPlayer = (clients.get(socket.id) as Player);
                            if (b){
                                localPlayer.properties.push({posistion:localPlayer.position,hotels:0,houses:0, group:propretyMap.get(localPlayer.position)?.group ?? ""})
                            }
                            SetClients(new Map(clients.set(socket.id, localPlayer)));
                            console.log(localPlayer.properties)
                            finish();
                            socket.emit(
                                "finish-turn",
                                (clients.get(socket.id) as Player).toJson()
                            );
                        }})
                    },
                });

                setTimeout(()=>{
                    var i = 0;
                    const element = document.querySelector(
                        `div.player[player-id="${args.turnId}"]`
                    ) as HTMLDivElement;
                    const x = clients.get(args.turnId) as Player;
                    x.position += 1;
                    element.style.animation =
                                    "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                    const movingAnim = ()=>{
                       
                        const x = clients.get(args.turnId) as Player;
                        if (i < sumTimes) {
                            i +=1;
                            x.position = (x.position + 1) % 40;
    
                            if (i == sumTimes - 1) {
                                x.position = args.listOfNums[2];
                                element.style.animation =
                                    "part 0.9s cubic-bezier(0,.7,.57,1)";
                                    setTimeout(()=>{element.style.animation=""},900);
                            }
                            else {
                                element.style.animation =
                                    "jumpstreet 0.35s cubic-bezier(.26,1.5,.65,1.02)";
                                setTimeout(movingAnim, 0.35 * 1000);
                            } 
                        }
                        
                    }
                    setTimeout(movingAnim,  0.35 * 1000);
                }, 2000)
                
            }
        );
        //#endregion

        socket.emit("name", name);
    }, [socket]);

    useEffect(()=>{
        navRef.current?.reRenderPlayerList();
    },[clients])

    return gameStarted ? (
        <main>
            <MonopolyNav
            currentTurn={currentId}
                ref={navRef}
                name={name}
                socket={socket}
                players={Array.from(clients.values())}
            />
            <div className="game">
                <MonopolyGame
                clickedOnBoard={(a)=>{
                    navRef.current?.clickedOnBoard(a);
                }}
                    ref={engineRef}
                    socket={socket}
                    players={Array.from(clients.values())}
                    myTurn={currentId === socket.id}
                />
            </div>
        </main>
    ) : (
        <>
            <h3>Hello there {name}</h3>
            the players that are currently in the lobby are
            <div>
                {Array.from(clients.values()).map((v, i) => {
                    return (
                        <p className="lobby-players" key={i}>
                            {v.username}
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
