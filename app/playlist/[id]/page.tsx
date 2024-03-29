'use client'
import React from "react";
import { motion } from "framer-motion";
import { usePagingBSPlaylistDetail } from "@/hooks/api/usePagingBSPlaylistDetail";
import { BSBeatMap } from "@/interfaces/beatmap";
import BSMap from "@/components/bsmap";
import { useRouter } from "next/navigation";
import {Loading,ReachListEnd,EmptyContent} from "@/components/shared/load-status";
import BSLabel, {BSMapCountLabel} from "@/components/shared/labels/BSLabel";
import * as MapMetaLabel from "@/components/shared/labels/BSMapMetaLabels";
import BSUserLabel from "@/components/shared/labels/BSUserLabel";
import {DateLabel} from "@/components/shared/labels/BSMapMetaLabels";
import {IoCloudDownloadOutline, IoSpeedometerOutline} from "react-icons/io5";
import {Tooltip} from "@/components/ui/tooltip";
import Link from "@/components/ui/link";
import {HiCursorClick} from "react-icons/hi";
import {escapeHtml} from "@/lib/ContentEscape";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import {Progress} from "@/components/shared/Progress";
import {useTranslation} from "@/hooks/useTranslation";

const Label = ({
 label, content
}: {
  label: string,
  content: string
}) => {
  return (<div className="font-medium text-xs flex flex-col items-center cursor-default">
    <span className={"text-xs opacity-50"}>{label}</span>
    <span>{content}</span>
  </div>)
}
export default function Home({ params }: { params: { id: string } }) {
    const { playlist,maps,isLoadingMore,error,isEmpty,hasMore,loadMore} = usePagingBSPlaylistDetail(params.id);
    const router = useRouter()
    if(error) {
      console.log(error)
      router.push("/")
    }
    const {t} = useTranslation('page.playlist')

      return (
        <div className="max-w-[1024px]">
          <div  className="flex flex-col mb-2">
            {
              !isLoadingMore && !isEmpty && playlist && (
                <>
                  <div className={"flex relative sm:flex-row flex-col"}>
                    <img
                      className="w-full inset-0 sm:h-[200px] sm:w-[200px] aspect-square rounded-lg"
                      src={playlist?.playlistImage512}
                      loading={"lazy"}
                    />
                    <div>
                      <div
                        className={"px-2 grid w-full sm:w-auto grid-cols-2 grid-rows-2 sm:grid-cols-2 sm:grid-rows-3 items-center justify-center content-center"}>
                        <span className="font-semibold text-lg order-1 line-clamp-2 text-ellipsis sm:col-span-2">
                            {playlist?.name}
                        </span>
                        <BSUserLabel
                          user={playlist!.owner}
                          className={"justify-self-end sm:justify-self-start sm:col-span-1 order-2"}/>
                        <BSLabel
                          className={"justify-self-start flex sm:col-span-1 sm:order-4 order-3 px-2"}
                          label={`${playlist?.stats?.minNps?.toFixed(1)} - ${playlist?.stats?.maxNps.toFixed(1)}`}
                          tooltip={t("detail.tooltip.nps-range")}>
                          <IoSpeedometerOutline/>
                        </BSLabel>
                        <DateLabel date={playlist!.updatedAt} className={"justify-self-end px-2 sm:justify-self-start order-4 sm:order-3"}/>
                      </div>
                      <p
                        className="text-ellipsis overflow-hidden text-xs p-2 hidden sm:block sm:col-span-2"
                        dangerouslySetInnerHTML={{__html: playlist?.description == "" ? t("detail.empty-description") : escapeHtml(playlist?.description ?? "")}}
                      />
                    </div>

                  </div>
                  <p
                    className="text-ellipsis overflow-hidden text-xs p-2 block sm:hidden"
                    dangerouslySetInnerHTML={{__html: playlist?.description == "" ? t("detail.empty-description") : escapeHtml(playlist?.description ?? "")}}
                  />

                  <div className="py-1 px-2 flex items-center w-full justify-between flex-col sm:flex-row">

                      <div className="grid grid-cols-4 gap-1 order-2 sm:order-1">
                        <Label label={t("detail.label.total-map")} content={playlist!.stats?.totalMaps?.toString()}/>
                        <Label label={t("detail.label.avg-score")} content={(playlist!.stats?.avgScore * 100).toFixed(1) + "%"}/>
                        <Label label={t("detail.label.like")} content={playlist!.stats?.upVotes?.toString()}/>
                        <Label label={t("detail.label.dislike")} content={playlist!.stats?.downVotes?.toString()}/>
                      </div>
                      <div className="flex items-center space-x-1 order-1 sm:order-2 self-end sm:self-auto">
                        <Tooltip content={t('detail.tooltip.download')} asChild>
                          <Link href={playlist!.downloadURL}
                                className="hover:bg-white hover:text-red-400 p-1 rounded-full w-6 h-6 text-inherit">
                            <IoCloudDownloadOutline/>
                          </Link>
                        </Tooltip>
                        <Tooltip content={t('detail.tooltip.one-click')} asChild>
                          <Link
                            href={`bsplaylist://playlist/${playlist!.downloadURL}/beatsaver-${playlist!.playlistId}.bplist`}
                            className="hover:bg-white hover:text-red-400 p-1 rounded-full w-6 h-6 text-inherit">
                            <HiCursorClick/>
                          </Link>
                        </Tooltip>
                      </div>

                  </div>

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
    