import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Socket } from "socket.io-client";
import { Player } from "../assets/player";
import DiceIcon from "../../public/monopoly-icon/roll.png";
import { translateGroup } from "./streetCard";
import monopolyJSON from "../assets/monopoly.json";
import HouseIcon from "../../public/monopoly-icon/h.png";
import HotelIcon from "../../public/monopoly-icon/ho.png";

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
    const localPlayer: Player | undefined = props.players.filter(
        (v) => v.id === props.socket.id
    )[0];
    const propretyMap = new Map(
        monopolyJSON.properties.map((obj) => {
            return [obj.posistion ?? 0, obj];
        })
    );

    const [current, SetCurrentPlayer] = useState<Player | undefined>();
    useImperativeHandle(ref, () => ({
        clickdOnPlayer(playerId) {
            for (const x of props.players) {
                if (x.id === playerId) {
                    SetCurrentPlayer(x);
                }
            }
        },
    }));

    useEffect(() => {
        // resizing funtuallity!
        // Query the element
        const resizer = document.getElementById("dragMe") as HTMLDivElement;
        const leftSide = resizer.previousElementSibling as HTMLDivElement;
        const rightSide = resizer.nextElementSibling as HTMLDivElement;

        // The current position of mouse
        let y = 0;
        let topHeight = 0;

        // Handle the mousedown event
        // that's triggered when user drags the resizer
        const mouseMoveHandler = function (e: MouseEvent) {
            // How far the mouse has been moved
            const dy = e.clientY - y;

            const newTopHeight =
                ((topHeight + dy) * 100) /
                ((resizer.parentNode as HTMLDivElement).getBoundingClientRect()
                    .height ?? 0);
            leftSide.style.height = `${newTopHeight}%`;

            resizer.style.cursor = "row-resize";
            document.body.style.cursor = "row-resize";

            leftSide.style.userSelect = "none";
            leftSide.style.pointerEvents = "none";

            rightSide.style.userSelect = "none";
            rightSide.style.pointerEvents = "none";
        };

        const mouseUpHandler = function () {
            resizer.style.removeProperty("cursor");
            document.body.style.removeProperty("cursor");

            leftSide.style.removeProperty("user-select");
            leftSide.style.removeProperty("pointer-events");

            rightSide.style.removeProperty("user-select");
            rightSide.style.removeProperty("pointer-events");

            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        };

        const mouseDownHandler = function (e: MouseEvent) {
            // Get the current mouse position
            y = e.clientY;
            topHeight = leftSide.getBoundingClientRect().height;

            // Attach the listeners to `document`
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
        };
        // Attach the handler
        resizer.addEventListener("mousedown", mouseDownHandler);

        return () => {
            resizer.removeEventListener("mousedown", mouseDownHandler);
        };
    }, []);

    return (
        <>
            <div
                className={localPlayer !== undefined ? "container__top" : ""}
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
                    props.players.map((v, i) => (
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
                            onDoubleClick={() => {
                                SetCurrentPlayer(v);
                            }}
                        >
                            <p>{v.username}</p>
                            {v.id === props.currentTurn ? (
                                <img src={DiceIcon.replace("public/", "")} />
                            ) : (
                                <></>
                            )}
                            {v.getoutCards > 0 ? (
                                <p className="orange">{v.getoutCards}</p>
                            ) : (
                                <></>
                            )}
                            <p>{v.balance}</p>
                            <p>{v.properties.length}</p>
                        </div>
                    ))
                )}
            </div>

            {localPlayer !== undefined ? (
                <>
                    <div className="resizer" id="dragMe" style={{}} />

                    <div className="container__bottom" style={{}}>
                        {/* stats part! */}
                        <h3 style={{ textAlign: "center" }}>
                            {localPlayer.username}
                        </h3>
                        <style></style>

                        <table>
                            <tr>
                                <td>Balance</td>
                                <td>
                                    <p className="stats">
                                        {localPlayer.balance} <label>M</label>
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td>Houses</td>
                                <td>
                                    <p className="stats">
                                        {localPlayer.properties
                                            .map((v) => v.count)
                                            .filter(
                                                (v) => typeof v === "number"
                                            ).length > 0
                                            ? (
                                                  localPlayer.properties
                                                      .map((v) => v.count)
                                                      .filter(
                                                          (v) =>
                                                              typeof v ===
                                                              "number"
                                                      ) as Array<number>
                                              ).reduce(
                                                  (p: number, c: number) =>
                                                      p + c
                                              )
                                            : 0}
                                        <img
                                            src={HouseIcon.replace(
                                                "public/",
                                                ""
                                            )}
                                            alt=""
                                        />
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td>Hotles</td>
                                <td>
                                    <p className="stats">
                                        {localPlayer.properties.length > 0
                                            ? (
                                                  localPlayer.properties
                                                      .map((v) => v.count)
                                                      .filter(
                                                          (v) =>
                                                              typeof v ===
                                                              "string"
                                                      ) as Array<number>
                                              ).length
                                            : 0}
                                        <img
                                            src={HotelIcon.replace(
                                                "public/",
                                                ""
                                            )}
                                            alt=""
                                        />
                                    </p>
                                </td>
                            </tr>

                            <tr>
                                <td>Position</td>
                                <td>
                                    <p className="stats">
                                        {localPlayer.position} <label></label>
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
});

export default playersTab;
