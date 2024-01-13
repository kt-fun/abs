import {BSMapTag as Tag, BSMapTagType} from "@/interfaces/mapTags";
import {TextSize} from "@/interfaces/text-size";
import {Text} from "@radix-ui/themes";
import React from "react";

interface BSMapTagProps {
    tag:Tag
    size?:TextSize
    className?:string
}
export default function BSMapTag(
    {
      tag,
      size,
      className,
      ...props
    }:BSMapTagProps & React.ComponentProps<typeof Text>,
){
    return (
        <>
            <Text {...props} size={size} className={` ${className} text-white ${tag.type == BSMapTagType.Style ?'bg-red-500':'bg-blue-500'} rounded-md p-0.5  inline-flex items-center justify-center space-x-1 cursor-pointer`} >
                {tag.human}
            </Text>
        </>
    )
}