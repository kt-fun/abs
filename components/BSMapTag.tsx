import { BSMapTagType, BSMapTag as Tag } from "@/interfaces/mapTags";
import { TextSize } from "@/interfaces/text-size";
import { Text } from "@radix-ui/themes";
export default function BSMapTag(
    {tag,size,className}:{tag:Tag,size?:TextSize, className?:string}
){
    return (
        <>
            <Text size={size} className={` ${className} `}>
                {tag.human}
            </Text>
        </>
    )
}