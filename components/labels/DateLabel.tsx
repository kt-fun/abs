import BSLabel from "./BSLabel";
import { formatTime } from "@/utils/format";
import { CiCalendarDate } from "react-icons/ci";
import { Responsive, Tooltip } from "@radix-ui/themes";
import { TextSize } from "@/interfaces/text-size";
export default function DateLabel(
    {date,size}:{date:string,size?:TextSize}
){
    return (
        <>
            <Tooltip content={date}>
                <BSLabel label={formatTime(date)} size={size}>
                    <CiCalendarDate/>
                </BSLabel>
            </Tooltip>
        </>
    )
}