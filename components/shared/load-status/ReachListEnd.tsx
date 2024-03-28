import {MdOutlineErrorOutline} from "react-icons/md";
import {cn} from "@/lib/utils";

export default function ReachListEnd(
{
  msg = "No More",
  className
}:{
  msg?:string,
  className?:string
}) {
  return (
    <div className={cn("flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2 self-center justify-self-center",className)}>
    <span className={`hover:bg-white  p-1 rounded-full`}>
        <MdOutlineErrorOutline/>
    </span>
      <span className="text-xs sm:text-xl">{msg}</span>
    </div>
  )
}