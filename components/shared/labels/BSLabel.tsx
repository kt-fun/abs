import { Tooltip } from "@/components/ui/tooltip";
import * as React from 'react'
import {cn} from "@/lib/utils";
import {CiMap} from "react-icons/ci";
import {GiRank3} from "react-icons/gi";
import {HTMLMotionProps, motion} from 'framer-motion'
import {useLocaleFormat} from "@/hooks/useFormat";
import {useTranslation} from "@/hooks/useTranslation";
interface BSLabelProps {
    label:string,
  className?:string
}
export interface LabelProps {
  className?:string
  tooltip?:string
}

interface BaseProps {
  children:React.ReactNode,
  label:string,
  className?:string,
}

const Label = React.forwardRef<HTMLSpanElement, BaseProps>(({
    children,
    label,
    className,
  ...rest
}:BaseProps & HTMLMotionProps<'span'>, forwardedRef) => {
  return (
    <motion.span
      {...rest}
      ref={forwardedRef}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1
        }
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 1
        }
      }}
      className={cn("font-medium inline-flex items-center space-x-1  text-xs cursor-default", className)}
    >
      <span>{children}</span>
      <span>{label}</span>
    </motion.span>
  )
  }
)

Label.displayName = "Label";

export default function BSLabel(
  {children, label, className, tooltip}: BSLabelProps & { children: React.ReactNode, tooltip?: string }
) {
  return (
    <>
      {
        tooltip ?
          (
            <Tooltip content={tooltip} asChild>
              <Label label={label} className={className}>{children}</Label>
            </Tooltip>
          ) : (
            <Label label={label} className={className}>{children}</Label>
              )
        }

        </>

    )
}


export const BSMapCountLabel =  (
  {count,className, tooltip}:{count:number} & LabelProps
)=> {
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('map-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
      <CiMap/>
    </BSLabel>
  )
}

export const BSRankMapCountLabel =  (
  {count,className, tooltip}:{count:number} & LabelProps
)=> {
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('rank-map-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
      <GiRank3/>
    </BSLabel>
  )
}