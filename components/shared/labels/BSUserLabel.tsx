'use client'
import { BSUser } from "@/interfaces/beatsaver-user";
import Link from "@/components/ui/link";
import MapperAvatar from "@/components/shared/MapperAvatar";
import BSUserDetailCard from "../BSUserDetialCard";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {cn} from "@/lib/utils";

import {motion} from 'framer-motion'
import React from "react";
const truncated = (text:string) => {
    if (text.length > 12) {
        return text.substring(0,12) + '...'
    }
    return text
}
const BSUserLabel = function (
    {
        user,
        className,
        avatarClassName,
        linkClassName
    }:{
        user:BSUser,
        className?:string,
        avatarClassName?:string,
        linkClassName?:string
    }
){
    return (
      <>
          <HoverCard openDelay={300}>

            <HoverCardTrigger asChild>
              <motion.div layout className={cn("relative flex items-center  cursor-pointer text-xs", className)}>
                <MapperAvatar src={user.avatar} verified={user.verifiedMapper} className={avatarClassName}/>
                <Link href={`/mapper/${user.id}`} className={linkClassName}>
                  <span className='my-auto text-ellipsis line-clamp-1'>{truncated(user.name)}</span>
                </Link>
              </motion.div>
            </HoverCardTrigger>

            <HoverCardContent className="shadow-md rounded-md bg-transparent dark:bg-transparent">
            <BSUserDetailCard user={user}/>
            </HoverCardContent>
          </HoverCard>

      </>
    )
}

export default React.memo(BSUserLabel, (a, b) => a.user.id == b.user.id)