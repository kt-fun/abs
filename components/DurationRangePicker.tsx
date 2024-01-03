import { Slider } from "@radix-ui/themes";
import { useMemo, useState } from "react";

export default function DurationRangePicker() {
    const [range, setRange] = useState<[number|undefined, number|undefined]>([0, 16]);

    const handle = (value: number[]) => {
        let [min, max]:[number|undefined, number|undefined] = value as [number, number];
        if (value[0] === 0) {
            min = undefined;
        }
        if (value[1] === 16) {
            max = undefined;
        }
        setRange([min, max]);
    }
    const covertedRange = useMemo(()=>{
        return [
            range[0] === undefined ? 0 : range[0],
            range[1] === undefined ? 16 : range[1]
        ]
    },[range])
    const text = useMemo(()=>{
        let min = range[0]?range[0]:0;
        if (range[1] === undefined) {
            return `${min} - ∞`
        }
        return `${min} - ${range[1]}`
    },[range])
    return (
        <div className="relative">
            <Slider
            defaultValue={covertedRange}
            min={0}
            max={16}
            onValueChange={handle}
            onValueCommit={handle}
            step={0.1}
            />
            <div className="flex justify-between">
                <div>Duration</div>
                <div>{text}</div>
            </div>
        </div>
    )
}