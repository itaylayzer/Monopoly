import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import RollIcon from "../../public/monopoly-icon/roll.png";
import { Player } from "../assets/player";
import { Socket } from "socket.io-client";
import StreetCard, { StreetDisplayInfo, UtilitiesDisplayInfo } from "./streetCard";
import monopolyJSON from "../assets/monopoly.json";
interface MonopolyGameProps {
    players: Array<Player>;
    myTurn: boolean;
    socket: Socket;
}
export interface MonopolyGameRef {
    diceResults: (args: {
        l: [number, number];
        time: number;
        onDone: (finish: () => void) => void;
    }) => void;
    setStreet: (args: {
        location: number;
        onResponse: (b: boolean) => void;
    }) => void;
}

// Create the component with forwardRef
const MonopolyGame = forwardRef<MonopolyGameRef, MonopolyGameProps>(
    (prop, ref) => {
        const propretyMap = new Map(
            monopolyJSON.properties.map((obj) => {
                return [(obj.posistion ?? 0) - 1, obj];
            })
        );

        const [showDice, SetShowDice] = useState<boolean>(false);
        const [sended, SetSended] = useState<boolean>();
        const [currentStreet, SetStreet] = useState<StreetDisplayInfo | UtilitiesDisplayInfo>();
        const [oldStreet, SetOldStreet] = useState<StreetDisplayInfo | UtilitiesDisplayInfo>({
            cardCost: -1,
            hotelsCost: -1,
            housesCost: -1,
            multpliedrent: [-1, -1, -1, -1, -1],
            rent: -1,
            rentWithColorSet: -1,
            title: "deafult",
        } as StreetDisplayInfo);

        useImperativeHandle(ref, () => ({
            diceResults: (args) => {
                const element = document.getElementById(
                    "dice-panel"
                ) as HTMLDivElement;
                element.innerHTML = `
        <p>[ ${args.l[0]} | ${args.l[1]} ]</p>`;
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

                const x = propretyMap.get(args.location);
                if (x && args.location !== -1)  {

                    if (x.group === "Special"){
                        args.onResponse(false);
                        SetStreet(undefined);
                    }
                else if (x.group === "Utilities"){

                }
                    else 
                    {
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
                            group: x.group
                        } as StreetDisplayInfo;
                        SetStreet(streetInfo);
                        SetOldStreet(streetInfo);
                    }
                    
                } else {
                    alert(
                        "error of loading the street has occoured, please continue the game!"
                    );
                    args.onResponse(false);
                    SetStreet(undefined);
                }

                // trigger yes and no functining!
                (
                    document.querySelector(
                        "button#card-response-yes"
                    ) as HTMLButtonElement
                ).onclick = () => {
                    args.onResponse(true);
                    SetStreet(undefined);
                };
                (
                    document.querySelector(
                        "button#card-response-no"
                    ) as HTMLButtonElement
                ).onclick = () => {
                    args.onResponse(false);
                    SetStreet(undefined);
                };
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
        }, []);

        return (
            <>
                {JSON.stringify(Array.from(new Map(Array.from(propretyMap.values()).map(v=>[v.group,1])).keys()))};
                <div id="dice-panel" data-show={showDice}>
                    <img src={RollIcon} />
                    <p>ITS YOUR TURN TO ROLL THE DICE</p> <img src={RollIcon} />
                </div>
                <div className="board" id="locations">
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
                    style={
                        currentStreet === undefined
                            ? {
                                  transform:
                                      "translateY(-50%) translateX(-500%)",
                              }
                            : {}
                    }
                    className="card-display-actions"
                >
                    <h3>would you like to buy this card?</h3>
                    <StreetCard
                        args ={oldStreet}
                    />
                    <div>
                        <center>
                            <button id="card-response-yes">YES</button>
                            <button id="card-response-no">NO</button>
                        </center>
                    </div>
                </div>
            </>
        );
    }
);
export default MonopolyGame;
