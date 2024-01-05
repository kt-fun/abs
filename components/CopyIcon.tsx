'use client'

import { useState } from "react"
import { FaCheck } from "react-icons/fa6";
export default function CopyIcon(
    {
        content,
        className,
        children
    }:{className?:string,
        content:string, 
        children:React.ReactNode
    }
) {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        if (copied) return
        setCopied(true)
        navigator.clipboard.writeText(content)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }
    return(
        <>
            <span className={className} onClick={copy}>                
              {
                     copied ? 
                     <FaCheck></FaCheck>:
                     <>{children}</> 
              }
            </span>
        </>
    )
}