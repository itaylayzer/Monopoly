import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { GlobalPlayer, Player, PlayerJSON } from "./assets/player";
import "./monopoly.css";
import MonopolyNav from "./components/nav";
import MonopolyGame from "./components/game";
function App({ socket, name }: { socket: Socket; name: string }) {
    const [localPlayer, SetLocalPlayer] = useState<Player>();
    const [turnId, SetTurn] = useState<string>("");
    const [clients, SetClients] = useState<Map<string, GlobalPlayer>>(
        new Map()
    );
    const [gameStarted, SetGameStarted] = useState<boolean>(false);
    const [imReady, SetReady] = useState<boolean>(false);

    useEffect(() => {
        socket.on(
            "initials",
            (args: { turn_id: string; other_players: Array<PlayerJSON> }) => {
                SetTurn(args.turn_id);
                for (const x of args.other_players) {
                    if (x.id === socket.id) {
                        SetLocalPlayer(
                            new Player(socket.id, name).recieveJson(x)
                        );
                    } else {
                        SetClients(
                            clients.set(
                                x.id,
                                new GlobalPlayer(x.id, x.username).recieveJson(
                                    x
                                )
                            )
                        );
                    }
                }
            }
        );
        socket.on("new-player", (args: PlayerJSON) => {
            SetClients(
                new Map(
                    clients.set(
                        args.id,
                        new GlobalPlayer(args.id, args.username).recieveJson(
                            args
                        )
                    )
                )
            );
        });
        socket.on("start-game", (args) => {
            SetGameStarted(true);
        });

        socket.on("disconnected-player", (disconnectedId: string) => {
            clients.delete(disconnectedId);
            SetClients(new Map(clients));
        });
        socket.emit("name", name);
    }, []);

    return gameStarted ? (
        <main>
            <MonopolyNav name={name} socket={socket}
                players={Array.from(clients.values()).concat(
                    localPlayer as GlobalPlayer
                )}
            />
            <div className="game">
                <MonopolyGame players={Array.from(clients.values()).concat(
                    localPlayer as GlobalPlayer
                )} myTurn={true}/>
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
                            {v.name}
                        </p>
                    );
                })}
                <p className="lobby-players">{name}</p>
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
