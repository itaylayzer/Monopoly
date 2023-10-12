import { useState } from "react";
import "./slider.css";
export default function slider(prop: {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suffix?: string;
    step?: number;
    max?: number;
    min?: number;
    defaultValue?: number;
    fixedNum?: number;
}) {
    const [v, SetV] = useState<number>(prop.defaultValue ?? 0);
    return (
        <div className="slider-component">
            <input
                type="range"
                onChange={(e) => {
                    prop.onChange?.(e);
                    SetV(parseFloat(e.currentTarget.value));
                }}
                defaultValue={prop.defaultValue ?? 50}
                step={prop.step ?? 1}
                max={prop.max ?? 100}
                min={prop.min ?? 0}
            />
            {v.toFixed(prop.fixedNum ?? 0)}
            {prop.suffix}
        </div>
    );
}
