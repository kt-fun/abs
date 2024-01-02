import BSLabel from "./BSLabel";
import { formatNumber } from "@/utils/format";
import { Responsive } from "@radix-ui/themes";
import { CiMap } from "react-icons/ci";
export default function BSMapAmountLabel(
    {amount,size}:{amount:number,size?:Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined}
){
    return (
        <>
            <BSLabel label={formatNumber(amount)} size={size}>
                <CiMap />
            </BSLabel>
        </>
    )
}