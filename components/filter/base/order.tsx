import {AnimatePresence, HTMLMotionProps, motion, useAnimationControls, Variants} from "framer-motion";
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {ArrowUpDown} from "lucide-react";
import {useTranslation} from "@/hooks/useTranslation";
import {cn} from "@/lib/utils";
import {PopoverContent, PopoverTrigger, Popover} from "@/components/ui/popover";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
const containerVariant = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05
    }
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  }
}

type SortOrderProps = {
  order: string,
  onUpdateOrder: (order:string) => void
} &React.HTMLAttributes<HTMLDivElement>

const SortOrder = React.forwardRef<HTMLDivElement, SortOrderProps>((
{
  order,
  onUpdateOrder,
  ...rest
}:SortOrderProps,
ref,
)=> {

  const {t:ft} = useTranslation('components.filter')
  const t = useCallback((id:string)=>ft(`order.${id}`),[ft])
  const orders = ['Relevance', 'Rating', 'Latest', 'Curated']
  const [isOpen,setIsOpen] = useState(false)
  return (
    <div
      {...rest}
      className={cn("flex items-center text-xs relative", rest.className)}
      ref={ref}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.button
            layout
            className={"flex items-center rounded-full p-1 px-2 bg-zinc-100/70 dark:bg-zinc-900/70 cursor-pointer space-x-1"}
          >
            <ArrowUpDown className={"h-4 w-4"}/>
            <motion.span layout>{t(order.toLowerCase())}</motion.span>
          </motion.button>
        </PopoverTrigger>
        <AnimatePresence>
          {
            isOpen &&
              <PopoverContent asChild>
                <motion.ul
                    className={cn(
                      "z-10 bg-zinc-100/70 dark:bg-zinc-900/70 p-2 m-2 rounded-lg mt-1 overflow-hidden text-left shadow backdrop-blur",
                      "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-0 after:bg-red-300 after:ease-in-out after:pointer-events-auto group-after"
                    )}
                    initial="closed"
                    animate={"open"}
                    exit="closed"
                    variants={containerVariant}
                >
                  {
                    orders.map((item,index) =>
                      <motion.li
                        key={item}
                        animate={"open"}
                        variants={itemVariants}
                        className={
                          // hover:bg-zinc-300/40 dark:hover:bg-zinc-500/50
                          "w-40 select-none rounded px-2 py-1.5"
                        }
                        onClick={()=> {
                          onUpdateOrder(item)
                          setIsOpen(false)
                        }}
                      >
                        {t(item.toLowerCase())}
                      </motion.li>
                    )
                  }
                </motion.ul>
              </PopoverContent>
          }
        </AnimatePresence>
      </Popover>
    </div>


  )
})

SortOrder.displayName = "SortOrder"

export default React.memo(motion(SortOrder))