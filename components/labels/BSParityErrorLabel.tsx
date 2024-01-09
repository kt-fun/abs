


import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/lib/format";
import { GiBoltBomb } from "react-icons/gi";
import { PiHeartbeat } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
export default function BSParityErrorLabel(
    {amount, size, tooltip = "parity error amount"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={amount.toString()}  size={size} tooltip={tooltip}>
                <RxCross2/>
            </BSLabel>
        </>
    )
}