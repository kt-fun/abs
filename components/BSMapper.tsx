'use client'
import RankedIcon from "@/components/icons/RankedIcon";
import ThumbDownIcon from "@/components/icons/ThumbDownIcon";
import ThumbUpIcon from "@/components/icons/ThumbUpIcon";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { formatNumber } from "@/lib/format";
import { FaMapMarkedAlt } from "react-icons/fa";
import * as Progress from '@radix-ui/react-progress';
import { Card,Avatar, Text, Link as RLink, Tooltip} from "@radix-ui/themes";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useState } from "react";
import { CiLight } from "react-icons/ci";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const LabelWithIcon = ({children, label,tooltip}:{children:React.ReactNode,label:string, tooltip?:string}) => {
    return (
        <Tooltip content={tooltip?tooltip:""}>
            <span className="flex items-center space-x-1 cursor-default">
                {children}
                <Text  size="2" weight="medium">{label}</Text>
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
    {bsUserWithStats}:{bsUserWithStats:BSUserWithStats}
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
        <Card className="min-w-64">
            <div className="flex">
                <Avatar
                    src={bsUserWithStats.avatar}
                    size="4"
                    className="m-2"
                    radius="full"
                    fallback={bsUserWithStats.name[0]} />
                <div>
                    <RLink>
                        <Link href={`/mapper/${bsUserWithStats.id}`}>
                        <Text 
                        size="4"
                        weight="medium"
                        >{bsUserWithStats.name}</Text>
                        </Link>
                    </RLink>
                    <Text
                    size="1"
                    className="overflow-ellipsis line-clamp-2 pr-2"
                    color="gray"
                    dangerouslySetInnerHTML={{__html:getDescription(bsUserWithStats.description)}}
                    // todo
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
                    <Text className="pl-4" size="2" weight="medium">{rating.toFixed(1)}%</Text>
                </div>
            </div>
            <div className="flex justify-between">

            {
                bsUserWithStats.stats.firstUpload && 
                <Tooltip content="First Map Uploaded At">
                    <Text
                    size="1"
                    color="gray"
                    className="flex space-x-2  cursor-default"
                    >Since: {dayjs(bsUserWithStats.stats.firstUpload).format('YYYY-MM-DD')}
                    </Text>
                </Tooltip>
            }
            {
                bsUserWithStats.stats.lastUpload && 
                <Tooltip content="Last Map Uploaded At">
                    <Text
                    size="1"
                    color="gray"
                    className="flex space-x-2 cursor-default"
                    >Last: {dayjs(bsUserWithStats.stats.lastUpload).fromNow()}
                    </Text>
                </Tooltip>
            }
            </div>

        </Card>
        </>
    )
}