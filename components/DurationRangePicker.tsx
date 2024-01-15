import { formatDuration } from "@/lib/format";
import { Slider } from "@/components/ui/slider"

import { useMemo } from "react";

export default function DurationRangePicker({
    range,
    setRange
}:{
    range:[number|undefined, number|undefined],
    setRange:(range:[number|undefined, number|undefined])=>void   
}) {

    const handle = (value: number[]) => {
        let [min, max]:[number|undefined, number|undefined] = value as [number, number];
        if (value[0] === 0) {
            min = undefined;
        }
        if (value[1] === 330) {
            max = undefined;
        }
        setRange([min, max]);
    }
    const coveredRange = useMemo(()=>{
        return [
            range[0] === undefined ? 0 : range[0],
            range[1] === undefined ? 330 : range[1]
        ]
    },[range])
    const text = useMemo(()=>{
        let min = range[0]?range[0]:0;
        let max = range[1]?range[1]:undefined;
        if (range[1] === undefined || range[1] === 330) {
            return `${formatDuration(min)} - ∞`
        }
        return `${formatDuration(min)} - ${formatDuration(max!)}`
    },[range])
    return (
        <div className="relative z-[100]">
            <Slider
            defaultValue={coveredRange}
            min={0}
            max={330}
            onValueChange={handle}
            onValueCommit={handle}
            step={30}
            className="z-[100]"
            />
            <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span>{text}</span>
            </div>
        </div>
    )
}