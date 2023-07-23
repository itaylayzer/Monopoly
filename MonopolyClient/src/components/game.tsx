import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import RollIcon from "../../public/monopoly-icon/roll.png";
import C1Icon from "../../public/cubes/c1.png";
import { Player } from "../assets/player";
import { Socket } from "socket.io-client";
import StreetCard, {
    StreetDisplayInfo,
    UtilitiesDisplayInfo,
    RailroadDisplayInfo,
} from "./streetCard";
import monopolyJSON from "../assets/monopoly.json";
import ChacneCard, { ChanceDisplayInfo } from "./specialCards";
interface MonopolyGameProps {
    players: Array<Player>;
    myTurn: boolean;
    socket: Socket;
    clickedOnBoard: (a: number) => void;
}
export interface MonopolyGameRef {
    diceResults: (args: {
        l: [number, number];
        time: number;
        onDone: (finish: () => void) => void;
    }) => void;
    setStreet: (args: {
        location: number;
        onResponse: (
            action: "nothing" | "buy" | "someones" | "special_action",
            info: object
        ) => void;
    }) => void;
}

export interface g_SpecialAction {}
export type g_Buy = 0 | 1 | 2 | 3 | 4 | "h";

// Create the component with forwardRef
const MonopolyGame = forwardRef<MonopolyGameRef, MonopolyGameProps>(
    (prop, ref) => {
        const propretyMap = new Map(
            monopolyJSON.properties.map((obj) => {
                return [obj.posistion ?? 0, obj];
            })
        );

        const [showDice, SetShowDice] = useState<boolean>(false);
        const [sended, SetSended] = useState<boolean>(false);
        const [showStreet, ShowStreet] = useState<boolean>(true);
        const [advnacedStreet, SetAdvancedStreet] = useState<boolean>(false);
        const [rotation, SetRotation] = useState<number>(0);
        const [scale, SetScale] = useState<number>(1);

        /*
        const [streetDisplay, SetStreetDisplay] = useState<{}>({
            cardCost: -1,
            hotelsCost: -1,
            housesCost: -1,
            multpliedrent: [-1, -1, -1, -1, -1],
            rent: -1,
            rentWithColorSet: -1,
            title: "deafult",
            type: "electricity",
        } as UtilitiesDisplayInfo);*/

        const [streetDisplay, SetStreetDisplay] = useState<{}>({
            title: "deafult",
            action: "pay",
        } as ChanceDisplayInfo);

        const [streetType, SetStreetType] = useState<
            "Street" | "Utilities" | "Railroad" | "Chance" | "CommunityChest"
        >("CommunityChest");

        function diceAnimation(a: number, b: number) {
            const element = document.getElementById(
                "dice-panel"
            ) as HTMLDivElement;

            var bb = true;
            var t = -1;

            function randomCube() {
                var l = C1Icon.substring(0, C1Icon.length - 5);
                const numA = Math.floor(Math.random() * 6) + 1;
                const numB = Math.floor(Math.random() * 6) + 1;
                element.innerHTML = `
                <img src="${l}${numA}.png" />
                <img src="${l}${numB}.png" />
                
                `;
            }
            function anim() {
                if (bb) {
                    randomCube();
                    t += 1;
                    setTimeout(anim, 2 ** t * 10);
                } else {
                    var l = C1Icon.substring(0, C1Icon.length - 5);
                    element.innerHTML = `
                <img src="${l}${a}.png" />
                <img src="${l}${b}.png" />
                `;
                }
            }
            setTimeout(() => {
                bb = false;
            }, 1000);

            setTimeout(anim, 1.3 ** t * 100);
        }
        useImperativeHandle(ref, () => ({
            diceResults: (args) => {
                const element = document.getElementById(
                    "dice-panel"
                ) as HTMLDivElement;
                diceAnimation(...args.l);
                SetShowDice(true);
                setTimeout(() => {
                    SetShowDice(false);
                    args.onDone(() => {
                        element.innerHTML = "";
                        SetSended(false);
                    });
                }, args.time);
            },
            setStreet: (args) => {
                // find data based on location
                // TODO: Check if the players already owns the proprety, and what can he buy more for the place.
                // TODO: Special cards like chance and comunity chest.
                const localPlayer = prop.players.filter(
                    (v) => v.id === prop.socket.id
                )[0];
                const x = propretyMap.get(args.location);

                if (
                    x &&
                    args.location !== -1 &&
                    args.location < 40 &&
                    args.location >= 0
                ) {
                    if (x.group === "Special") {
                        if (x.id === "communitychest" || x.id === "chance") {
                            const arr =
                                x.id === "communitychest"
                                    ? monopolyJSON.communitychest
                                    : monopolyJSON.chance;
                            const randomElement =
                                arr[Math.floor(Math.random() * arr.length)];
                            alert(JSON.stringify(randomElement));

                            SetStreetType(
                                x.id === "chance" ? "Chance" : "CommunityChest"
                            );
                            SetStreetDisplay({
                                title: randomElement.title,
                                action:
                                    randomElement.action +
                                    (randomElement.amount?.toString() ?? ""),
                            } as ChanceDisplayInfo);
                            ShowStreet(true);
                            setTimeout(() => {
                                args.onResponse("nothing", {});
                                ShowStreet(false);
                            }, 3000);
                        }
                    } else if (x.group === "Utilities") {
                        SetStreetType("Utilities");
                        const streetInfo = {
                            cardCost: x.price ?? -1,
                            title: x.name ?? "error",
                            type: x.id.includes("water")
                                ? "water"
                                : "electricity",
                        } as UtilitiesDisplayInfo;
                        SetStreetDisplay(streetInfo);
                        SetAdvancedStreet(false);
                        ShowStreet(true);
                    } else if (x.group === "Railroad") {
                        SetStreetType("Railroad");
                        const streetInfo = {
                            cardCost: x.price ?? -1,
                            title: x.name ?? "error",
                        } as UtilitiesDisplayInfo;
                        SetStreetDisplay(streetInfo);
                        ShowStreet(true);
                    } else {
                        if (localPlayer.balance - (x?.price ?? 0) < 0) {
                            ShowStreet(false);
                            args.onResponse("nothing", {});
                            return;
                        }

                        var belong_to_others = false;
                        for (const _p of prop.players) {
                            for (const _prp of _p.properties) {
                                if (_prp.posistion === args.location)
                                    belong_to_others = true;
                            }
                        }

                        if (belong_to_others) {
                            args.onResponse("someones", {});
                            ShowStreet(false);
                            return;
                        }
                        var belong_to_me = false;
                        for (const _prp of localPlayer.properties) {
                            if (_prp.posistion === args.location)
                                belong_to_me = true;
                        }

                        SetStreetType("Street");
                        const streetInfo = {
                            cardCost: x.price ?? -1,
                            hotelsCost: x.ohousecost ?? -1,
                            housesCost: x.housecost ?? -1,
                            rent: x.rent ?? -1,
                            multpliedrent: x.multpliedrent
                                ? [
                                      x.multpliedrent[0] ?? -1,
                                      x.multpliedrent[1] ?? -1,
                                      x.multpliedrent[2] ?? -1,
                                      x.multpliedrent[3] ?? -1,
                                      x.multpliedrent[4] ?? -1,
                                  ]
                                : [-1, -1, -1, -1, -1],
                            rentWithColorSet: x.rent ? x.rent * 2 : -1,
                            title: x.name ?? "error",
                            group: x.group,
                        } as StreetDisplayInfo;
                        SetStreetDisplay(streetInfo);
                        belong_to_me
                            ? SetAdvancedStreet(true)
                            : SetAdvancedStreet(false);
                        ShowStreet(true);
                    }
                } else {
                    alert(
                        "error of loading the street has occoured, please continue the game!"
                    );
                    args.onResponse("nothing", {});
                    ShowStreet(false);
                }

                // trigger yes and no functining!
                function searchForButtons(){
                    const b = (
                        document.querySelector(
                            "button#card-response-yes"
                        )
                    )
                    if (b){
                        (b as HTMLButtonElement).onclick = () => {
                            args.onResponse("buy", {});
                            ShowStreet(false);
                        };
                        (
                            document.querySelector(
                                "button#card-response-no"
                            ) as HTMLButtonElement
                        ).onclick = () => {
                            args.onResponse("nothing", {});
                            ShowStreet(false);
                        };
                    }
                    else {
                        requestAnimationFrame(searchForButtons);
                    }
                }
                requestAnimationFrame(searchForButtons);
            },
        }));

        useEffect(() => {
            function animate() {
                for (const x of prop.players) {
                    const location = x.position;
                    const icon = x.icon + 1;

                    const elementSearch = document.querySelector(
                        `div.player[player-id="${x.id}"]`
                    );
                    if (elementSearch !== null) {
                        // check if loaction is the same
                        const pos = elementSearch.parentElement?.getAttribute(
                            "data-position"
                        ) as string;
                        if (parseInt(pos) !== x.position) {
                            elementSearch.parentElement?.removeChild(
                                elementSearch
                            );
                            document
                                .querySelector(
                                    `div.street[data-position="${location}"]`
                                )
                                ?.appendChild(elementSearch);
                        } else {
                            // do nothing
                            continue;
                        }
                    } else {
                        // Create
                        const element = document.createElement("div");
                        element.className = "player";
                        element.setAttribute("player-id", x.id);
                        element.setAttribute(
                            "player-position",
                            x.position.toString()
                        );
                        element.setAttribute("data-tooltip-hover", x.username);
                        const image = document.createElement("img");
                        image.src = `/public/players/p${icon}.png`;

                        element.appendChild(image);
                        document
                            .querySelector(
                                `div.street[data-position="${location}"]`
                            )
                            ?.appendChild(element);
                    }
                }
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);

            // Rotation and Scale with mouse
            (document.getElementById("locations") as HTMLDivElement).onwheel = (
                e
            ) => {
                if (e.shiftKey) {
                    SetScale((old) => old + e.deltaY / 1000);
                } else {
                    SetRotation((old) => old + (e.deltaY * 22.5) / 100);
                }
            };
            // Clicking Street
            const safe = Array.from(propretyMap.values()).filter(
                (v) => v.group != "Special"
            );
            for (const x of safe) {
                const element = (
                    document.getElementById("locations") as HTMLDivElement
                ).querySelector(
                    `div.street[data-position="${x.posistion}"]`
                ) as HTMLDivElement;

                element.onclick = () => {
                    prop.clickedOnBoard(x.posistion);
                };

                element.onmousemove = () => {
                    element.style.cursor = "pointer";
                    element.style.backgroundColor = "rgba(0,0,0,15%)";
                };
                element.onmouseleave = () => {
                    element.style.cursor = "unset";
                    element.style.scale = "1";
                    element.style.backgroundColor = "rgba(0,0,0,0%)";
                };
            }
        }, []);

        return (
            <>
                {rotation};
                <div id="dice-panel" data-show={showDice}>
                    <img src={RollIcon} />
                    <p>ITS YOUR TURN TO ROLL THE DICE</p> <img src={RollIcon} />
                </div>
                <div
                    className="board"
                    style={{
                        transform: `translateX(-50%) translateY(-50%) rotate(${rotation}deg) scale(${scale})`,
                    }}
                    id="locations"
                >
                    <div
                        data-position="39"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "83%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="38"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "74.25%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="37"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "66.5%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="36"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "58.25%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="35"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "50%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="34"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "41.75%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="33"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "33.5%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="32"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "25.5%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="31"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "17.25%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="30"
                        className="street"
                        style={{
                            width: 120,
                            height: 120,
                            top: "6.5%",
                            left: "93.5%",
                        }}
                    ></div>
                    <div
                        data-position="29"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "83%",
                        }}
                    ></div>
                    <div
                        data-position="28"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "74.75%",
                        }}
                    ></div>
                    <div
                        data-position="27"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "66.5%",
                        }}
                    ></div>
                    <div
                        data-position="26"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "58.25%",
                        }}
                    ></div>
                    <div
                        data-position="25"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "50%",
                        }}
                    ></div>
                    <div
                        data-position="24"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "41.75%",
                        }}
                    ></div>
                    <div
                        data-position="23"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "33.5%",
                        }}
                    ></div>
                    <div
                        data-position="22"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "25.5%",
                        }}
                    ></div>
                    <div
                        data-position="21"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "6.5%",
                            left: "17.25%",
                        }}
                    ></div>

                    <div
                        data-position="20"
                        className="street"
                        style={{
                            width: 120,
                            height: 120,
                            top: "6.5%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="19"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "17.25%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="18"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "25.5%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="17"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "33.5%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="16"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "41.75%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="15"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "50%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="14"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "58.25%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="13"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "66.5%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="12"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "74.75%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="11"
                        className="street"
                        style={{
                            width: 120,
                            height: 75,
                            top: "83%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        className="street"
                        data-position="10"
                        style={{
                            width: 120,
                            height: 120,
                            top: "93.5%",
                            left: "6.5%",
                        }}
                    ></div>

                    <div
                        data-position="9"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "17.25%",
                        }}
                    ></div>

                    <div
                        data-position="8"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "25.5%",
                        }}
                    ></div>

                    <div
                        data-position="7"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "33.5%",
                        }}
                    ></div>
                    <div
                        data-position="6"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "41.75%",
                        }}
                    ></div>
                    <div
                        data-position="5"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "50%",
                        }}
                    ></div>
                    <div
                        data-position="4"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "58.25%",
                        }}
                    ></div>
                    <div
                        data-position="3"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "66.5%",
                        }}
                    ></div>
                    <div
                        data-position="2"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "74.75%",
                        }}
                    ></div>
                    <div
                        data-position="1"
                        className="street"
                        style={{
                            width: 75,
                            height: 120,
                            top: "93.5%",
                            left: "83%",
                        }}
                    ></div>

                    <div
                        data-position="0"
                        className="street"
                        style={{
                            width: 120,
                            height: 120,
                            top: "93.5%",
                            left: "93.5%",
                        }}
                    ></div>
                </div>
                <div
                    className="roll-panel"
                    aria-disabled={false}
                    style={prop.myTurn && !sended ? {} : { bottom: "-15%" }}
                    onClick={async (e) => {
                        if (e.currentTarget.ariaDisabled === "true") return;
                        else {
                            prop.socket.emit("roll_dice");
                            SetSended(true);
                        }
                    }}
                >
                    <img src={RollIcon} />
                    <p>ITS YOUR TURN TO ROLL THE DICE</p> <img src={RollIcon} />
                </div>
                <div
                    className={
                        streetType === "Chance" ||
                        streetType === "CommunityChest"
                            ? "chance-display-actions"
                            : "card-display-actions"
                    }
                    style={
                        !showStreet
                            ? {
                                  transform:
                                      "translateY(-50%) translateX(-500%)",
                              }
                            : {}
                    }
                >
                    {streetType === "Chance" ||
                    streetType === "CommunityChest" ? (
                        <>
                            {streetType === "Chance" ? (
                                <ChacneCard
                                    chance={streetDisplay as ChanceDisplayInfo}
                                />
                            ) : streetType === "CommunityChest" ? (
                                <ChacneCard
                                    chance={streetDisplay as ChanceDisplayInfo}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            <h3>would you like to buy this card?</h3>
                            {streetType === "Railroad" ? (
                                <StreetCard
                                    railroad={
                                        streetDisplay as RailroadDisplayInfo
                                    }
                                />
                            ) : streetType === "Utilities" ? (
                                <StreetCard
                                    utility={
                                        streetDisplay as UtilitiesDisplayInfo
                                    }
                                />
                            ) : (
                                <StreetCard
                                    street={streetDisplay as StreetDisplayInfo}
                                />
                            )}
                            <div>
                                <center>
                                    <button id="card-response-yes">YES</button>
                                    <button id="card-response-no">NO</button>
                                </center>
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    }
);
export default MonopolyGame;
