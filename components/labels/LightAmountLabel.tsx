
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/lib/format";
import { FaHighlighter } from "react-icons/fa6";
export default function LightAmountLabel(
    {amount,size, tooltip = "light event amount"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)}  size={size} tooltip={tooltip}>
                <FaHighlighter/>
            </BSLabel>
        </>
    )
}