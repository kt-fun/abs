
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { CiStar } from "react-icons/ci";
export default function RatingLabel(
    {rate,size}:{rate:number}& {size?:TextSize}
){
    return (
        <>
            <BSLabel label={`${(100*rate).toFixed(1)} %`} size={size}>
                <CiStar/>
            </BSLabel>
        </>
    )
}