import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { Player, PlayerJSON } from "./assets/player";
import "./monopoly.css";
import MonopolyNav, { MonopolyNavRef } from "./components/nav";
import MonopolyGame, { MonopolyGameRef } from "./components/game";
function App({ socket, name }: { socket: Socket; name: string }) {
    const [clients, SetClients] = useState<Map<string, Player>>(new Map());
    const [currentId, SetCurrent] = useState<string>("");
    const [gameStarted, SetGameStarted] = useState<boolean>(false);
    const [imReady, SetReady] = useState<boolean>(false);
    const engineRef = useRef<MonopolyGameRef>(null);
    const navRef = useRef<MonopolyNavRef>(null);

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
                    time:0.5 * 1000 * sumTimes,
                    onDone: () => {
                        if (socket.id !== args.turnId) return;
                        socket.emit(
                            "finish-turn",
                            (clients.get(socket.id) as Player).toJson()
                        );
                    },
                });

                
                var i = 0;
                const x = clients.get(args.turnId) as Player;
                x.position += 1;
                const movingAnim = ()=>{
                    const element = document.querySelector(
                        `div.player[player-id="${args.turnId}"]`
                    ) as HTMLDivElement;
                    const x = clients.get(args.turnId) as Player;
                    if (i < sumTimes) {
                        i +=1;
                        x.position += 1;

                        if (i == sumTimes - 1) {
                            x.position = args.listOfNums[2];
                            element.style.animation =
                                "part 0.9s cubic-bezier(0,.7,.57,1)";
                        }
                        else setTimeout(movingAnim, 0.5 * 1000);
                    }
                    
                }
                setTimeout(movingAnim, 0.5 * 1000);
            }
        );
        //#endregion

        socket.emit("name", name);
    }, [socket]);

    return gameStarted ? (
        <main>
            <MonopolyNav
                ref={navRef}
                name={name}
                socket={socket}
                players={Array.from(clients.values())}
            />
            <div className="game">
                {currentId} <br /> {socket.id}
                <MonopolyGame
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
