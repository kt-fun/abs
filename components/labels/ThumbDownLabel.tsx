
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/utils/format";
import { AiOutlineDislike } from "react-icons/ai";
export default function ThumbDownLabel(
    {dislikeCnt,size}:{dislikeCnt:number} & {size?:TextSize}
){
    return (
        <>
            <BSLabel label={formatNumber(dislikeCnt)} size={size}>
                <AiOutlineDislike/>
            </BSLabel>
        </>
    )
}