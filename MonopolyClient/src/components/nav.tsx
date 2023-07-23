import PlayersIcon from "../../public/players.png";
import ChatIcon from "../../public/chat.png";
import NChatIcon from "../../public/chat_new.png";
import LeaveIcon from "../../public/leave1.png";
import PropretiesIcon from "../../public/proprety.png";
import SettingsIcon from "../../public/settings.png";
import MonopolyIcon from "../../public/monopoly-icon/icon.png";
import DiceIcon from "../../public/monopoly-icon/roll.png";
import {
    forwardRef,
    useState,
    useImperativeHandle,
    useEffect,
    useRef,
} from "react";
import { Player } from "../assets/player";
import { Socket } from "socket.io-client";
import PropretyTab, { PropretyTabRef } from "./propretyTab";

interface MonopolyNavProps {
    name: string;
    socket: Socket;
    players: Array<Player>;
    currentTurn: string;
}
export interface MonopolyNavRef {
    addMessage: (arg: { from: string; message: string }) => void;
    reRenderPlayerList: () => void;
    clickedOnBoard: (a: number) => void;
}

const MonopolyNav = forwardRef<MonopolyNavRef, MonopolyNavProps>(
    (prop, ref) => {
        const [tabIndex, SetTab] = useState<number>(0);
        const [messages, SetMessages] = useState<
            Array<{ from: string; message: string }>
        >([]);

        function reRenderPlayerList() {
            SetDisplays(prop.players);
        }

        const [displayPlayers, SetDisplays] = useState<Array<Player>>(
            prop.players
        );
        useImperativeHandle(ref, () => ({
            addMessage(arg) {
                SetMessages((old) => [...old, arg]);
                if (tabIndex !== 2) {
                    const iconElement = document.getElementById(
                        "chatIconChange"
                    ) as HTMLDivElement;
                    const imageElement = iconElement.querySelector(
                        "img"
                    ) as HTMLImageElement;
                    imageElement.style.animation =
                        "spin3 2s cubic-bezier(.68,.05,.49,.95) infinite";
                    imageElement.src = NChatIcon;
                    iconElement.onclick = () => {
                        imageElement.src = ChatIcon;
                        imageElement.style.animation = "";
                        SetTab(2);
                        iconElement.onclick = () => {
                            SetTab(2);
                        };
                    };
                }
            },
            reRenderPlayerList,
            clickedOnBoard: (a) => {
                SetTab(1);
                requestAnimationFrame(() => {
                    propretyRef.current?.clickedOnBoard(a);
                });
            },
        }));

        const propretyRef = useRef<PropretyTabRef>(null);
        useEffect(reRenderPlayerList, [
            prop.players.map((v) => v.properties),
            prop.players.map((v) => v.balance),
        ]);
        return (
            <nav className="main">
                <nav className="header">
                    <img
                        style={{ marginTop: 75 }}
                        className="header"
                        src={MonopolyIcon}
                    />
                    <div className="upper">
                        <div
                            data-selected={tabIndex == 0}
                            onClick={() => SetTab(0)}
                            data-tooltip-hover="players"
                            className="button"
                        >
                            <img src={PlayersIcon} alt="" />
                        </div>

                        <div
                            data-selected={tabIndex == 1}
                            onClick={() => SetTab(1)}
                            data-tooltip-hover="propreties"
                            className="button"
                        >
                            <img src={PropretiesIcon} alt="" />
                        </div>

                        <div
                            data-selected={tabIndex == 2}
                            onClick={() => SetTab(2)}
                            data-tooltip-hover="chat"
                            className="button"
                            id="chatIconChange"
                        >
                            <img src={ChatIcon} alt="" />
                        </div>
                    </div>
                    <div className="lower">
                        <div
                            data-selected={tabIndex == 3}
                            onClick={() => SetTab(3)}
                            data-tooltip-hover="settings"
                            className="button"
                        >
                            <img src={SettingsIcon} alt="" />
                        </div>
                        <div
                            data-tooltip="leave"
                            className="button color"
                            data-tooltip-hover="leave"
                        >
                            <img src={LeaveIcon} alt="" />
                        </div>
                    </div>
                </nav>

                <nav className="content" data-index={tabIndex}>
                    {tabIndex == 1 ? (
                        <PropretyTab
                            ref={propretyRef}
                            players={displayPlayers}
                            socket={prop.socket}
                        />
                    ) : tabIndex == 2 ? (
                        <>
                            <h3 style={{ textAlign: "center" }}>Chat</h3>
                            <div className="main-chat">
                                <div className="messages">
                                    {messages.map((v, i) => (
                                        <div key={i} className="message">
                                            <p>{v.from}:</p>
                                            <p>{v.message}</p>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    placeholder="Type Message Here..."
                                    type="text"
                                    onKeyDown={(e) => {
                                        console.log(e.which);
                                        if (
                                            e.which === 13 &&
                                            e.currentTarget.value.length > 0
                                        ) {
                                            //send the message
                                            const message =
                                                e.currentTarget.value;

                                            prop.socket.emit(
                                                "message",
                                                message
                                            );
                                            e.currentTarget.value = "";
                                        }
                                    }}
                                />
                            </div>
                        </>
                    ) : tabIndex == 3 ? (
                        <>
                            <h3 style={{ textAlign: "center" }}>Settings</h3>
                            <p>
                                Game Engine{" "}
                                <select name="" id="">
                                    <option>2D</option>
                                    <option>3D</option>
                                </select>
                            </p>
                        </>
                    ) : tabIndex == 0 ? (
                        <>
                            <h3 style={{ textAlign: "center" }}>Players</h3>
                            {displayPlayers.map((v, i) => (
                                <div
                                    key={i}
                                    className="playerInfo"
                                    onClick={() => {
                                        const element = document.querySelector(
                                            `div.player[player-id="${v.id}"]`
                                        ) as HTMLDivElement;
                                        element.style.animation =
                                            "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite";
                                        setTimeout(() => {
                                            element.style.animation = "";
                                        }, 1 * 1000);
                                    }}
                                >
                                    <p>{v.username}</p>
                                    {v.id === prop.currentTurn ? (
                                        <img src={DiceIcon} />
                                    ) : (
                                        <></>
                                    )}
                                    <p>{v.balance}</p>
                                    <p>{v.properties.length}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </nav>
            </nav>
        );
    }
);
export default MonopolyNav;
