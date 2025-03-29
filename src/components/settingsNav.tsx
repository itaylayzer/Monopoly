import Slider from "./utils/slider";
import {
    MonopolySettings,
    MonopolyCookie,
    EngineSettings,
} from "../assets/types";
import { useState, useEffect } from "react";
import { CookieManager } from "../assets/cookieManager";
export default function settingsNav() {
    const cookie = JSON.parse(decodeURIComponent(CookieManager.get("monopolySettings") as string)) as MonopolyCookie;
    const l: {
        gameEngine: [
            EngineSettings,
            React.Dispatch<React.SetStateAction<EngineSettings>>
        ];
        numbers: [number, React.Dispatch<React.SetStateAction<number>>][];
        booleans: [boolean, React.Dispatch<React.SetStateAction<boolean>>][];
    } = {
        gameEngine: useState<EngineSettings>("2d"),
        numbers: [
            useState<number>(
                cookie.settings ? cookie.settings.accessibility[0] : 45
            ),
            useState<number>(
                cookie.settings ? cookie.settings.accessibility[1] : 5
            ),
            useState<number>(cookie.settings ? cookie.settings.audio[0] : 100),
            useState<number>(cookie.settings ? cookie.settings.audio[1] : 100),
            useState<number>(cookie.settings ? cookie.settings.audio[2] : 25),
        ],
        booleans: [
            useState<boolean>(
                cookie.settings ? cookie.settings.accessibility[2] : false
            ),
            useState<boolean>(
                cookie.settings ? cookie.settings.accessibility[3] : false
            ),
            useState<boolean>(
                cookie.settings ? cookie.settings.accessibility[4] : false
            ),
            useState<boolean>(
                cookie.settings ? cookie.settings.notifications : false
            ),
        ],
    };

    useEffect(() => {
        const cookie = JSON.parse(decodeURIComponent(CookieManager.get("monopolySettings") as string)) as MonopolyCookie;
        const settings = {
            gameEngine: l.gameEngine[0],
            accessibility: [
                l.numbers[0][0],
                l.numbers[1][0],
                l.booleans[0][0],
                l.booleans[1][0],
                l.booleans[2][0],
            ],
            audio: [l.numbers[2][0], l.numbers[3][0], l.numbers[4][0]],
            notifications: l.booleans[3][0],
        } as MonopolySettings;

        CookieManager.set("monopolySettings",encodeURIComponent( JSON.stringify({
            login: cookie.login,
            settings: settings,
        } as MonopolyCookie)))
    }, [
        l.gameEngine[0],
        ...l.numbers.map((v) => v[0]),
        ,
        ...l.booleans.map((v) => v[0]),
    ]);
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Settings</h3>
            <div className="scroll">
                <div className="settingsItem">
                    <p>Game Engine </p>
                    <div>
                        <select name="" id="">
                            <option>2D</option>
                            <option>3D</option>
                        </select>
                    </div>
                </div>
                <p
                    style={{
                        marginBlock: 0,
                        marginInline: 10,
                        fontSize: 12,
                        opacity: 0.5,
                    }}
                >
                    3d isnt developed yet{" "}
                </p>
                <br />
                <hr />
                <h2>Accessibility</h2>
                <div>
                    <div className="settingsItem">
                        <p>Rotation Speed </p>

                        <Slider
                            step={90 / 8}
                            min={0}
                            max={180}
                            defaultValue={l.numbers[0][0]}
                            onChange={(e) => {
                                l.numbers[0][1](
                                    parseFloat(e.currentTarget.value)
                                );
                            }}
                            fixedNum={2}
                            suffix=" deg"
                        />
                    </div>
                    <div className="settingsItem">
                        <p>Scale Speed </p>
                        <Slider
                            step={1}
                            min={1}
                            max={10}
                            defaultValue={l.numbers[1][0]}
                            onChange={(e) => {
                                l.numbers[1][1](
                                    parseFloat(e.currentTarget.value)
                                );
                            }}
                            fixedNum={0}
                        />
                    </div>
                    <div className="settingsItem">
                        <p>Show Users Id </p>
                        <div>
                            <input
                                defaultChecked={l.booleans[0][0]}
                                type="checkbox"
                                onChange={(e) => {
                                    l.booleans[0][1](e.currentTarget.checked);
                                }}
                            />
                        </div>
                    </div>
                    <div className="settingsItem">
                        <p>Show Users Mouse </p>
                        <div>
                            <input
                                defaultChecked={l.booleans[1][0]}
                                type="checkbox"
                                onChange={(e) => {
                                    l.booleans[1][1](e.currentTarget.checked);
                                }}
                            />
                        </div>
                    </div>
                    <div className="settingsItem">
                        <p>Add Colors to Users </p>
                        <div>
                            <input
                                defaultChecked={l.booleans[2][0]}
                                type="checkbox"
                                onChange={(e) => {
                                    l.booleans[2][1](e.currentTarget.checked);
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <hr />
                </div>
                <h2>Audio</h2>
                <div>
                    <div className="settingsItem">
                        <p>Master Audio </p>
                        <Slider
                            step={1}
                            min={0}
                            max={100}
                            defaultValue={l.numbers[2][0]}
                            fixedNum={0}
                            suffix="%"
                            onChange={(e) => {
                                l.numbers[2][1](
                                    parseFloat(e.currentTarget.value)
                                );
                            }}
                        />
                    </div>
                    <div className="settingsItem">
                        <p>SFX Audio </p>
                        <Slider
                            step={1}
                            min={0}
                            max={100}
                            defaultValue={l.numbers[3][0]}
                            fixedNum={0}
                            suffix="%"
                            onChange={(e) => {
                                l.numbers[3][1](
                                    parseFloat(e.currentTarget.value)
                                );
                            }}
                        />
                    </div>
                    <div className="settingsItem">
                        <p>Music Audio </p>
                        <Slider
                            step={1}
                            min={0}
                            max={100}
                            defaultValue={l.numbers[4][0]}
                            fixedNum={0}
                            suffix="%"
                            onChange={(e) => {
                                l.numbers[4][1](
                                    parseFloat(e.currentTarget.value)
                                );
                            }}
                        />
                    </div>
                    <br />
                    <hr />
                </div>
                <h2>Notifications</h2>
                <div>
                    <div className="settingsItem">
                        <p>Notify Balance Movements </p>
                        <div>
                            <input
                                defaultChecked={l.booleans[3][0]}
                                type="checkbox"
                                onChange={(e) => {
                                    l.booleans[3][1](e.currentTarget.checked);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
