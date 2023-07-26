import { useState } from "react";
import ReactDOM from "react-dom/client";
import Monopoly from "./monopoly.tsx";
import "./index.css";
import { Socket, io } from "socket.io-client";

type MonopolyCookie = {
    name: string;
    host: string;
    rememberHost: boolean;
    rememberName: boolean;
};

function App() {
    var cookie: MonopolyCookie;
    try {
        cookie = JSON.parse(document.cookie);
    } catch {
        cookie = {
            rememberHost: false,
            rememberName: false,
            host: "",
            name: "",
        };
    }

    const [socket, SetSocket] = useState<Socket>();
    const [name, SetName] = useState<string>(
        cookie.rememberName ? cookie.name : ""
    );
    const [addr, SetAddress] = useState<string>(
        cookie.rememberHost ? cookie.host : ""
    );
    const [rememberName, SetRememberName] = useState<boolean>(
        cookie.rememberName
    );
    const [rememberAdrr, SetRememberAdrr] = useState<boolean>(
        cookie.rememberHost
    );

    const [isSignedIn, SetSignedIn] = useState<boolean>(false);

    const joinButtonClicked = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        document.cookie = JSON.stringify({
            host: addr,
            name: name,
            rememberHost: rememberAdrr,
            rememberName: rememberName,
        } as MonopolyCookie);

        const socket = io(addr);
        socket.on("state", (args: boolean) => {
            if (args) {
                SetSocket(socket);
            } else {
                alert("the game has already begon");
            }
        });

        SetSignedIn(true);
    };

    return socket !== undefined && isSignedIn === true ? (
        <Monopoly socket={socket} name={name} />
    ) : (
        <div className="entry">
            <header>
                Welcome to the <h3>MONOPOLY</h3> Game
            </header>
            <br></br>
            <p>please enter your ip and port:</p>
            <input
                type="text"
                id="name"
                onChange={(e) => SetAddress(e.currentTarget.value)}
                defaultValue={addr}
                placeholder="enter ip"
            />

            <p>please enter your name:</p>
            <input
                type="text"
                id="name"
                onChange={(e) => SetName(e.currentTarget.value)}
                defaultValue={name}
                placeholder="enter name"
            />

            <h5>
                do you want your name to be remembered?{" "}
                <input
                    id="rememberedName"
                    checked={rememberName}
                    onClick={(e) => SetRememberName(e.currentTarget.checked)}
                    type="checkbox"
                />
            </h5>
            <h5>
                do you want your host to be remembered?{" "}
                <input
                    id="rememberedHost"
                    checked={rememberAdrr}
                    onClick={(e) => SetRememberAdrr(e.currentTarget.checked)}
                    type="checkbox"
                />
            </h5>

            <center>
                <button onClick={joinButtonClicked}>join</button>
            </center>
        </div>
    );
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);
