import {AnimatePresence, motion, useAnimationControls, Variants} from "framer-motion";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {ListFilter} from "lucide-react";
import {MapQueryParam} from "@/interfaces/bsmap-query-param";
import {useDimensions} from "@/hooks/ui/useDimensions";
import NPSRangePicker from "@/components/filter/base/NPSRangePicker";
import DurationRangePicker from "@/components/filter/base/DurationRangePicker";
import RatingRangePicker from "@/components/filter/base/RatingRangePicker";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type RangeFilterProps = {
  queryParam: MapQueryParam,
  updateQuery:(queryParam:MapQueryParam) => void
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
const RangeFilter = React.forwardRef<HTMLDivElement, RangeFilterProps>((
  {
    queryParam,
    updateQuery,
    ...props
  }:RangeFilterProps,
  ref,
)=> {
  const {t} = useTranslation()
  const [isOpen,setIsOpen] = useState(false)
  let controls = useAnimationControls();
  useEffect(() => {
    if (isOpen) {
      controls.start("open");
    }
  }, [controls, isOpen]);
  const containerRef = useRef(ref);
  const { height } = useDimensions(containerRef);
  const npsRange = useMemo(()=>{
    return [queryParam.minNps,queryParam.maxNps] as [number|undefined, number|undefined]
  },[queryParam])
  const durationRange = useMemo(()=>{
    return [queryParam.minDuration,queryParam.maxDuration] as [number|undefined, number|undefined]
  },[queryParam])
  const ratingRange = useMemo(()=>{
    return [queryParam.minRating,queryParam.maxRating] as [number|undefined, number|undefined]
  },[queryParam])
  const setNpsRange = (range:[number|undefined,number|undefined])=>{
    updateQuery({
      ...queryParam,
      minNps:range[0],
      maxNps:range[1]
    })
  }
  const setDurationRange = (range:[number|undefined,number|undefined])=>{
    updateQuery({
      ...queryParam,
      minDuration:range[0],
      maxDuration:range[1]
    })
  }
  const setRatingRange = (range:[number|undefined,number|undefined])=>{
    updateQuery({
      ...queryParam,
      minRating:range[0],
      maxRating:range[1]
    })
  }

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
            <motion.div layout className={"text-xs rounded-full p-1 px-2 bg-zinc-100 dark:bg-zinc-700/70 cursor-pointer flex items-center space-x-1"}>
              <ListFilter className={"h-4 w-4"}/>
              <span>{t('range picker')}</span>
            </motion.div>
          </PopoverTrigger>
          <AnimatePresence>
            {
              isOpen &&
                <PopoverContent

                    className={"w-40 z-10 bg-zinc-100/70 dark:bg-zinc-700/70"}
                    asChild
                >
                    <motion.div
                        className={" p-4 m-2 rounded-lg mt-1 overflow-hidden text-left shadow backdrop-blur text-xs gap-1 space-y-1"}
                        initial="closed"
                        custom={height}
                        animate={controls}
                        exit="closed"
                        variants={containerVariant}
                    >
                      <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
                      <DurationRangePicker range={durationRange} setRange={setDurationRange}/>
                      <RatingRangePicker range={ratingRange} setRange={setRatingRange}/>
                    </motion.div>
                </PopoverContent>
            }
          </AnimatePresence>
        </Popover>
      </div>
    </>
  )
})

RangeFilter.displayName = "RangeFilter"

export default React.memo(motion(RangeFilter))