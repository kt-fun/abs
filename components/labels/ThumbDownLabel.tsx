
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/lib/format";
import { AiOutlineDislike } from "react-icons/ai";
export default function ThumbDownLabel(
    {dislikeCnt,size,tooptip}:{dislikeCnt:number} & {size?:TextSize, tooptip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(dislikeCnt)} size={size}  tooltip={tooptip}>
                <AiOutlineDislike/>
            </BSLabel>
        </>
    )
}