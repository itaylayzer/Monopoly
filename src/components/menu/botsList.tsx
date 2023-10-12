import { useEffect, useState } from "react";
import Switcher from "../utils/switcher";
import "./botList.css";
import { botInitial, randomName } from "../../assets/types";

export default function BotsList(props: { OnChange: (array: botInitial[]) => void }) {
    const options = ["Randomized"]; //["Recruit", "Regular", "Hardened", "Veteran"];
    const [arr, SetArr] = useState<botInitial[]>([
        {
            name: randomName(),
            diff: "Randomized",
        },
    ]);
    useEffect(() => {
        props.OnChange(arr);
    }, [arr]);
    return (
        <>
            {arr.map((v, vi) => (
                <div className="bot-list-element" key={vi}>
                    <p>{v.name}</p>
                    <Switcher
                        options={options}
                        Value={options.indexOf(v.diff)}
                        deafultIndex={options.indexOf(v.diff)}
                        // @ts-ignore
                        onChange={(e, i) => {
                            const b = JSON.parse(JSON.stringify(arr)) as botInitial[];
                            b[vi].diff = options[i];

                            SetArr(b);
                        }}
                    />
                    <img
                        src="trash.png"
                        alt=""
                        onClick={() => {
                            const b = JSON.parse(JSON.stringify(arr)) as botInitial[];
                            b.splice(vi, 1);

                            SetArr(b);
                        }}
                    />
                </div>
            ))}
            {arr.length !== 5 ? (
                <div
                    className="bot-list-add"
                    onClick={() => {
                        if (arr.length <= 4) {
                            SetArr((old) => [
                                ...old,
                                {
                                    name: randomName(),
                                    diff: "Randomized",
                                },
                            ]);
                        }
                    }}
                >
                    <p>add bot</p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
