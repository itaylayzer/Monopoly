import { useState } from "react";
import "./switcher.css"
export default function Switcher(prop: {
    options: string[];
    deafultIndex?: number;
    onChange?: (element: string, index: number) => void;
    Value?:number
}) {
    const [currentIndex, SetIndex] = useState<number>(prop.deafultIndex ?? 0);
    return (
        <div className="switcher-component">
            <button className="switcher-component"
                onClick={() => {
                    var newValue = currentIndex - 1;
                    if (newValue < 0) newValue += prop.options.length;
                    prop.onChange?.(prop.options[newValue], newValue);
                    SetIndex(newValue);
                }}
            >
                {"<"}
            </button>
            <p className="switcher-component">{prop.options[prop.Value ?? currentIndex]}</p>
            <button className="switcher-component"
                onClick={() => {
                    var newValue = currentIndex + 1;
                    if (newValue >= prop.options.length)
                        newValue -= prop.options.length;
                    prop.onChange?.(prop.options[newValue], newValue);
                    SetIndex(newValue);
                }}
            >
                {">"}
            </button>
        </div>
    );
}
