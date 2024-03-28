import { AiOutlineLoading } from "react-icons/ai";
import {cn} from "@/lib/utils";



export default function Loading({
className
}:{
    className?:string
}) {
    return (
        <div className={cn("flex justify-center w-full h-full items-center self-center justify-self-center",className)}>
        <div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
            <span className="inline-flex items-center justify-center space-x-2 text-xl">
            <span className="p-1 rounded-full animate-spin">
                <AiOutlineLoading/>
            </span>
            <span>Loading...</span>
            </span>
        </div>
    </div>
    )
}