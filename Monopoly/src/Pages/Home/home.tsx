import { useState, useRef, useEffect } from "react";
import Monopoly from "./monopoly.tsx";
import "../../home.css";
import { Server, Socket, io } from "../../assets/websockets.ts";
import NotifyElement, { NotificatorRef } from "../../components/notificator.tsx";
import { MonopolyCookie, User } from "../../assets/types.ts";
import SettingsNav from "../../components/settingsNav.tsx";
import LoginScreen from "../../components/menu/loginscreen.tsx";
import JoinScreen from "../../components/menu/joinScreen.tsx";
// env
import ENV from "../../../env.json";
import { FirebaseApp, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { main } from "../../assets/server.ts";
import Slider from "../../components/utils/slider.tsx";

export default function Home() {
    var cookie: MonopolyCookie;
    try {
        const obj = JSON.parse(document.cookie);
        cookie = obj;
    } catch {
        cookie = {
            login: {
                remember: false,
                id: "",
            },
        } as MonopolyCookie;
        document.cookie = JSON.stringify(cookie);
    }

    const notifyRef = useRef<NotificatorRef>(null);
    const [socket, SetSocket] = useState<Socket>();
    // Gameplay stuff
    const [name, SetName] = useState<string>("");
    const [addr, SetAddress] = useState<string>("");

    // Account stuff
    const [firebase, setFirebase] = useState<FirebaseApp>();
    const [remember, SetRemember] = useState<boolean>(cookie.login.remember);
    const [fbUser, SetFbUser] = useState<User>();

    const [disabled, SetDisabled] = useState<boolean>(false);
    const [isSignedIn, SetSignedIn] = useState<boolean>(false);
    const [tabIndex, SetTab] = useState<number>(0);

    // Server Stuff
    const [server, SetServer] = useState<Server | undefined>(undefined);
    const [serverPCount, SetServerPCount] = useState<number>(6);

    useEffect(() => {
        document.title = "Monopoly";
        const _firebase = initializeApp(ENV.firebase);
        setFirebase(_firebase);
        var cookie: MonopolyCookie;
        try {
            const obj = JSON.parse(document.cookie);
            cookie = obj;
            if (cookie.login.remember && cookie.login.id.length > 0) {
                const db = getFirestore(_firebase);
                getDoc(doc(db, `Users/${cookie.login.id}`)).then((v) => {
                    const userData = v.data() as User;
                    SetFbUser(userData);
                    SetName(userData.name);
                });
            }
        } catch {}
    }, []);

    const joinButtonClicked = async () => {
        // Codes API
        async function Read() {
            const p = fetch(`${ENV.JSONBin.url}/latest`, {
                method: "GET",
                headers: {
                    "X-Master-Key": ENV.JSONBin.masterKey,
                    "X-Access-Key": ENV.JSONBin.accessKey,
                },
            });
            const v = await (await p).json();
            return v.record;
        }

        if (name.replace(" ", "").length === 0) {
            notifyRef.current?.message("please add your name before joining", "info", 2);
            return;
        }

        try {
            const cookie = JSON.parse(document.cookie) as MonopolyCookie;
            if (fbUser === undefined) throw Error("undefined");

            console.log(JSON.stringify(fbUser));
            cookie.login = {
                id: fbUser.id,
                remember,
            };
            document.cookie = JSON.stringify(cookie);
        } catch {
            const cookie = {
                login: {
                    id: "",
                    remember: false,
                },
            } as MonopolyCookie;
            document.cookie = JSON.stringify(cookie);
        }
        SetDisabled(true);
        const x = await Read();
        if (!Object.keys(x).includes(addr)) {
            notifyRef.current?.message("code isnt available on systems", "info", 2);
            return;
        }

        const address = x[addr] as string;
        console.log(address);
        var socket: Socket;
        // const address = "localhost"
        socket = await io(address);

        socket.on("state", (args: number) => {
            switch (args) {
                case 0:
                    SetSocket(socket);
                    SetSignedIn(true);
                    SetDisabled(false);
                    break;
                case 1:
                    notifyRef.current?.message("the game has already begun", "error", 2, () => {
                        SetDisabled(false);
                    });
                    socket.disconnect();
                    break;
                case 2:
                    notifyRef.current?.message("too many players on the server", "error", 2, () => {
                        SetDisabled(false);
                    });
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
            notifyRef.current?.message("the server does not exist or is unreachable", "error", 2, () => {
                SetDisabled(false);
            });
            socket.disconnect();
        });

        socket.on("connect_timeout", () => {
            notifyRef.current?.message("the server took too long to respond", "error", 2, () => {
                SetDisabled(false);
            });
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
        <Monopoly socket={socket} name={name} server={server} />
    ) : (
        <>
            <NotifyElement ref={notifyRef} />
            <div className="entry">
                <nav>
                    <button
                        data-select={tabIndex === 0}
                        onClick={() => {
                            SetTab(0);
                        }}
                        data-tooltip-hover="play"
                    >
                        <img src="./icon.png" alt="" />
                    </button>
                    <button
                        data-select={tabIndex === 1}
                        onClick={() => {
                            SetTab(1);
                        }}
                        data-tooltip-hover="server"
                    >
                        <img src="./server.png" alt="" />
                    </button>
                    <button
                        data-select={tabIndex === 2}
                        onClick={() => {
                            SetTab(2);
                        }}
                        data-tooltip-hover="account"
                    >
                        <img src="./human.png" alt="" />
                    </button>
                    <br />
                    <button
                        data-select={tabIndex === 3}
                        onClick={() => {
                            SetTab(3);
                        }}
                        data-tooltip-hover="credits"
                    >
                        <img src="./credits.png" alt="" />
                    </button>
                    <button
                        data-select={tabIndex === 4}
                        onClick={() => {
                            SetTab(4);
                        }}
                        data-tooltip-hover="settings"
                    >
                        <img src="./settings.png" alt="" />
                    </button>
                </nav>
                <main>
                    {tabIndex === 4 ? (
                        <SettingsNav />
                    ) : tabIndex === 3 ? (
                        <>
                            <p>This Project was made by Itay Layzerovich</p>
                            <div style={{ color: "white" }}>
                                <p> As the developer of this Monopoly game project, it is essential to clarify the following legal aspects: </p>
                                <ol>
                                    <li>
                                        <i>Game Mechanics and Rules:</i> The game mechanics and rules of Monopoly have been widely known and played
                                        for many years. This project aims to offer a digital rendition of the classic Monopoly experience, utilizing
                                        original concepts that have become common knowledge.
                                    </li>
                                    <li>
                                        {" "}
                                        <i>Original Monopoly Intellectual Property:</i>
                                        The Monopoly board game is a registered trademark and copyrighted property of Hasbro Inc. and its respective
                                        licensors. This project is not an official representation or product of Hasbro Inc., and no direct affiliation
                                        or endorsement is implied.
                                    </li>
                                    <li>
                                        <i>License and Usage:</i> This Monopoly game project is developed with the intent of being an educational and
                                        personal project. It is offered as a free-to-use, open-source initiative for learning purposes, and no
                                        commercial use or distribution is intended.
                                    </li>
                                    <li>
                                        <i>Fair Use and Transformative Work:</i>
                                        This project may fall under the category of "fair use" as it is a transformative work that provides a unique
                                        digital experience based on the original Monopoly game. It is not intended to compete with or harm the
                                        commercial interests of the original trademark owner.
                                    </li>
                                    <li>
                                        <i>No Warranty or Liability:</i> While efforts have been made to create an enjoyable and bug-free experience,
                                        this project is provided as-is without any warranty. The developer shall not be liable for any issues or
                                        damages arising from the use of this software.
                                    </li>
                                    <li>
                                        <i>Attribution:</i> This project may include third-party libraries or assets that are appropriately credited
                                        and licensed under their respective terms. Any attributions and licenses should be preserved as required by
                                        the respective authors.
                                    </li>
                                    <li>
                                        <i>Personal Responsibility:</i> As the developer, you are responsible for complying with all applicable laws,
                                        including intellectual property laws, and ensuring that your usage of this project is within legal boundaries.
                                    </li>
                                </ol>
                            </div>
                        </>
                    ) : tabIndex === 2 ? (
                        <>
                            <header>
                                <p style={{ fontSize: 12, marginBottom: 0 }}>Account</p>
                                <h3>Login</h3>
                            </header>
                            <LoginScreen
                                admin={firebase}
                                currentUser={fbUser}
                                onLogout={() => {
                                    SetRemember(false);
                                    SetFbUser(undefined);
                                    SetName("");
                                }}
                                onLogin={(v, b) => {
                                    SetTab(0);
                                    SetRemember(b);
                                    SetFbUser(v);
                                    SetName(v.name);
                                    if (!b) return;
                                    try {
                                        var cookie = JSON.parse(document.cookie) as MonopolyCookie;
                                        cookie.login = {
                                            remember: true,
                                            id: v.id,
                                        };
                                        document.cookie = JSON.stringify(cookie);
                                    } catch {
                                        var cookie = {
                                            login: {
                                                remember: true,
                                                id: v.id,
                                            },
                                        } as MonopolyCookie;
                                        document.cookie = JSON.stringify(cookie);
                                    }
                                }}
                            />
                        </>
                    ) : tabIndex === 1 ? (
                        <>
                            <header>
                                <p
                                    style={{
                                        fontSize: 12,
                                        marginBottom: 0,
                                    }}
                                >
                                    peerjs hosting
                                </p>
                                <h3>Run A Server</h3>
                            </header>
                            {server !== undefined ? (
                                <>
                                    <p>
                                        server is already running, check the console.
                                        <center>
                                            {" "}
                                            <button
                                                style={{
                                                    backgroundColor: "red",
                                                }}
                                                onClick={() => {
                                                    server.stop();
                                                    SetServer(undefined);
                                                }}
                                            >
                                                Kill Server
                                            </button>
                                        </center>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>all the servers logs will can be seen in the console</p>
                                    <table>
                                        <tr>
                                            <td>PlayersCount</td>
                                            <td>
                                                <Slider
                                                    onChange={(e) => {
                                                        SetServerPCount(parseInt(e.currentTarget.value));
                                                    }}
                                                    max={6}
                                                    min={1}
                                                    defaultValue={serverPCount}
                                                    step={1}
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                    <center>
                                        {" "}
                                        <button
                                            onClick={(e) => {
                                                e.currentTarget.disabled = true;
                                                e.currentTarget.innerHTML = "Starting Server";
                                                main(serverPCount, (host, server) => {
                                                    SetTab(0);
                                                    SetAddress(host);
                                                    SetServer(server);
                                                });
                                            }}
                                        >
                                            Run Server
                                        </button>
                                    </center>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <header>
                                <p style={{ fontSize: 9 }}>25.8.23 - Gallery (2)</p>
                                Welcome to the <h3>MONOPOLY</h3> Game
                            </header>
                            <JoinScreen
                                disabled={disabled}
                                fbUser={fbUser}
                                joinBots={() => {}}
                                joinViaCode={() => {
                                    joinButtonClicked();
                                }}
                                SetAddress={SetAddress}
                                SetName={SetName}
                                addr={addr}
                                name={name}
                            />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
