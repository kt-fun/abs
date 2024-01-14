import {BSMapTag as Tag, BSMapTagType} from "@/interfaces/mapTags";
import React from "react";
import {cn} from "@/lib/utils";

interface BSMapTagProps {
    tag:Tag
    className?:string
}
export default function BSMapTag(
    {
      tag,
      className,
    }:BSMapTagProps
){
    return (
        <>
            <span className={cn(` text-xs text-white ${tag.type == BSMapTagType.Style ?'bg-red-500':'bg-blue-500'} rounded-md p-0.5  inline-flex items-center justify-center space-x-1 cursor-default`,className)} >
                {tag.human}
            </span>
        </>
    )
}