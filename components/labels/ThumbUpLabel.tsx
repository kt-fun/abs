
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/utils/format";
import { AiOutlineLike  } from "react-icons/ai";
export default function NPSLabel(
    {likeCnt,size}:{likeCnt:number}& {size?:TextSize}
){
    return (
        <>
            <BSLabel label={formatNumber(likeCnt)} size={size}>
                <AiOutlineLike />
            </BSLabel>
        </>
    )
}