'use client'

import React, {Ref, useState} from "react"
import { FaCheck } from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useCopyToClipboard} from "react-use";

const CopyIcon = React.forwardRef(({
   content,
   className,
   children
 }:{
  content:string,
  children:React.ReactNode,
  className?:string,
},ref) => {
  const [copied, setCopied] = useState(false)
  const [_, copyToClipboard] = useCopyToClipboard()
  const copy = () => {
    if (copied) return
    setCopied(true)
    copyToClipboard(content)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }
  return(
    <Button size={"icon"} className={cn("rounded-full",className)} onClick={copy} variant="ghost" ref={ref as any}>
      {
        copied ? <FaCheck/>: <>{children}</>
      }
    </Button>
  )
})
CopyIcon.displayName = "CopyIcon"
export default CopyIcon