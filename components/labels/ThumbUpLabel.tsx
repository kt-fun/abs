
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/lib/format";
import { AiOutlineLike  } from "react-icons/ai";
export default function ThumbUpLabel(
    {likeCnt,size,tooptip}:{likeCnt:number}& {size?:TextSize, tooptip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(likeCnt)} size={size} tooltip={tooptip}>
                <AiOutlineLike/>
            </BSLabel>
        </>
    )
}