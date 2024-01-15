import { Tooltip } from "@/components/ui/tooltip";
import * as React from 'react'
import {cn} from "@/lib/utils";
import {formatNumber} from "@/lib/format";
import {CiMap} from "react-icons/ci";
import {GiRank3} from "react-icons/gi";

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
    <span className={cn("font-medium inline-flex items-center space-x-1  text-xs cursor-default",className)} ref={forwardedRef as any}>
      <span>{children}</span>
      <span>{label}</span>
  </span>
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
            // tooltip ?
            //   (
            //     <Tooltip content={tooltip} >
            //         <Label label={label} className={className}>{children}</Label>
            //     </Tooltip>
            //   ) : (
                <Label label={label} className={className}>{children}</Label>
              // )
        }

        </>

    )
}


export const BSMapCountLabel =  (
  {count,className, tooltip = "map count"}:{count:number} & LabelProps
)=> {
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
      <CiMap/>
    </BSLabel>
  )
}

export const BSRankMapCountLabel =  (
  {count,className, tooltip = "rank map count"}:{count:number} & LabelProps
)=> {
  return (
    <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
      <GiRank3/>
    </BSLabel>
  )
}