import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Monopoly from "./monopoly.tsx";
import "./index.css";
import { Socket, io } from "socket.io-client";
import NotifyElement, { NotificatorRef } from "./components/notificator";
import { MonopolyCookie } from "./assets/types.ts";

function App() {
    var cookie: MonopolyCookie;
    try {
        const obj = JSON.parse(document.cookie);
        cookie = obj;
    } catch {
        cookie = {
            login: {
                rememberHost: false,
                rememberName: false,
                host: "",
                name: "",
            },
        };
    }

    const notifyRef = useRef<NotificatorRef>(null);
    const [socket, SetSocket] = useState<Socket>();
    const [name, SetName] = useState<string>(
        cookie.login.rememberName ? cookie.login.name : ""
    );
    const [addr, SetAddress] = useState<string>(
        cookie.login.rememberHost ? cookie.login.host : ""
    );
    const [rememberName, SetRememberName] = useState<boolean>(
        cookie.login.rememberName
    );
    const [rememberAdrr, SetRememberAdrr] = useState<boolean>(
        cookie.login.rememberHost
    );

    const [disabled, SetDisabled] = useState<boolean>(false);

    const [isSignedIn, SetSignedIn] = useState<boolean>(false);
    const joinButtonClicked = (
        // @ts-ignore
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (name.replace(" ", "").length === 0) {
            notifyRef.current?.message(
                "please add your name before joining",
                "info",
                2
            );
            return;
        }
        const cookie = JSON.parse(document.cookie) as MonopolyCookie;

        cookie.login = {
                host: addr,
                name: name,
                rememberHost: rememberAdrr,
                rememberName: rememberName,
            };
        document.cookie = JSON.stringify(cookie)


        const socket = io(addr, { rejectUnauthorized: false });
        SetDisabled(true);
        socket.on("state", (args: number) => {
            switch (args) {
                case 0:
                    SetSocket(socket);
                    SetSignedIn(true);
                    SetDisabled(false);
                    break;
                case 1:
                    notifyRef.current?.message(
                        "the game has already begun",
                        "error",
                        2,
                        () => {
                            SetDisabled(false);
                        }
                    );
                    socket.disconnect();
                    break;
                case 2:
                    notifyRef.current?.message(
                        "too many players on the server",
                        "error",
                        2,
                        () => {
                            SetDisabled(false);
                        }
                    );
                    socket.disconnect();
                    break;
                default:
                    notifyRef.current?.message("unkown error", "error", 2);
                    socket.disconnect();
                    SetDisabled(false);
                    break;
            }
        });
        socket.on("connect_error", () => {
            notifyRef.current?.message(
                "the server does not exist or is unreachable",
                "error",
                2,
                () => {
                    SetDisabled(false);
                }
            );
            socket.disconnect();
        });
        socket.on("connect_timeout", () => {
            notifyRef.current?.message(
                "the server took too long to respond",
                "error",
                2,
                () => {
                    SetDisabled(false);
                }
            );
            socket.disconnect();
        });
    };

    useEffect(() => {
        const uriParams = new URLSearchParams(document.location.search);
        if (uriParams.has("ip")) {
            SetAddress("https://" + uriParams.get("ip") ?? "");
        }
    }, []);

    return socket !== undefined && isSignedIn === true ? (
        <Monopoly socket={socket} name={name} />
    ) : (
        <>
            <NotifyElement ref={notifyRef} />

            <div className="entry">
                <header>
                    <p style={{ fontSize: 9 }}>28.7.23</p>
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
                        onChange={(e) =>
                            SetRememberName(e.currentTarget.checked)
                        }
                        type="checkbox"
                    />
                </h5>
                <h5>
                    do you want your host to be remembered?{" "}
                    <input
                        id="rememberedHost"
                        checked={rememberAdrr}
                        onChange={(e) =>
                            SetRememberAdrr(e.currentTarget.checked)
                        }
                        type="checkbox"
                    />
                </h5>

                <center>
                    <button onClick={joinButtonClicked} disabled={disabled}>
                        join
                    </button>
                </center>
            </div>
        </>
    );
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);
