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
export default function BSPlaylist(
    {bsPlaylist}:{bsPlaylist:IBSPlaylist}
){
    const score = bsPlaylist.stats.upVotes/(bsPlaylist.stats.upVotes+bsPlaylist.stats.downVotes) * 100.0
    const bg = `url('${bsPlaylist.playlistImage}')`


    const npsRange = `${bsPlaylist.stats.minNps.toFixed(1)} - ${bsPlaylist.stats.maxNps.toFixed(1)}`
    return (
        <>
            <Card className=" group flex flex-col w-[320px] h-full xl:w-[256px]" >
                <Inset clip="padding-box" side="top" pb="current">
                    <div
                    className="relative h-[320px] xl:h-[256px] z-0"
                    style={{
                        backgroundImage: bg,
                        backgroundSize: 'cover',
                    }}>
                        <div className="z-100 bg-black/[.6] h-full group-hover:visible invisible  bg-blend-darken">
                            <Theme appearance="dark" className="bg-transparent h-full">
                                <div className="flex flex-col justify-between  h-full pt-auto pb-0">
                                    <div>
                                        <Text as="p" size="1" className="text-ellipsis overflow-hidden m-2 line-clamp-[7]">
                                            {bsPlaylist.description == "" ? "No description" : bsPlaylist.description}
                                        </Text>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="flex justify-between px-2">
                                                <DurationLabel size="5" duration={bsPlaylist.stats.totalDuration} tooltip="total duration"/>
                                                <BSMapAmountLabel size="5" amount={bsPlaylist.stats.totalMaps} tooltip="total map amount"/>
                                            </div>
                                        <div className="flex justify-between px-2">
                                            <ThumbUpLabel size="5" likeCnt={bsPlaylist.stats.upVotes} tooptip="total upvote"/>
                                            <ThumbDownLabel size="5" dislikeCnt={bsPlaylist.stats.downVotes} tooptip="total down vote"/>
                                        </div>
                                        </div>
                                        <div className="flex justify-between px-2 items-center">
                                            <Progress.Root className="relative overflow-hidden rounded-full w-full h-3 mx-2 my-2 bg-gray-100" value={bsPlaylist.stats.avgScore*100}>
                                                <Progress.Indicator
                                                    className=" h-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                                                    style={{ transform: `translateX(-${100 - bsPlaylist.stats.avgScore*100}%)` }}
                                                />
                                            </Progress.Root>
                                            <Text className="pl-1" size="5" weight="medium">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</Text>
                                        </div>

                                        <div className="py-1 px-3 flex items-center space-x-1 justify-between">
                                            <div>
                                                <BSLabel label={npsRange} tooltip="min nps to max nps">
                                                    <IoSpeedometerOutline  />
                                                </BSLabel>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Tooltip content="download as .bplist">
                                                <NextLink href={bsPlaylist.downloadURL}  className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                                        <IoCloudDownloadOutline  />
                                                </NextLink>
                                                </Tooltip>
                                                <Tooltip content="one click download">
                                                    <NextLink href={`bsplaylist://playlist/${bsPlaylist.downloadURL}/beatsaver-${bsPlaylist.playlistId}.bplist`} className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                                        <HiCursorClick  />
                                                    </NextLink>
                                                </Tooltip>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </Theme>
                        </div>
                    </div>
                </Inset>

                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                        <NextLink href={`/playlist/${bsPlaylist.playlistId}`}>
                        <Link>{bsPlaylist.name}</Link>
                        </NextLink>
                    </span>
                    <BSUserLabel user={bsPlaylist.owner}/>
                </div>

                <div className="flex items-center justify-between pr-2">
                        <DateLabel date={bsPlaylist.updatedAt} size={"1"}/>
                        <div className="flex items-center space-x-1 text-center">
                            <BSMapAmountLabel amount={bsPlaylist.stats.totalMaps}  size={"1"}/>
                            <div className="flex items-center">
                                <CiStar/>
                                <Text className="pl-1" size="1" weight="medium">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</Text>
                            </div>
                        </div>
                </div>
            </Card>

        </>
    )
}