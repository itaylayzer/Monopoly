import PlayersIcon from "../../public/players.png";
import ChatIcon from "../../public/chat.png";
import LeaveIcon from "../../public/leave1.png";
import PropretiesIcon from "../../public/proprety.png";
import SettingsIcon from "../../public/settings.png";
import MonopolyIcon from "../../public/monopoly-icon/icon.png";
import { useEffect, useState } from "react";
import { GlobalPlayer } from "../assets/player";
import { Socket } from "socket.io-client";

export default function MonopolyNav(args: {
    name: string;
    socket: Socket;
    players: Array<GlobalPlayer>;
}) {
    const [tabIndex, SetTab] = useState<number>(0);
    const [messages, SetMessages] = useState<
        Array<{ from: string; message: string }>
    >([]);

   
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
                    <>
                        <h3 style={{ textAlign: "center" }}>Propreties</h3>
                    </>
                ) : tabIndex == 2 ? (
                    <>
                        <h3 style={{ textAlign: "center" }}>Chat</h3>
                        <div className="main-chat">
                            <div className="messages">
                                {messages.map((v, i) => (
                                    <div className="message">
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
                                        const message = e.currentTarget.value;
                                        SetMessages((old) => [
                                            ...old,
                                            { from: args.name, message },
                                        ]);
                                        args.socket.emit("message", message);
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
                        {args.players.map((v, i) => (
                            <div key={i} className="playerInfo" onClick={()=>{
                                const element = document.querySelector(`div.player#${v.id}`) as HTMLDivElement;
                                element.style.animation = "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite"
                                setTimeout(()=>{
                                    element.style.animation = "";
                                },1 * 1000);
                            }}>
                                <p>{v.name}</p>
                                <p>{v.money}</p>
                                <p>{v.propcount}</p>
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
