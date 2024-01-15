import { Slider } from "@/components/ui/slider"
import { useMemo } from "react";

export default function NPSRangePicker(
    {
        range,
        setRange
    }:{
        range:[number|undefined, number|undefined],
        setRange:(range:[number|undefined, number|undefined])=>void   
    }
) {
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
    const coveredRange = useMemo(()=>{
        return [
            range[0] === undefined ? 0 : range[0],
            range[1] === undefined ? 16 : range[1]
        ]
    },[range])
    const text = useMemo(()=>{
        let min = range[0]?range[0]:0;
        if (range[1] === undefined || range[1] === 16) {
            return `${min} - ∞`
        }
        return `${min} - ${range[1]}`
    },[range])
    return (
        <div className="relative">
            <Slider
            defaultValue={coveredRange}
            min={0}
            max={16}
            onValueChange={handle}
            onValueCommit={handle}
            step={0.1}
            />
            <div className="flex justify-between text-sm">
                <span>NPS</span>
                <span>{text}</span>
            </div>
        </div>
    )
}