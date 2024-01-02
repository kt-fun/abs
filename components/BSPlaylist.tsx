'use client'
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import Image from 'next/image'
import DateLabel from "@/components/labels/DateLabel";
import BSUserLabel from "@/components/labels/BSUserLabel";
import {Text, Theme} from "@radix-ui/themes"
import ThumbUpLabel from "./labels/ThumbUpLabel";
import ThumbDownLabel from "./labels/ThumbDownLabel";
import DurationLabel from "./labels/DurationLabel";
import * as Progress from "@radix-ui/react-progress";
import BSMapAmountLabel from "./labels/BSMapAmount";
import { CiStar } from "react-icons/ci";
export default function BSPlaylist(
    {bsPlaylist}:{bsPlaylist:IBSPlaylist}
){
    const score = bsPlaylist.stats.upVotes/(bsPlaylist.stats.upVotes+bsPlaylist.stats.downVotes) * 100.0
    const bg = `url('${bsPlaylist.playlistImage}')`
    return (
        <>
        <a className="group">
            <div className="flex flex-col xl:w-[256px] h-full w-[320px] rounded-md border-red-100">
                <div
                className="relative w-[320px] h-[320px] rounded-t-md z-0"
                style={{
                    backgroundImage: bg,
                    backgroundSize: 'cover',
                }}>
            <div className="z-100 w-[320px] h-[320px] bg-black/[.6] group-hover:visible invisible rounded-t-md bg-blend-darken">
                <Theme
                
                >
                    <Progress.Root className="relative overflow-hidden rounded-full w-32 h-2 mx-2 bg-gray-100" value={bsPlaylist.stats.avgScore*100}>
                        <Progress.Indicator
                            className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                            style={{ transform: `translateX(-${100 - bsPlaylist.stats.avgScore*100}%)` }}
                        />
                        </Progress.Root>
                </Theme>
                            <div>
                            <ThumbUpLabel likeCnt={bsPlaylist.stats.upVotes}/>
                            <ThumbDownLabel dislikeCnt={bsPlaylist.stats.downVotes}/>                    
                            <DurationLabel duration={bsPlaylist.stats.totalDuration}/>
                            </div>        
                        </div>
                
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                    {bsPlaylist.name}
                    </span>
                    <BSUserLabel user={bsPlaylist.owner}/>
                </div>
                
                <div className="flex items-center justify-between pr-2 ">
                        <DateLabel date={bsPlaylist.updatedAt} size={"1"}/>
                        <div className="flex items-center space-x-1 text-center">
                            <BSMapAmountLabel amount={bsPlaylist.stats.totalMaps}  size={"1"}/>
                            <div className="flex items-center">
                                <CiStar/>
                                <Text className="pl-1" size="1" weight="medium">{(bsPlaylist.stats.avgScore*100).toFixed(1)}%</Text>
                            </div>
                        </div>


                </div>
            </div>
        </a>
        </>
    )
}