import { BSMapTagType, BSMapTag as Tag } from "@/interfaces/mapTags";
export default function BSMapTag(
    {tag}:{tag:Tag}
){
    return (
        <>
            <span className={`p-0.5 text-xs font-semibold text-white rounded-md ${tag.type==BSMapTagType.Style ?'bg-red-500':'bg-blue-500'} `}>
                {tag.human}
            </span>
        </>
    )
}