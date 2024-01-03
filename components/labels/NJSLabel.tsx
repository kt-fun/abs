
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoSpeedometerOutline } from "react-icons/io5";
export default function NJSLabel(
    {njs,size, tooltip  = "note jump speed"}:{njs:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={njs.toFixed(2)}  size={size} tooltip={tooltip}>
                <IoSpeedometerOutline/>
            </BSLabel>
        </>
    )
}