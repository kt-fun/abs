import React from "react";
import {HTMLMotionProps} from "framer-motion";
import {BSPlaylist} from "@/interfaces/bs-playlist";
import * as MapMetaLabel from "@/components/shared/labels/BSMapMetaLabels";
import BSLabel, {BSMapCountLabel} from "@/components/shared/labels/BSLabel";
import * as Progress from "@radix-ui/react-progress";
import {IoCloudDownloadOutline, IoSpeedometerOutline} from "react-icons/io5";
import {Tooltip} from "@/components/ui/tooltip";
import {IconButton} from "@/components/ui/button";
import Link from "@/components/ui/link";
import {HiCursorClick} from "react-icons/hi";
import {cn} from "@/lib/utils";

const BSPlaylistOverviewHiddenInfo = React.forwardRef((
  {
    bsPlaylist,
    ...rest
  }:{
    bsPlaylist:BSPlaylist,
  } &HTMLMotionProps<'div'>,
  ref
) => {
  const npsRange = `${bsPlaylist.stats?.minNps?.toFixed(1)} - ${bsPlaylist.stats?.maxNps?.toFixed(1)}`
  return (
    <div
      ref={ref as any}

      className={
      cn(
        "bg-black/[.6] h-full group-hover:visible invisible rounded-t-lg bg-blend-darken",
              rest.className
        )
      }>
      <div className="flex flex-col justify-between  h-full pt-auto pb-0 dark bg-transparent rounded-t-lg text-white">
        <div>
          <p className="text-xs text-ellipsis overflow-hidden m-2 line-clamp-[7]">
            {bsPlaylist.description == "" ? "No description" : bsPlaylist.description}
          </p>
        </div>
        <div>
          <div>
            <div className="flex justify-between px-2 text-white">
              <MapMetaLabel.DurationLabel duration={bsPlaylist.stats?.totalDuration??0} tooltip="total duration"/>
              <BSMapCountLabel count={bsPlaylist.stats?.totalMaps??0} tooltip="total map amount"/>
            </div>
            <div className="flex justify-between px-2">
              <MapMetaLabel.ThumbUpCountLabel count={bsPlaylist.stats?.upVotes??0} tooltip="total upvote"/>
              <MapMetaLabel.ThumbDownCountLabel count={bsPlaylist.stats?.downVotes??0} tooltip="total down vote"/>
            </div>
          </div>
          <div className="flex justify-between px-2 items-center">
            <Progress.Root className="relative overflow-hidden rounded-full w-full h-2 mx-2 my-2 bg-gray-100"
                           value={bsPlaylist.stats?.avgScore * 100??0}>
              <Progress.Indicator
                className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                style={{transform: `translateX(-${100 - bsPlaylist.stats?.avgScore * 100??0}%)`}}
              />
            </Progress.Root>
            <p className="pl-1 font-semibold text-xs">{(bsPlaylist.stats?.avgScore * 100??0).toFixed(1)}%</p>
          </div>
          <div className=" px-3 flex items-center space-x-1 justify-between pb-1">
            <div>
              <BSLabel label={npsRange} tooltip="min nps to max nps">
                <IoSpeedometerOutline/>
              </BSLabel>
            </div>
            <div className="flex items-center space-x-1">
              <Tooltip content="download zip" asChild>
                <IconButton
                  className="w-4 h-4  sm:w-6 sm:h-6 text-white hover:bg-white hover:text-red-400  p-1 rounded-full"
                  variant="ghost">
                  <Link href={bsPlaylist.downloadURL} className="text-inherit">
                    <IoCloudDownloadOutline/>
                  </Link>
                </IconButton>

              </Tooltip>
              <Tooltip content="one click download" asChild>
                <IconButton
                  className="w-4 h-4  sm:w-6 sm:h-6  p-1 rounded-full  text-white hover:bg-white hover:text-red-400"
                  variant="ghost">
                  <Link
                    href={`bsplaylist://playlist/${bsPlaylist.downloadURL}/beatsaver-${bsPlaylist.playlistId}.bplist`}
                    className="text-inherit">
                    <HiCursorClick/>
                  </Link>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

BSPlaylistOverviewHiddenInfo.displayName = 'BSPlaylistOverviewHiddenInfo'

export default React.memo(BSPlaylistOverviewHiddenInfo)