import { TextSize } from "@/interfaces/text-size";
import BSLabel from "./BSLabel";
import { formatNumber } from "@/utils/format";
import { Responsive } from "@radix-ui/themes";
import { CiMap } from "react-icons/ci";
export default function BSMapAmountLabel(
    {amount,size,tooltip}:{amount:number,size?:TextSize, tooltip?:string}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)} size={size} tooltip={tooltip}>
                <CiMap />
            </BSLabel>
        </>
    )
}