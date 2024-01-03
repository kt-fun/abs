
import BSLabel from "./BSLabel";
import { CiTimer } from "react-icons/ci";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Tooltip } from "@radix-ui/themes";
import { TextSize } from "@/interfaces/text-size";
dayjs.extend(duration);
export default function DurationLabel(
    {duration,size,tooltip="duration of this map"}:{duration:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
        <Tooltip content="时长">
            <BSLabel label={dayjs.duration(duration,'seconds').format('mm:ss')} size={size}  tooltip={tooltip}>
                <CiTimer/>
            </BSLabel>
        </Tooltip>
        </>
    )
}