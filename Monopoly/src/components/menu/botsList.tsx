import { useEffect, useState } from "react";
import Switcher from "../utils/switcher";
import "./botList.css";
export default function BotsList(props: {
    OnChange: (array: string[]) => void;
}) {
    const options = ["Recruit", "Regular", "Hardened", "Veteran"];
    const [arr, SetArr] = useState<number[]>([1]);
    useEffect(() => {
        props.OnChange(arr.map((v) => options[v]));
    }, [arr]);
    return (
        <>
            {arr.map((v, vi) => (
                <div className="bot-list-element" key={vi}>
                    <p>Bot</p>
                    <Switcher
                        options={options}
                        Value={v}
                        deafultIndex={v}
                        onChange={(e, i) => {
                            const b = JSON.parse(
                                JSON.stringify(arr)
                            ) as number[];
                            b[vi] = i;

                            SetArr(b);
                        }}
                    />
                    <img src="trash.png" alt="" onClick={()=>{
                        const b = JSON.parse(
                            JSON.stringify(arr)
                        ) as number[];
                        b.splice(vi,1)

                        SetArr(b);
                    }} />
                </div>
            ))}
            { arr.length !== 5 ? 
                <div
                className="bot-list-add"
                onClick={() => {
                    if (arr.length <= 4) {
                        SetArr((old) => [...old, 1]);
                    }
                }}
            >
                <p>add bot</p>
            </div> 
            : <></>
            }
        </>
    );
}
