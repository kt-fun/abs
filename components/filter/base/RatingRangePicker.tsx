import { Slider } from "@/components/ui/slider"
import { useMemo } from "react";
import {useTranslation} from "@/hooks/useTranslation";

export default function RatingRangePicker(
    {
        range,
        setRange
    }:{
        range:[number|undefined, number|undefined],
        setRange:(range:[number|undefined, number|undefined])=>void   
    }
) {
    const {t} = useTranslation('components.filter')
    const handle = (value: number[]) => {
        let [min, max]:[number|undefined, number|undefined] = value as [number, number];
        if (value[0] === 0) {
            min = undefined;
        }
        if (value[1] === 100) {
            max = undefined;
        }
        setRange([min, max]);
    }
    const covertedRange = useMemo(()=>{
        return [
            range[0] === undefined ? 0 : Math.floor(range[0]),
            range[1] === undefined ? 100 : Math.floor(range[1])
        ]
    },[range])
    const text = useMemo(()=>{
        let min = range[0]?range[0]?.toFixed(0):'0';
        if (range[1] === undefined) {
            return `${min} - 100 %`
        }
        return `${min} - ${range[1]?.toFixed(0)??100} %`
    },[range])
    return (
      <div className="relative">

          <div className="flex justify-between mb-1.5">
              <span>{t('range.rating')}</span>
              <span>{text}</span>
          </div>
          <Slider
            defaultValue={covertedRange}
            min={0}
            max={100}
            onValueChange={handle}
            onValueCommit={handle}
            step={5}
          />
      </div>
    )
}