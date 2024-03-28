'use client'
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSUserLabel from "@/components/shared/labels/BSUserLabel";
import * as MapMetaLabel from "@/components/shared/labels/BSMapMetaLabels";
import { Tooltip } from "@/components/ui/tooltip";
import  {Card} from "@/components/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { CiStar } from "react-icons/ci";
import Link from "@/components/ui/link";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoSpeedometerOutline } from "react-icons/io5";
import { HiCursorClick } from "react-icons/hi";
import BSLabel, {BSMapCountLabel} from "@/components/shared/labels/BSLabel";
import {IconButton} from "@/components/ui/button";
import React from "react";
export default function BSPlaylistV1(
    {bsPlaylist}:{bsPlaylist:IBSPlaylist}
){
    const bg = `url('${bsPlaylist.playlistImage}')`


    const npsRange = `${bsPlaylist.stats.minNps.toFixed(1)} - ${bsPlaylist.stats.maxNps.toFixed(1)}`
    return (
        <>
            <Card className="mx-auto group flex flex-col w-[320px] h-full xl:w-[256px] rounded-lg">
                <div
                className="relative h-[320px] xl:h-[256px] z-0 rounded-t-lg"
                style={{
                    backgroundImage: bg,
                    backgroundSize: 'cover',
                }}>
                    <div className="z-100 bg-black/[.6] h-full group-hover:visible invisible rounded-t-lg bg-blend-darken">
                        <div className="flex flex-col justify-between  h-full pt-auto pb-0 dark bg-transparent rounded-t-lg text-white">
                                <div>
                                <p className="text-xs text-ellipsis overflow-hidden m-2 line-clamp-[7]">
                                    {bsPlaylist.description == "" ? "No description" : bsPlaylist.description}
                                </p>
                                </div>
                                <div>
                                    <div>
                                        <div className="flex justify-between px-2 text-white">
                                            <MapMetaLabel.DurationLabel duration={bsPlaylist.stats.totalDuration} tooltip="total duration"/>
                                            <BSMapCountLabel count={bsPlaylist.stats.totalMaps} tooltip="total map amount"/>
                                        </div>
                                    <div className="flex justify-between px-2">
                                        <MapMetaLabel.ThumbUpCountLabel count={bsPlaylist.stats.upVotes} tooltip="total upvote"/>
                                        <MapMetaLabel.ThumbDownCountLabel count={bsPlaylist.stats.downVotes} tooltip="total down vote"/>
                                    </div>
                                    </div>
                                    <div className="flex justify-between px-2 items-center">
                                        <Progress.Root className="relative overflow-hidden rounded-full w-full h-2 mx-2 my-2 bg-gray-100" value={bsPlaylist.stats.avgScore*100}>
                                            <Progress.Indicator
                                                className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                                                style={{ transform: `translateX(-${100 - bsPlaylist.stats.avgScore*100}%)` }}
                                            />
                                        </Progress.Root>
                                        <p className="pl-1 font-semibold text-xs">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</p>
                                    </div>

                                    <div className=" px-3 flex items-center space-x-1 justify-between pb-1">
                                        <div>
                                            <BSLabel label={npsRange} tooltip="min nps to max nps">
                                                <IoSpeedometerOutline  />
                                            </BSLabel>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Tooltip content="download zip" asChild>
                                                <IconButton className="w-4 h-4  sm:w-6 sm:h-6 text-white hover:bg-white hover:text-red-400  p-1 rounded-full"
                                                            variant="ghost">
                                                    <Link href={bsPlaylist.downloadURL} className="text-inherit">
                                                        <IoCloudDownloadOutline/>
                                                    </Link>
                                                </IconButton>

                                            </Tooltip>
                                            <Tooltip content="one click download" asChild>
                                                <IconButton className="w-4 h-4  sm:w-6 sm:h-6  p-1 rounded-full  text-white hover:bg-white hover:text-red-400" variant="ghost">
                                                    <Link href={`bsplaylist://playlist/${bsPlaylist.downloadURL}/beatsaver-${bsPlaylist.playlistId}.bplist`} className="text-inherit">
                                                        <HiCursorClick/>
                                                    </Link>
                                                </IconButton>
                                            </Tooltip>
                                        </div>

                                    </div>
                                </div>
                    </div>
                    </div>
                </div>

                <div className="flex justify-between items-center px-2 ">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                        <Link href={`/playlist/${bsPlaylist.playlistId}`}>
                        {bsPlaylist.name}
                        </Link>
                    </span>
                    <BSUserLabel user={bsPlaylist.owner} className=""/>
                </div>

                <div className="flex items-center justify-between pb-2 px-2">
                        <MapMetaLabel.DateLabel date={bsPlaylist.updatedAt}/>
                        <div className="flex items-center space-x-1 text-center">
                            <BSMapCountLabel count={bsPlaylist.stats.totalMaps}/>
                            <div className="flex items-center">
                                <CiStar/>
                                <div className="pl-1 font-medium text-xs">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</div>
                            </div>
                        </div>
                </div>
            </Card>
        </>
    )
}