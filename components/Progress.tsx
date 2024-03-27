import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import {twMerge} from "tailwind-merge";
import {motion} from 'framer-motion'
export function Progress(
{
  score,
  containerClassName,
  className
}:{
  score: number,
  className?: string,
  containerClassName?: string
}
) {
  return (
    <ProgressPrimitive.Root asChild
                            className={twMerge("relative overflow-hidden rounded-full min-w-24 max-w-32 h-2 bg-gray-100", containerClassName)}
                            value={score}
    >
      <motion.div layout>
        <ProgressPrimitive.Indicator
          className={twMerge("h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500", className)}
          style={{transform: `translateX(-${100 - score}%)`}}
        >
        </ProgressPrimitive.Indicator>
      </motion.div>
    </ProgressPrimitive.Root>

  )
}