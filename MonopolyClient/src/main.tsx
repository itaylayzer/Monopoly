import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Monopoly from "./monopoly.tsx";
import "./index.css";
import { Socket, io } from "socket.io-client";

function App() {
    const [socket, SetSocket] = useState<Socket>();
    const [name, SetName] = useState<string>("Player A");
    const [isSignedIn, SetSignedIn] = useState<boolean>(false);

    return socket !== undefined && isSignedIn === true ? (
        <Monopoly socket={socket} name={name} />
    ) : (
        <>
            <input
                type="text"
                id="name"
                onChange={(e) => SetName(e.currentTarget.value)}
                defaultValue={"Player A"}
                placeholder="enter name"
            />
            <button
                onClick={() => {
                    const socket = io("localhost:5175");
                    socket.on("state", (args: boolean) => {
                        if (args) {
                            SetSocket(socket);
                        } else {
                            alert("the game has already begon");
                        }
                    });

                    SetSignedIn(true);
                }}
            >
                join
            </button>
        </>
    );
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
