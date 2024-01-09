'use client'
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import Image from 'next/image'
import DateLabel from "@/components/labels/DateLabel";
import BSUserLabel from "@/components/labels/BSUserLabel";
import {Card, IconButton, Inset, ScrollArea, Text, Theme} from "@radix-ui/themes"
import ThumbUpLabel from "./labels/ThumbUpLabel";
import ThumbDownLabel from "./labels/ThumbDownLabel";
import DurationLabel from "./labels/DurationLabel";
import * as Progress from "@radix-ui/react-progress";
import BSMapAmountLabel from "./labels/BSMapAmount";
import { CiStar } from "react-icons/ci";
import NextLink from "next/link";
import {Link} from "@radix-ui/themes";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoSpeedometerOutline } from "react-icons/io5";
import { HiCursorClick } from "react-icons/hi";
import BSLabel from "./labels/BSLabel";
import { Tooltip } from "@radix-ui/themes";
import { Rat } from "lucide-react";
import RatingLabel from "./labels/RatingLabel";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";


export default function BSMapperSideBar(
    {bsMapper}:{bsMapper:BSUserWithStats}
){
    return (
        <>
        <Card className=" group flex flex-col w-[320px] xl:w-[256px]" >
                <Inset clip="padding-box" side="top" pb="current">
                    <div
                    className="relative h-[320px] xl:h-[256px] z-0"
                    style={{
                        backgroundImage: `url('${bsMapper.avatar}')`,
                        backgroundSize: 'cover',
                    }}>
                    </div>
                </Inset>

                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-3 text-ellipsis">
                        {bsMapper.name}
                    </span>
                </div>
                <div className="">
                    <div className="font-semibold text-md">
                        followers: {bsMapper.followData!.followers}
                    </div>
                    {
                        bsMapper.followData!.follows &&
                        <span className="font-semibold text-md">
                        following: {bsMapper.followData!.follows}
                        </span>
                    }
                </div>
                    <div className="grid grid-cols-2 gap-1">
                        <BSMapAmountLabel size="2" amount={bsMapper.stats!.totalMaps}/>
                        <RatingLabel size="2" rate={bsMapper.stats!.avgScore/100}/>
                        <ThumbUpLabel  size="2" likeCnt={bsMapper.stats!.totalUpvotes}/>
                        <ThumbDownLabel size="2" dislikeCnt={bsMapper.stats!.totalDownvotes}/>
                    </div>
                <div className="">
                        <div className="flex flex-col justify-between  h-full pt-auto pb-0">
                            <div>
                                <Text as="p" size="2" className="text-ellipsis overflow-hidden m-2">
                                    {bsMapper.description == "" ? "No description" : bsMapper.description}
                                </Text>
                            </div>
                        </div>

                </div>
            </Card>
        </>
    )
}