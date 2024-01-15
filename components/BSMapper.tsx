// 'use client'
import RankedIcon from "@/components/icons/RankedIcon";
import ThumbDownIcon from "@/components/icons/ThumbDownIcon";
import ThumbUpIcon from "@/components/icons/ThumbUpIcon";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { formatNumber } from "@/lib/format";
import { FaMapMarkedAlt } from "react-icons/fa";
import * as Progress from '@radix-ui/react-progress';
import  {Avatar} from "@/components/ui/avatar";
import * as Card from "@/components/ui/card";
import {Tooltip} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import Link from "@/components/ui/link";
import { useCallback } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import {cn} from "@/lib/utils";
dayjs.extend(relativeTime);
const LabelWithIcon = ({children, label,tooltip}:{children:React.ReactNode,label:string, tooltip?:string}) => {
    return (
        <Tooltip content={tooltip?tooltip:""}>
            <span className="flex items-center space-x-1 cursor-default">
                {children}
              <span className="font-medium">{label}</span>
            </span>
        </Tooltip>
        
    )

}

const getDescription = (description:string) => {
    if (description.length == 0) {
        return "mapper didn't write anything";
    }
    return description;
}

export default function BSMapper(
    {
      bsUserWithStats,
      className
    }:{
      bsUserWithStats:BSUserWithStats,
      className?:string
    }
) {
  const computeRating = useCallback((like:number,dislike:number) => {
    if(like == 0 && dislike == 0){
        return 50;
    }
    return (like/(like+dislike))*100.0;
  },[])
  const rating = computeRating(
    bsUserWithStats.stats.totalUpvotes? bsUserWithStats.stats.totalUpvotes : 0,
    bsUserWithStats.stats.totalDownvotes? bsUserWithStats.stats.totalDownvotes : 0
  );
    return (
        <>
        <Card.Card className={cn("min-w-64 sm:w-fit max-w-[300px]",className)}>
          <Card.CardContent className="p-2">
            <div className="flex">
                <Avatar
                    src={bsUserWithStats.avatar}
                    className="m-2 w-12 h-12"
                    fallback={bsUserWithStats.name[0]} />
                <div className="overflow-hidden">
                    <Link href={`/mapper/${bsUserWithStats.id}`} className="overflow-hidden" >
                      <div  className="text-lg text-ellipsis font-medium">
                        {bsUserWithStats.name}
                      </div>

                    </Link>
                    <div
                    className="overflow-ellipsis line-clamp-2 pr-2 text-xs text-gray-400"
                    dangerouslySetInnerHTML={{__html:getDescription(bsUserWithStats.description)}}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <LabelWithIcon tooltip="ranked map amount" label={formatNumber(bsUserWithStats.stats?.rankedMaps? bsUserWithStats.stats.rankedMaps : 0)}>
                        <RankedIcon/>
                    </LabelWithIcon>
                    <LabelWithIcon tooltip="total map amount" label={formatNumber(bsUserWithStats.stats.totalMaps)}>
                        <FaMapMarkedAlt/>
                    </LabelWithIcon>
                </div>
                <div className="flex justify-between">
                    <LabelWithIcon tooltip="total up vote" label={formatNumber(bsUserWithStats.stats.totalUpvotes)}>
                        <ThumbUpIcon/>
                    </LabelWithIcon>

                    <LabelWithIcon  tooltip="total down vote" label={formatNumber(bsUserWithStats.stats.totalDownvotes)}>
                        <ThumbDownIcon/>
                    </LabelWithIcon>
                </div>
                <div className="flex items-center justify-between">
                    <Progress.Root className="relative overflow-hidden rounded-full w-full h-2 bg-gray-100" value={rating}>
                    <Progress.Indicator
                        className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                        style={{ transform: `translateX(-${100 - rating}%)` }}
                    />
                    </Progress.Root>
                    <div className="pl-4 font-medium text-xs">{rating.toFixed(1)}%</div>
                </div>
            </div>
            <div className="flex justify-between">

            {
                bsUserWithStats.stats.firstUpload && 
                <Tooltip content="First Map Uploaded At">
                    <div
                    className="flex space-x-2  cursor-default text-gray-400 text-xs"
                    >Since: {dayjs(bsUserWithStats.stats.firstUpload).format('YYYY-MM-DD')}
                    </div>
                </Tooltip>
            }
            {
                bsUserWithStats.stats.lastUpload && 
                <Tooltip content="Last Map Uploaded At" asChild>
                    <div
                    className="flex space-x-2  cursor-default text-gray-400 text-xs"
                    >Last: {dayjs(bsUserWithStats.stats.lastUpload).fromNow()}
                    </div>
                </Tooltip>
            }
            </div>
          </Card.CardContent>
        </Card.Card>
        </>
    )
}