'use client'
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSUserLabel from "@/components/shared/labels/BSUserLabel";
import * as MapMetaLabel from "@/components/shared/labels/BSMapMetaLabels";
import  {Card} from "@/components/ui/card";
import { CiStar } from "react-icons/ci";
import Link from "@/components/ui/link";
import BSLabel, {BSMapCountLabel} from "@/components/shared/labels/BSLabel";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";
import BSPlaylistOverviewHiddenInfo from "@/components/bsplaylist/hoverInfo";
export default function BSPlaylist(
  {bsPlaylist}:{bsPlaylist:IBSPlaylist}
){
  const bg = bsPlaylist.playlistImage

  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };
  return (
    <>
      <Card className="mx-auto group flex flex-col w-[320px] xl:w-[256px] rounded-lg relative border-none shadow-none">
        <motion.div
          layout
          className={
            cn(
              'aspect-square relative',
              'w-[320px] xl:w-[256px] aspect-square group rounded-lg',
            )
          }
        >
          <motion.img
            layout
            onLoad={imageLoaded}
            animate={{
              height: imageLoading ? "16rem" : "auto",
              opacity: imageLoading ? 0 : 1
            }}
            transition={{
              duration: 0.5
            }}
            loading="lazy" src={bg} className={cn(
            'object-cover',
            'w-[320px] xl:w-[256px] group rounded-lg absolute shadow-none border-none bg-transparent aspect-square',
            // isDetailMode && 'w-full aspect-square sm:w-[300px] rounded-lg basis-full max-w-[300px] relative'
          )}/>
          <BSPlaylistOverviewHiddenInfo
            // layout
            bsPlaylist={bsPlaylist}
            className={"absolute w-full"}
            // isDetailMode={isDetailMode}
          />
        </motion.div>
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
            <BSMapCountLabel count={bsPlaylist.stats?.totalMaps}/>
            <div className="flex items-center">
              <CiStar/>
              <div className="pl-1 font-medium text-xs">{(bsPlaylist.stats?.avgScore * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}