import { useState } from "react";
import { User, botInitial, randomName } from "../../assets/types";
import BotsList from "./botsList";
export default function JoinScreen(props: {
    joinViaCode: () => void;
    joinBots: (x: Array<botInitial>) => void;
    fbUser: User | undefined;
    disabled: boolean;
    name: string;
    addr: string;
    SetAddress: React.Dispatch<React.SetStateAction<string>>;
    SetName: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [tabIndex, SetTab] = useState(0);
    const [botsList, SetBotList] = useState<Array<botInitial>>([
        {
            name: randomName(),
            diff: "Regular",
        },
    ]);
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
                    <div key={"bots-name"}>
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
                            <input type="text" id="name" disabled={true} value={props.fbUser.name} placeholder="enter name" />
                        )}
                    </div>
                    <p>bots settings:</p>
                    <BotsList
                        OnChange={(arr: botInitial[]) => {
                            SetBotList(arr);
                        }}
                    />

                    <center>
                        <button
                            onClick={() => {
                                props.joinBots(botsList);
                            }}
                            disabled={props.disabled}
                        >
                            start
                        </button>
                    </center>
                </>
            ) : (
                <>
                    <div key={"online-code"}>
                        <p>please enter your code:</p>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => props.SetAddress(e.currentTarget.value)}
                            defaultValue={props.addr}
                            placeholder="enter code"
                        />
                    </div>

                    <div key={"online-name"}>
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
                            <input type="text" id="name" disabled={true} value={props.name} placeholder="enter name" />
                        )}
                    </div>

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
