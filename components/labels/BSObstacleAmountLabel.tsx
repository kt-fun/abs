
import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/lib/format";
import { PiWall } from "react-icons/pi";
export default function BSObstacleAmountLabel(
    {amount,size, tooltip = "obstacle amount"}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)}  size={size} tooltip={tooltip}>
                <PiWall/>
            </BSLabel>
        </>
    )
}