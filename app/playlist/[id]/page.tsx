'use client'
import BSPlaylistSideBar from "@/components/BSPlaylistSideBar";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { usePagingBSPlaylistDetail } from "@/hooks/api/usePagingBSPlaylistDetail";
import { BSBeatMap } from "@/interfaces/beatmap";
import BSMap from "@/components/bsmap";
import { useRouter } from "next/navigation";
import Loading from "@/components/load-status/Loading";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import BSLabel, {BSMapCountLabel} from "@/components/labels/BSLabel";
import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import BSUserLabel from "@/components/labels/BSUserLabel";
import {DateLabel} from "@/components/labels/BSMapMetaLabels";
import {IoCloudDownloadOutline, IoSpeedometerOutline} from "react-icons/io5";
import {Tooltip} from "@/components/ui/tooltip";
import Link from "@/components/ui/link";
import {HiCursorClick} from "react-icons/hi";
import {escapeHtml} from "@/lib/ContentEscape";
import {containerVariants, listItemVariants} from "@/components/variants";
import EmptyContent from "@/components/load-status/EmptyContent";
import {Progress} from "@/components/Progress";
export default function Home({ params }: { params: { id: string } }) {
    const { playlist,maps,isLoadingMore,error,isEmpty,hasMore,loadMore} = usePagingBSPlaylistDetail(params.id);
    const router = useRouter()
    if(error) {
      console.log(error)
      router.push("/")
    }

      return (
        <div className="max-w-[1024px]">
          <div  className="block mb-2">
            {
              !isLoadingMore && !isEmpty && playlist && (
                <>
                  <div className="flex justify-start">
                    <div
                      className="h-[164px] w-[164px] sm:h-[200px] sm:w-[200px] aspect-square rounded-lg"
                      style={{
                        backgroundImage: `url('${playlist?.playlistImage512}')`,
                        backgroundSize: 'cover',
                      }}
                    />
                    <div className="pl-2 w-full max-w-64">
                      <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg line-clamp-3 text-ellipsis">
                      {playlist?.name}
                  </span>
                      </div>
                      <div className="">
                        <div className="font-medium text-xs">
                          <BSUserLabel user={playlist!.owner}/>
                          <DateLabel date={playlist!.updatedAt}/>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <BSMapCountLabel count={playlist!.stats!.totalMaps}/>
                        <MapMetaLabel.BSRatingLabel rate={playlist!.stats!.avgScore}/>
                        <MapMetaLabel.ThumbUpCountLabel count={playlist!.stats!.upVotes}/>
                        <MapMetaLabel.ThumbDownCountLabel count={playlist!.stats!.downVotes}/>
                      </div>
                      <div className="flex justify-between px-2 items-center">
                        <Progress score={playlist!.stats.avgScore * 100} />
                        <p className="pl-1 font-medium text-xs">{(playlist!.stats.avgScore * 100).toFixed(1)}%</p>
                      </div>
                      <div className="py-1 flex items-center space-x-1 justify-between">
                        <div>
                          <BSLabel
                            label={`${playlist?.stats!.minNps.toFixed(1)} - ${playlist!.stats.maxNps.toFixed(1)}`}
                            tooltip="min nps to max nps">
                            <IoSpeedometerOutline/>
                          </BSLabel>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tooltip content="download as .bplist" asChild>
                            <Link href={playlist!.downloadURL}
                                  className="hover:bg-white hover:text-red-400 p-1 rounded-full w-6 h-6 text-inherit">
                              <IoCloudDownloadOutline/>
                            </Link>
                          </Tooltip>
                          <Tooltip content="one click download" asChild>
                            <Link
                              href={`bsplaylist://playlist/${playlist!.downloadURL}/beatsaver-${playlist!.playlistId}.bplist`}
                              className="hover:bg-white hover:text-red-400 p-1 rounded-full w-6 h-6 text-inherit">
                              <HiCursorClick/>
                            </Link>
                          </Tooltip>
                        </div>

                      </div>
                      <p
                        className="text-ellipsis overflow-hidden text-xs hidden sm:block"
                        dangerouslySetInnerHTML={{__html: playlist?.description == "" ? "No description" : escapeHtml(playlist?.description ?? "")}}
                      />
                    </div>
                  </div>
                  <p
                    className="text-ellipsis overflow-hidden text-xs block sm:hidden"
                    dangerouslySetInnerHTML={{__html: playlist?.description == "" ? "No description" : escapeHtml(playlist?.description ?? "")}}
                  />
                </>
              )
            }

          </div>
          <div className="flex grow  space-x-2">
            <motion.ul
              variants={containerVariants}
              initial={'hidden'}
              animate={'show'}
              className="grid gap-2 grid-cols-1 md:grid-cols-2 grow px-2 relative"
            >
              {
                maps.map((map: BSBeatMap, i: number) => {
                  return (
                    <BSMap
                      // todo fix key issue, cause by data repeat
                      key={map.id}
                      variants={listItemVariants}
                      custom={i}
                      bsMap={map}
                    />
                  );
                })
              }
              {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
              {isEmpty && !hasMore && !isLoadingMore && <EmptyContent className={'col-span-2'}/>}
              {isLoadingMore && <Loading className={'col-span-2'}/>}
            </motion.ul>
          </div>
        </div>
      )
}
    