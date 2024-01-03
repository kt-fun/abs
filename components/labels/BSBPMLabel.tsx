
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/utils/format";
import { GiBoltBomb } from "react-icons/gi";
import { PiHeartbeat } from "react-icons/pi";
export default function BSBPMLabel(
    {bpm,size, tooltip = "beats per minute"}:{bpm:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={bpm.toFixed(0)}  size={size} tooltip={tooltip}>
                <PiHeartbeat/>
            </BSLabel>
        </>
    )
}