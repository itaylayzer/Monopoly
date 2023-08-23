import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import HouseIcon from "../../../public/h.png";
import HotelIcon from "../../../public/ho.png";
import { translateGroup } from "./streetCard.tsx";
import CardViewer from "./cardViewer.tsx";
import monopolyJSON from "../../assets/monopoly.json";
import { Socket } from "../../assets/websockets.ts";
import { Player } from "../../assets/player.ts";
interface PropretyTabProps {
    socket: Socket;
    players: Array<Player>;
}
export interface PropretyTabRef {
    clickedOnBoard: (a: number) => void;
}

const propretyTab = forwardRef<PropretyTabRef, PropretyTabProps>(
    (props, ref) => {
        const propretyMap = new Map(
            monopolyJSON.properties.map((obj) => {
                return [obj.posistion ?? 0, obj];
            })
        );

        const localPlayer = props.players.filter(
            (v) => v.id === props.socket.id
        )[0];
        if (localPlayer === undefined) return <>Could not read local player!</>;
        useImperativeHandle(ref, () => ({
            clickedOnBoard(a) {
                SetLookCard(-1);
                SetSearch("");
                SetSearchList([]);
                SetCardPos(a);
            },
        }));

        const [currentCardPosition, SetCardPos] = useState<number>(-1);
        const [searchString, SetSearch] = useState<string>("");

        const [searchList, SetSearchList] = useState<Array<number>>([]);
        const [currentLookCard, SetLookCard] = useState<number>(-1);
        function searchResults() {
            SetLookCard(-1);
            SetCardPos(-1);
            const safe = Array.from(propretyMap.values()).filter(
                (v) => v.group != "Special"
            );
            const lyricalSearch: Array<[string, number]> = safe.map((v) => [
                v.name,
                v.posistion,
            ]);
            const numricalSearch: Array<string> = safe.map((v) =>
                v.posistion.toString()
            );

            const s: Array<number> = [];

            for (const x of numricalSearch) {
                if (x.includes(searchString)) {
                    s.push(parseInt(x));
                }
            }

            for (const y of lyricalSearch) {
                if (y[0].toLowerCase().includes(searchString.toLowerCase())) {
                    s.push(y[1]);
                }
            }
            SetSearchList(s);
        }
        useEffect(searchResults, [searchString]);
        return (
            <>
                <h3 style={{ textAlign: "center" }}>Propreties</h3>
                <input
                    type="text"
                    onChange={(e) => SetSearch(e.currentTarget.value)}
                    placeholder="Search for global cards..."
                />

                <div
                    className="propertyList"
                    style={{
                        overflowY: "auto",
                        position: "relative",
                        flexGrow: 1,
                        cursor: "pointer",
                    }}
                >
                    {searchString.length > 0 ? (
                        searchList.map((v, i) => (
                            <>
                                {currentLookCard === v ? (
                                    <center>
                                        <CardViewer
                                            key={i}
                                            style={{
                                                cursor: "pointer",
                                                marginBottom: 25,
                                                marginTop: 10,
                                            }}
                                            posistion={v}
                                            OnClick={() => {
                                                SetLookCard(-1);
                                            }}
                                        />
                                    </center>
                                ) : (
                                    <div
                                        key={i}
                                        onClick={() => SetLookCard(v)}
                                        className="proprety-nav"
                                    >
                                        <i
                                            className="box"
                                            style={{
                                                backgroundColor: translateGroup(
                                                    propretyMap.get(v)?.group ??
                                                        ""
                                                ),
                                            }}
                                        ></i>
                                        <h3>
                                            {propretyMap.get(v)?.name ?? ""}
                                        </h3>
                                    </div>
                                )}
                            </>
                        ))
                    ) : currentCardPosition === -1 ? (
                        localPlayer.properties.map((v, i) => (
                            <div
                                key={i}
                                onClick={() => SetCardPos(v.posistion)}
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
                                    {propretyMap.get(v.posistion)?.name ?? ""}
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
                    ) : (
                        <div>
                            <center
                                style={{
                                    transform:
                                        "scale(1) translateY(-50%) translateX(-50%)",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                }}
                            >
                                <CardViewer
                                    style={{
                                        transform: "scale(1.2)",
                                        filter: "drop-shadow(5px 5px 0px rgba(255,255,255,20%))",
                                    }}
                                    posistion={currentCardPosition}
                                    OnClick={() => {
                                        SetCardPos(-1);
                                    }}
                                />
                            </center>
                        </div>
                    )}
                </div>
            </>
        );
    }
);
export default propretyTab;
