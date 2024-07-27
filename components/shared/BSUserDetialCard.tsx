import { BSUser } from "@/interfaces/beatsaver-user";
import { useBSUser } from "@/hooks/api/useBSUser";
import BSMapper from "@/components/bsmapper/BSMapper";
import { MdOutlineErrorOutline } from "react-icons/md";
import {Loading} from "@/components/shared/load-status";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils";
import React from "react";
import {AnimateChangeInHeight} from "@/components/shared/AnimateChangeInHeight";

const containerVariants = {
    initial: {
        height: 'auto',
    },
    animate: {
        height: 'auto',
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        height: 'auto',
        transition: {
            duration: 0.3,
        },
    },
};

const Error = ({error}:{error:string})=> 
<motion.div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
    <span  className={`hover:bg-white  p-1 rounded-full`}>
        <MdOutlineErrorOutline/>
    </span>
    <span className="text-xs sm:text-xl">Error:{error}...</span>
</motion.div>

const BSUserDetailCard =  function (
    {user}:{user:BSUser}
) {
    const { bsUserWithStats, isLoading, error } = useBSUser(user.id)
    return (
      <AnimateChangeInHeight
        className={"shadow-none bg-zinc-100/70 dark:bg-zinc-700/70 backdrop-blur  rounded-lg"}
      >
          {
            isLoading ? <Loading/> :
            bsUserWithStats ? <BSMapper bsUserWithStats={bsUserWithStats}/> :
            <Error error={error.toString()}/>
          }
      </AnimateChangeInHeight>
    )
}

export default React.memo(BSUserDetailCard, (a,b)=>a.user.id === b.user.id)