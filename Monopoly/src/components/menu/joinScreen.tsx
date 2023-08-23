import { useState } from "react";
import { User } from "../../assets/types";
import Slider from "../slider";
export default function JoinScreen(props: {
    joinViaCode: () => void;
    joinBots: (counts: number, diff: number) => void;
    fbUser: User | undefined;
    disabled: boolean;
    name: string;
    addr: string;
    SetAddress: React.Dispatch<React.SetStateAction<string>>;
    SetName: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [tabIndex, SetTab] = useState(0);
    const [botsCount, SetBCounts] = useState(0);
    const [botsDiff, SetBDiff] = useState(0);

    return (
        <>
            <nav className="join">
                <button
                    data-tooltip-hover={"online"}
                    data-select={tabIndex === 0}
                    onClick={() => {
                        SetTab(0);
                    }}
                >
                    <img src="online.png" alt="" />
                </button>
                <button
                    data-tooltip-hover={"computer"}
                    data-select={tabIndex === 1}
                    onClick={() => {
                        SetTab(1);
                    }}
                >
                    <img src="bot.png" alt="" />
                </button>
            </nav>
            <br></br>

            {tabIndex === 1 ? (
                <>
                    <p>please enter bots count:</p>
                    <Slider
                        step={1}
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={(e) => {
                            SetBCounts(parseInt(e.currentTarget.value));
                        }}
                    />
                    <p>please enter bots difficulty:</p>
                    <Slider
                        step={1}
                        min={1}
                        max={10}
                        onChange={(e) => {
                            SetBDiff(parseInt(e.currentTarget.value));
                        }}
                        defaultValue={5}
                    />
                    <p>please enter name:</p>
                    {props.fbUser === undefined ? (
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => {
                                props.SetName(e.currentTarget.value);
                            }}
                            defaultValue={props.name}
                            placeholder="enter name"
                        />
                    ) : (
                        <input
                            type="text"
                            id="name"
                            disabled={true}
                            value={props.fbUser.name}
                            placeholder="enter name"
                        />
                    )}

                    <center>
                        <button
                            onClick={() => {
                                props.joinBots(botsCount, botsDiff);
                            }}
                            disabled={props.disabled}
                        >
                            join
                        </button>
                    </center>
                </>
            ) : (
                <>
                    <p>please enter your code:</p>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) =>
                            props.SetAddress(e.currentTarget.value)
                        }
                        defaultValue={props.addr}
                        placeholder="enter code"
                    />

                    <p>please enter your name:</p>
                    {props.fbUser === undefined ? (
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => {
                                props.SetName(e.currentTarget.value);
                            }}
                            defaultValue={props.name}
                            placeholder="enter name"
                        />
                    ) : (
                        <input
                            type="text"
                            id="name"
                            disabled={true}
                            value={props.name}
                            placeholder="enter name"
                        />
                    )}

                    <center>
                        <button
                            onClick={() => {
                                props.joinViaCode();
                            }}
                            disabled={props.disabled}
                        >
                            join
                        </button>
                    </center>
                </>
            )}
        </>
    );
}
