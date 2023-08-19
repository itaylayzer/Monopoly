import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Monopoly from "./monopoly.tsx";
import "./index.css";
import { Socket, io } from "socket.io-client";
import NotifyElement, { NotificatorRef } from "./components/notificator";
import { MonopolyCookie } from "./assets/types.ts";
import SettingsNav from "./components/settingsNav";
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

    const [tabIndex, SetTab] = useState<number>(0);
    const joinButtonClicked = async (
        // @ts-ignore
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        // Codes API
        const masterKey =
            "$2b$10$1ACAXPZ5cZsfoGZJXiAVCO7rEzlJpV/7UEshZRZ3HK3sYEb5Hfmbu";
        const accessKey =
            "$2b$10$A65XZEY3pw0uyBKsr0meheXZmBtuTA.TqZuDLPiCdpHggppH0OTWu";
        async function Read() {
            const p = fetch(
                "https://api.jsonbin.io/v3/b/64dff3e3b89b1e2299d2cfcf/latest",
                {
                    method: "GET",
                    headers: {
                        "X-Master-Key": masterKey,
                        "X-Access-Key": accessKey,
                    },
                }
            );
            const v = await (await p).json();
            return v.record;
        }

        const x = await Read();
        if (!Object.keys(x).includes(addr)) {
            notifyRef.current?.message(
                "code isnt available on systems",
                "info",
                2
            );
            return;
        }
        if (name.replace(" ", "").length === 0) {
            notifyRef.current?.message(
                "please add your name before joining",
                "info",
                2
            );
            return;
        }

        try {
            const cookie = JSON.parse(document.cookie) as MonopolyCookie;

            cookie.login = {
                host: addr,
                name: name,
                rememberHost: rememberAdrr,
                rememberName: rememberName,
            };
            document.cookie = JSON.stringify(cookie);
        } catch {
            const cookie = {
                login: {
                    host: addr,
                    name: name,
                    rememberHost: rememberAdrr,
                    rememberName: rememberName,
                },
            } as MonopolyCookie;
            document.cookie = JSON.stringify(cookie);
        }

        const address = "https://" + x[addr];
        const socket = io(address, { rejectUnauthorized: false });
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
            SetAddress(uriParams.get("ip") ?? "");
        }
    }, []);

    return socket !== undefined && isSignedIn === true ? (
        <Monopoly socket={socket} name={name} />
    ) : (
        <>
            <NotifyElement ref={notifyRef} />
            <img id="landscape" src="landscape.png" alt="" style={{opacity:0.03, filter:"blur(7px)"}}/>
            <div className="entry">
                
                <nav>
                    <button
                        data-select={tabIndex === 0}
                        onClick={() => {
                            SetTab(0);
                        }}
                    >
                        <img src="./icon.png" alt="" />
                    </button>
                    <button
                        data-select={tabIndex === 1}
                        onClick={() => {
                            SetTab(1);
                        }}
                    >
                        <img src="./settings.png" alt="" />
                    </button>
                    <button
                        data-select={tabIndex === 2}
                        onClick={() => {
                            SetTab(2);
                        }}
                    >
                        <img src="./credits.png" alt="" />
                    </button>
                </nav>
                <main>
                    {tabIndex === 2 ? (
                        <>
                            <p>This Project was made by Itay Layzerovich</p>
                            <p>
                                As the developer of this Monopoly game project,
                                it is essential to clarify the following legal
                                aspects:{" "}
                                <ol>
                                    <li>
                                        <i>Game Mechanics and Rules:</i> The game
                                        mechanics and rules of Monopoly have
                                        been widely known and played for many
                                        years. This project aims to offer a
                                        digital rendition of the classic
                                        Monopoly experience, utilizing original
                                        concepts that have become common
                                        knowledge.
                                    </li>
                                    <li> <i>Original Monopoly Intellectual Property:</i>
                                    The Monopoly board game is a registered
                                    trademark and copyrighted property of Hasbro
                                    Inc. and its respective licensors. This
                                    project is not an official representation or
                                    product of Hasbro Inc., and no direct
                                    affiliation or endorsement is implied.
                                    </li>
                                    <li>
                                    <i>License and Usage:</i> This Monopoly game
                                        project is developed with the intent of
                                        being an educational and personal
                                        project. It is offered as a free-to-use,
                                        open-source initiative for learning
                                        purposes, and no commercial use or
                                        distribution is intended.
                                    </li>
                                    <li>
                                    <i>Fair Use and Transformative Work:</i>
                                        This project may fall under the category
                                        of "fair use" as it is a transformative
                                        work that provides a unique digital
                                        experience based on the original
                                        Monopoly game. It is not intended to
                                        compete with or harm the commercial
                                        interests of the original trademark
                                        owner.
                                    </li>
                                    <li>
                                    <i>No Warranty or Liability:</i> While
                                        efforts have been made to create an
                                        enjoyable and bug-free experience, this
                                        project is provided as-is without any
                                        warranty. The developer shall not be
                                        liable for any issues or damages arising
                                        from the use of this software.
                                    </li>
                                    <li>
                                    <i>Attribution:</i> This project may include
                                        third-party libraries or assets that are
                                        appropriately credited and licensed
                                        under their respective terms. Any
                                        attributions and licenses should be
                                        preserved as required by the respective
                                        authors.
                                    </li>
                                    <li>
                                    <i>Personal Responsibility:</i> As the
                                        developer, you are responsible for
                                        complying with all applicable laws,
                                        including intellectual property laws,
                                        and ensuring that your usage of this
                                        project is within legal boundaries.
                                    </li>
                                </ol>
                            </p>
                        </>
                    ) : tabIndex === 1 ? (
                        <SettingsNav/>
                    ) : (
                        <>
                            <header>
                                <p style={{ fontSize: 9 }}>19.8.23 - Codes & Menu</p>
                                Welcome to the <h3>MONOPOLY</h3> Game
                            </header>
                            <br></br>
                            <p>please enter your code:</p>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) =>
                                    SetAddress(e.currentTarget.value)
                                }
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
                                <button
                                    onClick={joinButtonClicked}
                                    disabled={disabled}
                                >
                                    join
                                </button>
                            </center>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}

document.title = "Monopoly";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
);
