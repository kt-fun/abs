
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
import { formatNumber } from "@/utils/format";
import { IoCubeOutline } from "react-icons/io5";
export default function BSNoteAmountLabel(
    {amount,size, tooltip = "note amount"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)}  size={size} tooltip={tooltip}>
                <IoCubeOutline/>
            </BSLabel>
        </>
    )
}