import { Tooltip } from "@/components/ui/tooltip";
import * as React from 'react'
import {cn} from "@/lib/utils";
import {CiMap} from "react-icons/ci";
import {GiRank3} from "react-icons/gi";
import  {motion} from 'framer-motion'
import {useLocaleFormat} from "@/hooks/useFormat";
interface BSLabelProps {
    label:string,
  className?:string
}
export interface LabelProps {
  className?:string
  tooltip?:string
}

const Label = React.forwardRef(({
    children,
    label,
    className
}:{
    children:React.ReactNode,
    label:string,
    className?:string,
}, forwardedRef) => {
  return (
  <motion.span
    layout
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      transition:{
        duration: 1
      }
    }}
    exit={{
      opacity: 0,
      transition:{
        duration: 1
      }
    }}
    className={cn("font-medium inline-flex items-center space-x-1  text-xs cursor-default",className)} ref={forwardedRef as any}
  >
      <span>{children}</span>
      <span>{label}</span>
  </motion.span>
  )
  }
)

Label.displayName = "Label";

export default function BSLabel(
{children, label,className, tooltip}:BSLabelProps & {children:React.ReactNode,tooltip?:string}
) {
    return (
        <>
        {
            tooltip ?
              (
                <Tooltip content={tooltip} >
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
  {count,className, tooltip = "map count"}:{count:number} & LabelProps
)=> {
  const {formatNumber} = useLocaleFormat()
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
      <CiMap/>
    </BSLabel>
  )
}

export const BSRankMapCountLabel =  (
  {count,className, tooltip = "rank map count"}:{count:number} & LabelProps
)=> {
  const {formatNumber} = useLocaleFormat()
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
      <GiRank3/>
    </BSLabel>
  )
}