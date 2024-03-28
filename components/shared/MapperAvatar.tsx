import  {Avatar} from "@/components/ui/avatar";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {cn} from "@/lib/utils";
import React from "react";
import {motion} from 'framer-motion'
interface BSMapperAvatarProps {
    src:string
    verified?:boolean,
    fallback?:string,
    className?:string
}

export default function MapperAvatar(
    {src,verified, fallback,className}:BSMapperAvatarProps
) {
  return (
    <>
      <motion.span layout className={cn(`relative w-6 h-6 m-1 flex`,className)}>
        <Avatar src={src} className="absolute bottom-0 min-w-6 max-h-6 right-0 rounded-full" fallback={fallback ? fallback : 'N'}/>
        {
          verified &&
            <motion.span layout className="bottom-0 right-0 absolute text-blue-500 font-bold text-xs w-2 h-2">
              <RiVerifiedBadgeFill/>
            </motion.span>
        }
      </motion.span>
    </>
  )
}