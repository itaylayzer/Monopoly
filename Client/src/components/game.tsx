import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import RollIcon from "../../public/roll.png";
import HouseIcon from "../../public/h.png";
import HotelIcon from "../../public/ho.png";
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
        onDone: () => void;
    }) => void;
    freeDice: () => void;
    setStreet: (args: {
        location: number;
        onResponse: (
            action:
                | "nothing"
                | "buy"
                | "someones"
                | "special_action"
                | "advance-buy",
            info: object
        ) => void;
    }) => void;
    chorch: (
        element: {
            title: string;
            action: string;
            tileid: string;
            groupid?: undefined;
            rentmultiplier?: undefined;
            amount?: undefined;
            subaction?: undefined;
            count?: undefined;
            buildings?: undefined;
            hotels?: undefined;
        },
        is_chance: boolean,
        time: number
    ) => void;
    applyAnimation: (type: number) => void;
    showJailsButtons: (is_card: boolean) => void;
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
        const [showStreet, ShowStreet] = useState<boolean>(false);
        const [advnacedStreet, SetAdvancedStreet] = useState<boolean>(false);
        const [rotation, SetRotation] = useState<number>(0);
        const [scale, SetScale] = useState<number>(1);

        const [streetDisplay, SetStreetDisplay] = useState<{}>({
            cardCost: -1,
            hotelsCost: -1,
            housesCost: -1,
            multpliedrent: [-1, -1, -1, -1, -1],
            rent: -1,
            rentWithColorSet: -1,
            title: "deafult",
            type: "electricity",
        } as UtilitiesDisplayInfo);

        const [streetType, SetStreetType] = useState<
            "Street" | "Utilities" | "Railroad" | "Chance" | "CommunityChest"
        >("Street");

        function diceAnimation(a: number, b: number) {
            const element = document.getElementById(
                "dice-panel"
            ) as HTMLDivElement;

            var bb = true;
            var t = -1;

            function randomCube() {
                var l = "./c";
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
                    requestAnimationFrame(anim);
                } else {
                    var l = "./c";
                    element.innerHTML = `
                <img src="${l}${a}.png" />
                <img src="${l}${b}.png" />
                `;
                }
            }
            setTimeout(() => {
                bb = false;
            }, 1000);

            requestAnimationFrame(anim);
        }
        function applyAnimation(type: number) {
            const element = document.querySelector("img#moneyAnimations");
            if (element === null) return;
            const imageElement = element as HTMLImageElement;
            imageElement.setAttribute("data-anim", "0");
            requestAnimationFrame(() => {
                imageElement.setAttribute("data-anim", type.toString());
                setTimeout(() => {
                    imageElement.setAttribute("data-anim", "0");
                }, 1000);
            });
        }
        useImperativeHandle(ref, () => ({
            diceResults: (args) => {
                diceAnimation(...args.l);
                SetShowDice(true);
                setTimeout(() => {
                    SetShowDice(false);
                    args.onDone();
                }, args.time);
            },
            freeDice: () => {
                const element = document.getElementById(
                    "dice-panel"
                ) as HTMLDivElement;
                element.innerHTML = "";
                SetSended(false);
            },
            setStreet: (args) => {
                // find data based on location
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
                    function searchForButtons(
                        advanced: boolean,
                        location: number
                    ) {
                        function func() {
                            if (advanced) {
                                const b = document.querySelector(
                                    "div#advanced-responses"
                                );

                                if (b) {
                                    const _property = propretyMap.get(location);
                                    if (!_property) return;
                                    const divB = b as HTMLDivElement;
                                    while (divB.firstChild) {
                                        divB.removeChild(divB.firstChild);
                                    }
                                    const propId = Array.from(
                                        new Map(
                                            localPlayer.properties.map(
                                                (v, i) => [i, v]
                                            )
                                        ).entries()
                                    ).filter(
                                        (v) => v[1].posistion === args.location
                                    )[0][0];

                                    function transformCount(
                                        v: 0 | 2 | 1 | 3 | 4 | "h"
                                    ) {
                                        switch (v) {
                                            case "h":
                                                return 5;

                                            default:
                                                return v;
                                        }
                                    }
                                    const count: number = transformCount(
                                        localPlayer.properties[propId].count
                                    );
                                    for (
                                        let index = count + 1;
                                        index < 6;
                                        index++
                                    ) {
                                        const myButton =
                                            document.createElement("button");
                                        if (index === 5) {
                                            myButton.innerHTML = `buy hotel`;
                                            // dont let someone buy hotel of not have a set of 4 houses
                                            myButton.disabled =
                                                index !== count + 1 ||
                                                (_property.ohousecost ?? 0) >
                                                    (prop.players.filter(
                                                        (v) =>
                                                            v.id ===
                                                            prop.socket.id
                                                    )[0].balance ?? 0);
                                            myButton.onclick = () => {
                                                args.onResponse("advance-buy", {
                                                    state: index,
                                                    money: 1,
                                                });
                                                ShowStreet(false);
                                            };
                                        } else {
                                            myButton.innerHTML = `buy ${index} house${
                                                index > 1 ? "s" : ""
                                            }`;
                                            myButton.onclick = () => {
                                                args.onResponse("advance-buy", {
                                                    state: index,
                                                    money: index - count,
                                                });
                                                ShowStreet(false);
                                            };
                                            myButton.disabled =
                                                (index - count) *
                                                    (_property.housecost ?? 0) >
                                                (prop.players.filter(
                                                    (v) =>
                                                        v.id === prop.socket.id
                                                )[0].balance ?? 0);
                                        }
                                        divB.appendChild(myButton);
                                    }
                                    // last button of cancel
                                    const continueButtons =
                                        document.createElement("button");
                                    continueButtons.innerHTML = "CONTINUE";
                                    continueButtons.onclick = () => {
                                        args.onResponse("nothing", {});
                                        ShowStreet(false);
                                    };
                                    divB.appendChild(continueButtons);
                                } else {
                                    requestAnimationFrame(func);
                                }
                            } else {
                                const b = document.querySelector(
                                    "button#card-response-yes"
                                );

                                if (b) {
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
                                } else {
                                    requestAnimationFrame(func);
                                }
                            }
                        }
                        return func;
                    }

                    var belong_to_me = false;
                    var count: 0 | 1 | 2 | 3 | 4 | "h" = 0;
                    for (const _prp of localPlayer.properties) {
                        if (!belong_to_me && _prp.posistion === args.location) {
                            belong_to_me = true;
                            count = _prp.count;
                        }
                    }
                    if (x.group === "Special") {
                        args.onResponse("nothing", {});
                        ShowStreet(false);
                    } else if (x.group === "Utilities") {
                        if (!belong_to_me) {
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
                            requestAnimationFrame(
                                searchForButtons(false, args.location)
                            );
                        } else {
                            args.onResponse("nothing", {});
                        }
                    } else if (x.group === "Railroad") {
                        if (!belong_to_me) {
                            SetStreetType("Railroad");
                            const streetInfo = {
                                cardCost: x.price ?? -1,
                                title: x.name ?? "error",
                            } as UtilitiesDisplayInfo;
                            SetStreetDisplay(streetInfo);
                            ShowStreet(true);
                            requestAnimationFrame(
                                searchForButtons(false, args.location)
                            );
                        } else {
                            args.onResponse("nothing", {});
                        }
                    } else {
                        if (
                            !belong_to_me &&
                            localPlayer.balance - (x?.price ?? 0) < 0
                        ) {
                            ShowStreet(false);
                            args.onResponse("nothing", {});
                            return;
                        }

                        if (belong_to_me) {
                        } else {
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
                        }
                        if (belong_to_me && count === "h") {
                            ShowStreet(false);
                            args.onResponse("nothing", {});
                            return;
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
                        requestAnimationFrame(
                            searchForButtons(belong_to_me, args.location)
                        );
                    }
                } else {
                    args.onResponse("nothing", {});
                    ShowStreet(false);
                }
            },
            chorch(element, is_chance, time) {
                SetStreetType(is_chance ? "Chance" : "CommunityChest");
                SetStreetDisplay({
                    title: element.title,
                } as ChanceDisplayInfo);
                ShowStreet(true);
                setTimeout(() => {
                    ShowStreet(false);
                }, time);
            },
            applyAnimation(type) {
                applyAnimation(type);
            },
            showJailsButtons: (is_card: boolean) => {
                const payElement = document.querySelector(
                    `button.roll-button[data-button-type="pay"]`
                ) as HTMLButtonElement;
                const cardElement = document.querySelector(
                    `button.roll-button[data-button-type="card"]`
                ) as HTMLButtonElement;
                const rollElement = document.querySelector(
                    `button.roll-button[data-button-type="roll"]`
                ) as HTMLButtonElement;

                function returnToNormal() {
                    payElement.onclick = () => {
                        prop.socket.emit("roll_dice");
                        SetSended(true);
                    };
                    SetSended(true);
                    cardElement.onclick = () => {};
                    cardElement.style.translate = "0px 0px";
                    cardElement.setAttribute("aria-disabled", "true");
                    setTimeout(() => {
                        cardElement.setAttribute("aria-disabled", "true");
                    }, 300);

                    payElement.style.translate = "0px 0px";
                    payElement.onclick = () => {};
                    payElement.setAttribute("aria-disabled", "true");
                    setTimeout(() => {
                        payElement.setAttribute("aria-disabled", "true");
                    }, 300);
                }

                payElement.setAttribute("aria-disabled", "false");
                payElement.style.translate = "0px -80px";
                payElement.onclick = () => {
                    // handle paying
                    applyAnimation(1);

                    prop.socket.emit("unjail", "pay");
                    prop.socket.emit("roll_dice");

                    returnToNormal();
                };

                if (is_card) {
                    const cardButton = cardElement as HTMLButtonElement;
                    cardButton.setAttribute("aria-disabled", "false");
                    cardButton.style.translate = "0px -160px";
                    cardButton.style.backgroundColor = "gold";
                    cardButton.onclick = () => {
                        // take 1 card
                        prop.socket.emit("unjail", "card");
                        prop.socket.emit("roll_dice");

                        returnToNormal();
                    };
                }
                rollElement.onclick = () => {
                    prop.socket.emit("roll_dice");

                    returnToNormal();
                    SetSended(true);
                };
            },
        }));

        useEffect(() => {
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

        useEffect(() => {
            var continue_to_animate = true;
            var animate = () => {
                for (const x of prop.players.filter((v) => v.balance >= 0)) {
                    const location = x.position;
                    const icon = x.icon + 1;
                    const injail = x.isInJail;

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
                        }
                        if (
                            !injail &&
                            elementSearch.querySelector("img.jailIcon") != null
                        ) {
                            const jailIcon = elementSearch.querySelector(
                                "img.jailIcon"
                            ) as HTMLImageElement;
                            elementSearch.removeChild(jailIcon);
                        }

                        if (
                            injail &&
                            elementSearch.querySelector("img.jailIcon") == null
                        ) {
                            while (elementSearch.firstChild) {
                                elementSearch.removeChild(
                                    elementSearch.firstChild
                                );
                            }

                            const image = document.createElement("img");
                            image.src = `./p${icon}.png`;
                            elementSearch.appendChild(image);

                            const jimage = document.createElement("img");
                            jimage.src = `./jail.png`;
                            jimage.className = "jailIcon";
                            elementSearch.appendChild(jimage);
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
                        element.style.rotate = `${rotation}deg`;
                        const image = document.createElement("img");
                        image.src = `./p${icon}.png`;
                        element.appendChild(image);
                        if (injail) {
                            const jimage = document.createElement("img");
                            jimage.src = `./jail.png`;
                            jimage.className = "jailIcon";
                            element.appendChild(jimage);
                        }

                        document
                            .querySelector(
                                `div.street[data-position="${location}"]`
                            )
                            ?.appendChild(element);
                    }
                }

                function propertiesDisplay() {
                    const folder = document.getElementById(
                        "display-houses"
                    ) as HTMLDivElement;
                    // remove all older proprerties!
                    const allStreets = Array.from(
                        folder.querySelectorAll("div.street-houses")
                    );
                    for (const _st of allStreets) {
                        const st = _st as HTMLDivElement;
                        while (st.firstChild) {
                            st.removeChild(st.firstChild);
                        }
                        st.onclick = () => {};
                        st.style.cursor = "unset";
                        st.style.backgroundColor = "rgba(0,0,0,0%)";
                        st.setAttribute("data-tooltip-hover", "");
                        st.style.zIndex = "unset";
                    }
                    for (const _player of prop.players) {
                        for (const _prp of _player.properties) {
                            const location = _prp.posistion;
                            const state = _prp.count;

                            const queryElement = folder.querySelector(
                                `div.street-houses[data-position="${location}"`
                            );
                            if (queryElement != null) {
                                // add new propertie
                                const st = queryElement as HTMLDivElement;
                                st.setAttribute(
                                    "data-tooltip-hover",
                                    _player.username
                                );

                                st.onclick = () => {
                                    const element = document.querySelector(
                                        `div.player[player-id="${_player.id}"]`
                                    ) as HTMLDivElement;
                                    element.style.animation =
                                        "spin2 1s cubic-bezier(.21, 1.57, .55, 1) infinite";
                                    setTimeout(() => {
                                        element.style.animation = "";
                                    }, 1 * 1000);
                                };

                                st.style.cursor = "pointer";

                                st.style.zIndex = "5";
                                switch (state) {
                                    case 0:
                                        st.style.backgroundColor =
                                            "rgba(0,0,0,25%)";
                                        break;

                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                        for (
                                            let index = 0;
                                            index < state;
                                            index++
                                        ) {
                                            const image =
                                                document.createElement("img");
                                            image.src = HouseIcon.replace(
                                                "public/",
                                                ""
                                            );
                                            st.appendChild(image);
                                        }
                                        break;
                                    case "h":
                                        const image =
                                            document.createElement("img");
                                        image.src = HotelIcon.replace(
                                            "public/",
                                            ""
                                        );
                                        st.appendChild(image);
                                        break;

                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
                propertiesDisplay();

                if (continue_to_animate) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);

            return () => {
                continue_to_animate = false;
            };
        }, [prop.players]);
        return (
            <>
                <div className="game">
                    <div id="dice-panel" data-show={showDice}></div>
                    <div
                        className="board"
                        style={{
                            transform: `translateX(-50%) translateY(-50%) rotate(${rotation}deg) scale(${scale})`,
                        }}
                        id="locations"
                    >
                        <div id="display-houses">
                            <div
                                data-position="39"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "83%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="37"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "66.5%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="35"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "50%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="34"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "41.75%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="32"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "25.5%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="31"
                                data-rotate="4"
                                className="street-houses"
                                style={{
                                    top: "17.25%",
                                    left: "93.5%",
                                }}
                            ></div>
                            <div
                                data-position="29"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "83%",
                                }}
                            ></div>
                            <div
                                data-position="28"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "74.75%",
                                }}
                            ></div>
                            <div
                                data-position="27"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "66.5%",
                                }}
                            ></div>
                            <div
                                data-position="26"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "58.25%",
                                }}
                            ></div>
                            <div
                                data-position="25"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "50%",
                                }}
                            ></div>
                            <div
                                data-position="24"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "41.75%",
                                }}
                            ></div>
                            <div
                                data-position="23"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "33.5%",
                                }}
                            ></div>
                            <div
                                data-position="21"
                                data-rotate="3"
                                className="street-houses"
                                style={{
                                    top: "6.5%",
                                    left: "17.25%",
                                }}
                            ></div>

                            <div
                                data-position="19"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "17.25%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="18"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "25.5%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="16"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "41.75%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="15"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "50%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="14"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "58.25%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="13"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "66.5%",
                                    left: "6.5%",
                                }}
                            ></div>
                            <div
                                data-position="12"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "74.75%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="11"
                                data-rotate="2"
                                className="street-houses"
                                style={{
                                    top: "83%",
                                    left: "6.5%",
                                }}
                            ></div>

                            <div
                                data-position="9"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "17.25%",
                                }}
                            ></div>

                            <div
                                data-position="8"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "25.5%",
                                }}
                            ></div>

                            <div
                                data-position="6"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "41.75%",
                                }}
                            ></div>
                            <div
                                data-position="5"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "50%",
                                }}
                            ></div>
                            <div
                                data-position="3"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "66.5%",
                                }}
                            ></div>
                            <div
                                data-position="1"
                                data-rotate="1"
                                className="street-houses"
                                style={{
                                    top: "93.5%",
                                    left: "83%",
                                }}
                            ></div>
                        </div>
                        <div id="display-streets">
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
                    </div>
                    <div className="roll-panel">
                        <button
                            className="roll-button"
                            data-button-type="card"
                            aria-disabled={true}
                            style={
                                prop.myTurn && !sended
                                    ? {}
                                    : { translate: "0px 250px" }
                            }
                        >
                            <p>CARD</p>
                        </button>
                        <button
                            className="roll-button"
                            data-button-type="pay"
                            aria-disabled={true}
                            style={
                                prop.myTurn && !sended
                                    ? {}
                                    : { translate: "0px 250px" }
                            }
                        >
                            <p>PAY</p>
                        </button>
                        <button
                            className="roll-button"
                            data-button-type="roll"
                            aria-disabled={false}
                            style={
                                prop.myTurn && !sended
                                    ? {}
                                    : { translate: "0px 250px" }
                            }
                            onClick={(e) => {
                                if (e.currentTarget.ariaDisabled === "true")
                                    return;
                                else {
                                    prop.socket.emit("roll_dice");
                                    SetSended(true);
                                }
                            }}
                        >
                            <img src={RollIcon.replace("public/", "")} />
                            <p>ROLL THE DICE</p>{" "}
                            <img src={RollIcon.replace("public/", "")} />
                        </button>
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
                                        chance={
                                            streetDisplay as ChanceDisplayInfo
                                        }
                                    />
                                ) : streetType === "CommunityChest" ? (
                                    <ChacneCard
                                        chance={
                                            streetDisplay as ChanceDisplayInfo
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                <h3>
                                    {advnacedStreet
                                        ? "would you like to buy this card?"
                                        : "you can buy houses and hotels"}
                                </h3>
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
                                        street={
                                            streetDisplay as StreetDisplayInfo
                                        }
                                    />
                                )}
                                <div>
                                    <center>
                                        {advnacedStreet ? (
                                            <div id="advanced-responses"></div>
                                        ) : (
                                            <>
                                                <button id="card-response-yes">
                                                    YES
                                                </button>
                                                <button id="card-response-no">
                                                    NO
                                                </button>
                                            </>
                                        )}
                                    </center>
                                </div>
                            </>
                        )}
                    </div>
                    <img data-anim="0" id="moneyAnimations" alt="" />
                </div>
            </>
        );
    }
);
export default MonopolyGame;
