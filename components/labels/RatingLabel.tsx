
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { CiStar } from "react-icons/ci";
export default function RatingLabel(
    {rate,size,tooltip}:{rate:number}& {size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={`${(100*rate).toFixed(1)} %`} size={size} tooltip={tooltip}>
                <CiStar/>
            </BSLabel>
        </>
    )
}