import { Skeleton } from "@/components/ui/skeleton"
import {Card} from "@/components/ui/card";

import { DateLabel } from "@/components/labels/BSMapMetaLabels";
import { CiStar } from "react-icons/ci"
import {BSMapCountLabel} from "@/components/labels/BSLabel";

export default function BSPlaylistSkeleton() {
    return (
        <>
        <Card className=" group flex flex-col w-[320px] h-full xl:w-[256px]" >
                <Skeleton className="h-[256px] w-[256px] rounded-l-md" />
                {/* <Skeleton className="max-w-[200px] rounded-l-md" /> */}

                <div className="flex justify-between items-center invisible">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                        <span>{"bsPlaylist.name"}</span>
                    </span>
                    {/* <BSUserLabel user={bsPlaylist.owner}/> */}
                </div>
                <div className="flex items-center justify-between pr-2 invisible">
                        <DateLabel date={"2024-01-04T03:48:16.848015Z"}/>
                        <div className="flex items-center space-x-1 text-center">
                            <BSMapCountLabel count={0}  />
                            <div className="flex items-center">
                                <CiStar/>
                                <span className="pl-1 font-medium text-xs">{89.3}%</span>
                            </div>
                        </div>
                </div>
        </Card>
        </>
    )
}