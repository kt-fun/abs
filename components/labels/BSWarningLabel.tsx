
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/utils/format";
import { GiBoltBomb } from "react-icons/gi";
import { PiHeartbeat } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
export default function BSWarningLabel(
    {amount,size, tooltip = "warning"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={amount.toString()}  size={size} tooltip={tooltip}>
                <CiWarning/>
            </BSLabel>
        </>
    )
}