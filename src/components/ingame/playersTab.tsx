import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Socket } from "../../assets/sockets.ts";
import { Player } from "../../assets/player.ts";
import DiceIcon from "../../../public/roll.png";
import { translateGroup } from "./streetCard.tsx";
import monopolyJSON from "../../assets/monopoly.json";
import HouseIcon from "../../../public/h.png";
import HotelIcon from "../../../public/ho.png";
import { MonopolyCookie, MonopolySettings } from "../../assets/types.ts";
// @ts-ignore
import { CookieManager } from "../../assets/cookieManager.ts";
interface PlayersTabProps {
    socket: Socket;
    players: Array<Player>;
    currentTurn: string;
    clickedOnPlayer: (position: number) => void;
}
export interface PlayersTabRef {
    clickdOnPlayer: (playerId: string) => void;
}

const playersTab = forwardRef<PlayersTabRef, PlayersTabProps>((props, ref) => {
    const localPlayer: Player | undefined = props.players.filter((v) => v.id === props.socket.id)[0];
    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );

    const [current, SetCurrentPlayer] = useState<Player | undefined>();
    const [settings, SetSettings] = useState<MonopolySettings>();
    useEffect(() => {
        SetSettings((JSON.parse(decodeURIComponent(CookieManager.get("monopolySettings") as string)) as MonopolyCookie).settings);
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

    function sum(number: number[]) {
        var x = 0;
        for (const n of number) {
            x += n;
        }
        return x;
    }

    return (
        <>
            <div className={localPlayer !== undefined ? "container-top" : ""} style={localPlayer === undefined ? { height: "100%" } : {}}>
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
                {current !== undefined ? (
                    <>
                        <table>
                            <tr>
                                <td>balance</td>
                                <td>{current.balance}</td>
                            </tr>
                            <tr>
                                <td>position</td>
                                <td>
                                    {propretyMap.get(current.position)?.name} [{current.position}]
                                </td>
                            </tr>
                            <tr>
                                <td>properties counts</td>
                                <td>{current.properties.length}</td>
                            </tr>
                            <tr>
                                <td>houses counts</td>
                                <td>{sum(current.properties.filter((v) => typeof v.count === "number").map((v) => v.count as number))}</td>
                            </tr>
                            <tr>
                                <td>hotel counts</td>
                                <td>{current.properties.filter((v) => v.count === "h").length}</td>
                            </tr>
                            <tr>
                                <td>get-out cards</td>
                                <td>{current.getoutCards}</td>
                            </tr>
                            <tr>
                                <td>is in jail</td>
                                <td>{current.isInJail.toString()}</td>
                            </tr>
                        </table>
                        {current.properties.length === 0 ? (
                            <p></p>
                        ) : (
                            <>
                                {current.properties.map((v, i) => (
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
                                                backgroundColor: translateGroup(v.group),
                                            }}
                                        ></i>
                                        <h3 style={v.morgage !== undefined && v.morgage === true ? { textDecoration: "line-through white" } : {}}>
                                            {propretyMap.get(v.posistion)?.name ?? ""}
                                        </h3>
                                        <div>
                                            {v.count == "h" ? (
                                                <img src={HotelIcon.replace("public/", "")} alt="" />
                                            ) : typeof v.count === "number" && v.count > 0 ? (
                                                <>
                                                    <p>{v.count}</p>
                                                    <img src={HouseIcon.replace("public/", "")} alt="" />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <div className="playersInfos">
                        {props.players.map((v, i) => (
                            <>
                                <div
                                    key={`playersInfos[${i}]`}
                                    className="playerInfo"
                                    style={
                                        settings !== undefined && settings.accessibility[4] === true
                                            ? {
                                                  backgroundColor: v.color,
                                              }
                                            : {}
                                    }
                                    onClick={() => {
                                        const element = document.querySelector(`div.player[player-id="${v.id}"]`) as HTMLDivElement;
                                        element.style.animation = "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite";
                                        setTimeout(() => {
                                            element.style.animation = "";
                                        }, 1 * 1000);
                                    }}
                                    onDoubleClick={() => {
                                        SetCurrentPlayer(v);
                                    }}
                                >
                                    <p key={60}>
                                        {settings?.accessibility[2] ? `[${v.id}]` : ""} {v.username}
                                    </p>
                                    {v.id === props.currentTurn ? <img src={DiceIcon.replace("public/", "")} /> : <></>}
                                    {v.getoutCards > 0 ? (
                                        <p key={61} className="orange">
                                            {v.getoutCards}
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                    <p key={62}>{v.balance}</p>
                                    <p key={63}>{v.properties.length}</p>
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>

            {localPlayer !== undefined ? (
                <>
                    <div className="container-bottom" style={{}}>
                        <p style={{ margin: 0, marginTop: 5 }}> {localPlayer.balance} M</p>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
});

export default playersTab;
