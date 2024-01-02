
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
export default function NPSLabel(
    {nps,size}:{nps:number,size?:TextSize}
){
    return (
        <>
            <BSLabel label={nps.toFixed(2)}  size={size}>
                <IoSpeedometerOutline/>
            </BSLabel>
        </>
    )
}