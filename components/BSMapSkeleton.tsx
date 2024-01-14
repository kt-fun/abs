import { Skeleton } from "@/components/ui/skeleton"
import {Card} from "@/components/ui/card";
export default function BSMapSkeleton() {
    return (
        <>
        <Card className="shadow-md max-h-[200px]">
            <div className='h-full flex'>
                <Skeleton className="h-[200px] w-[200px] rounded-l-md min-w-[200px] max-w-[200px]" />
                <div className="relative h-full flex flex-col pl-2">
                <Skeleton className="max-w-[200px] rounded-l-md" />
                        <div
                        className="overflow-ellipsis line-clamp-1 invisible text-sm font-semibold text-gray-500 dark:text-gray-400"
                        >{"ツクモの契 feat. 重音テトdss"}</div>
                </div>
            </div>
        </Card>
        </>
    )
}