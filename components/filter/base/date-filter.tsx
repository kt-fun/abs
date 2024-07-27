import {AnimatePresence, motion, useAnimationControls, Variants} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {Calendar} from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useDimensions} from "@/hooks/ui/useDimensions";
import {useLocaleFormat} from "@/hooks/useFormat";
type DateFilterProps = {
  value: DateRange,
  onUpdateValue:(value:DateRange|undefined) => void
} & React.HTMLAttributes<HTMLDivElement>

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
const DateFilter = React.forwardRef<HTMLDivElement, DateFilterProps>((
  {
    value,
    onUpdateValue,
    ...props
  }:DateFilterProps,
  ref,
)=> {
  const {formatDate,FNSLocale} = useLocaleFormat()
  const {t} = useTranslation('components.filter')
  const [isOpen,setIsOpen] = useState(false)

  const containerRef = useRef(ref);
  const { height } = useDimensions(containerRef);
  return (
    <>
      <div
        {...props}
        className={cn(
    "flex items-center text-xs relative",
            props.className
          )}
        ref={ref}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <motion.div className={"text-xs rounded-full p-1 px-2 bg-zinc-100/70 dark:bg-zinc-700/70 cursor-pointer flex items-center space-x-2 w-56"}>
              <CalendarIcon className={"h-4 w-4"}/>
              <span className={"flex items-center justify-between w-full"}>
                <span>
                  {value.from? formatDate(value.from) :t('date.from') }
                </span>
                <span>
                  ~
                </span>
                <span>
                  {value.to? formatDate(value.to) :t('date.to')}
                </span>
              </span>
            </motion.div>
          </PopoverTrigger>
          <AnimatePresence>
            {
              isOpen &&
                <PopoverContent asChild>
                    <motion.div
                        className={"z-10 bg-zinc-100/70 dark:bg-zinc-700/70 p-2 m-2 rounded-lg mt-1 overflow-hidden text-left shadow backdrop-blur"}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        custom={height}
                        variants={containerVariant}
                    >
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={value?.from}
                            selected={value}
                            onSelect={(v)=>{onUpdateValue(v)}}
                            numberOfMonths={2}
                            locale={FNSLocale}
                        />
                    </motion.div>
                </PopoverContent>
            }
          </AnimatePresence>
        </Popover>
      </div>
    </>
  )
})

DateFilter.displayName = "DateFilter"

export default React.memo(motion(DateFilter))