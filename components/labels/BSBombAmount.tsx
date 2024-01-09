
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/lib/format";
import { GiBoltBomb } from "react-icons/gi";
export default function BSBombAmountLabel(
    {amount,size, tooltip = "bomb amount"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)}  size={size} tooltip={tooltip}>
                <GiBoltBomb/>
            </BSLabel>
        </>
    )
}