
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { IoKeyOutline } from "react-icons/io5";
export default function BSIDLabel(
    {id,size, tooltip = "beats per minute"}:{id:string,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={id}  size={size} tooltip={tooltip}>
                <IoKeyOutline/>
            </BSLabel>
        </>
    )
}