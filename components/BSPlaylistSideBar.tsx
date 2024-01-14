'use client'
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import {DateLabel} from "@/components/labels/BSMapMetaLabels";
import BSUserLabel from "@/components/labels/BSUserLabel";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import * as Progress from "@radix-ui/react-progress";
import Link from "@/components/ui/link";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoSpeedometerOutline } from "react-icons/io5";
import { HiCursorClick } from "react-icons/hi";
import BSLabel, {BSMapCountLabel} from "./labels/BSLabel";
export default function BSPlaylistSideBar(
    {bsPlaylist}:{bsPlaylist:IBSPlaylist}
){
    const score = bsPlaylist.stats.upVotes/(bsPlaylist.stats.upVotes+bsPlaylist.stats.downVotes) * 100.0
    const bg = `url('${bsPlaylist.playlistImage512}')`
    const npsRange = `${bsPlaylist.stats.minNps.toFixed(1)} - ${bsPlaylist.stats.maxNps.toFixed(1)}`
    return (
        <>
        <Card className=" group flex flex-col w-[256px] xl:w-[256px] rounded-lg">
                <div
                    className="h-[256px] xl:h-[256px] z-0 rounded-t-lg"
                    style={{
                        backgroundImage: bg,
                        backgroundSize: 'cover',
                    }}>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                        {/*<Link href={`/playlist/${bsPlaylist.playlistId}`}>*/}
                        {bsPlaylist.name}
                        {/*</Link>*/}
                    </span>
                </div>

                <BSUserLabel user={bsPlaylist.owner}/>
                <DateLabel date={bsPlaylist.updatedAt}/>
                <div className="">
                        <div className="flex flex-col justify-between  h-full pt-auto pb-0">
                            <p className="text-ellipsis overflow-hidden m-2 line-clamp-[7] text-xs">
                                    {bsPlaylist.description == "" ? "No description" : bsPlaylist.description}
                            </p>
                            <div>
                                <div>
                                    <div className="flex justify-between px-2">
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
                                    <p className="pl-1 font-medium text-xs">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</p>
                                </div>

                                <div className="py-1 px-3 flex items-center space-x-1 justify-between">
                                    <div>
                                        <BSLabel label={npsRange} tooltip="min nps to max nps">
                                            <IoSpeedometerOutline  />
                                        </BSLabel>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Tooltip content="download as .bplist">
                                        <Link href={bsPlaylist.downloadURL}  className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                                <IoCloudDownloadOutline  />
                                        </Link>
                                        </Tooltip>
                                        <Tooltip content="one click download">
                                            <Link href={`bsplaylist://playlist/${bsPlaylist.downloadURL}/beatsaver-${bsPlaylist.playlistId}.bplist`} className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                                <HiCursorClick  />
                                            </Link>
                                        </Tooltip>
                                    </div>

                                </div>
                            </div>
                        </div>

                </div>
            </Card>
        </>
    )
}