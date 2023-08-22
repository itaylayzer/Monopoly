import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Socket } from "../assets/websockets.ts";
import { Player } from "../assets/player";
import DiceIcon from "../../public/roll.png";
import { translateGroup } from "./streetCard";
import monopolyJSON from "../assets/monopoly.json";
import HouseIcon from "../../public/h.png";
import HotelIcon from "../../public/ho.png";
import { MonopolyCookie, MonopolySettings } from "../assets/types";
import { Socket as SocIO } from "socket.io-client";
interface PlayersTabProps {
    socket: Socket | SocIO;
    players: Array<Player>;
    currentTurn: string;
    clickedOnPlayer: (position: number) => void;
}
export interface PlayersTabRef {
    clickdOnPlayer: (playerId: string) => void;
}

const playersTab = forwardRef<PlayersTabRef, PlayersTabProps>((props, ref) => {
    const localPlayer: Player | undefined = props.players.filter(
        (v) => v.id === props.socket.id
    )[0];
    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );

    const [current, SetCurrentPlayer] = useState<Player | undefined>();
    const [settings, SetSettings] = useState<MonopolySettings>();
    useEffect(() => {
        SetSettings((JSON.parse(document.cookie) as MonopolyCookie).settings)
    }, [document.cookie]);

    useImperativeHandle(ref, () => ({
        clickdOnPlayer(playerId) {
            for (const x of props.players) {
                if (x.id === playerId) {
                    SetCurrentPlayer(x);
                }
            }
        },
    }));

    return (
        <>
            <div
                className={localPlayer !== undefined ? "container-top" : ""}
                style={localPlayer === undefined ? { height: "100%" } : {}}
            >
                <h3
                    data-clickable={current !== undefined}
                    style={{ textAlign: "center" }}
                    onClick={() => {
                        if (current === undefined) return;
                        SetCurrentPlayer(undefined);
                    }}
                >
                    Players
                </h3>
                {current != undefined ? (
                    <>
                        <h4>Cards</h4>
                        <h4>Propreties</h4>
                        {current.properties.length === 0 ? (
                            <p>none</p>
                        ) : (
                            current.properties.map((v, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        SetCurrentPlayer(undefined);
                                        props.clickedOnPlayer(v.posistion);
                                    }}
                                    className="proprety-nav"
                                >
                                    <i
                                        className="box"
                                        style={{
                                            backgroundColor: translateGroup(
                                                v.group
                                            ),
                                        }}
                                    ></i>
                                    <h3>
                                        {propretyMap.get(v.posistion)?.name ??
                                            ""}
                                    </h3>
                                    <div>
                                        {v.count == "h" ? (
                                            <img
                                                src={HotelIcon.replace(
                                                    "public/",
                                                    ""
                                                )}
                                                alt=""
                                            />
                                        ) : typeof v.count === "number" &&
                                          v.count > 0 ? (
                                            <>
                                                <p>{v.count}</p>
                                                <img
                                                    src={HouseIcon.replace(
                                                        "public/",
                                                        ""
                                                    )}
                                                    alt=""
                                                />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <div className="playersInfos">
                        {props.players.map((v, i) => (
                            <>
                                <div
                                    key={i}
                                    className="playerInfo"
                                    style={
                                        settings !== undefined &&
                                        settings.accessibility[4] === true
                                            ? {
                                                  backgroundColor: v.color,
                                              }
                                            : {}
                                    }
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
                                    onDoubleClick={() => {
                                        SetCurrentPlayer(v);
                                    }}
                                >
                                    <p>
                                        {settings?.accessibility[2]
                                            ? `[${v.id}]`
                                            : ""}{" "}
                                        {v.username}
                                    </p>
                                    {v.id === props.currentTurn ? (
                                        <img
                                            src={DiceIcon.replace(
                                                "public/",
                                                ""
                                            )}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {v.getoutCards > 0 ? (
                                        <p className="orange">
                                            {v.getoutCards}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    <p>{v.balance}</p>
                                    <p>{v.properties.length}</p>
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>

            {localPlayer !== undefined ? (
                <>
                    <div className="container-bottom" style={{}}>
                        <p style={{ margin: 0, marginTop: 5 }}>
                            {" "}
                            {localPlayer.balance} M
                        </p>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
});

export default playersTab;
