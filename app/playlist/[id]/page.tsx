'use client'
import { usePagingBSPlaylist } from "@/hooks/api/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylistSideBar from "@/components/BSPlaylistSideBar";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import BSPlaylistQueryCard from "@/components/BSPlaylistQueryCard";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import BSPlaylistSkeleton from "@/components/BSPlaylistSkeleton";
import { usePagingBSPlaylistDetail } from "@/hooks/api/usePagingBSPlaylistDetail";
import BSMapSkeleton from "@/components/BSMapSkeleton";
import { BSBeatMap } from "@/interfaces/beatmap";
import BSMap from "@/components/BSMap";
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
import * as Progress from "@radix-ui/react-progress";
import {escapeHtml} from "@/lib/ContentEscape";
export default function Home({ params }: { params: { id: string } }) {
    const { playlist,maps,isLoadingMore,error,isEmpty,hasMore,loadMore} = usePagingBSPlaylistDetail(params.id);
    const router = useRouter()
    if(error) {
      router.push("/")
    }
    const [top,setTop] = useState(0);
    // handler inifinite scroll
    const handleScroll = useCallback(() => {
        setTop(document.documentElement.scrollTop);
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          if (isLoadingMore || isEmpty || !hasMore) return;
          loadMore();
        }
      }, [isLoadingMore, isEmpty, hasMore,loadMore]);
  
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [handleScroll]);

      const handleScrollToTop = useCallback(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
      }, []);
      const containerVariants = {
        hidden: { opacity: 0, y: "100vw" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12]
      return (
        <div className="max-w-[1200px]">
          <div  className="block lg:hidden mb-2">
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
                        <Progress.Root
                          className="relative overflow-hidden rounded-full w-full h-2 my-2 bg-gray-300"
                          value={playlist!.stats.avgScore * 100}>
                          <Progress.Indicator
                            className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                            style={{transform: `translateX(-${100 - playlist!.stats.avgScore * 100}%)`}}
                          />
                        </Progress.Root>
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
                      {/*<p className="text-ellipsis overflow-hidden text-xs hidden sm:block">*/}
                      {/*  {playlist?.description == "" ? "No description" : playlist?.description}*/}
                      {/*</p>*/}
                    </div>

                  </div>
                  <p
                    className="text-ellipsis overflow-hidden text-xs block sm:hidden"
                    dangerouslySetInnerHTML={{__html: playlist?.description == "" ? "No description" : escapeHtml(playlist?.description ?? "")}}
                  />
                  {/*<p className="text-ellipsis overflow-hidden text-xs block sm:hidden">*/}
                  {/*  {playlist?.description == "" ? "No description" : playlist?.description }*/}
                  {/*</p>*/}
                </>
              )
            }

          </div>
          <div className="flex grow  space-x-2">
            <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 md:grid-cols-2 grow">
              {
                maps.length == 0 && isLoadingMore && (
                  skeleton.map((i: number) =>
                    <BSMapSkeleton key={`${i}`}/>)
                )

              }
              {
                maps.map((map: BSBeatMap) => {
                  return (
                    <BSMap key={map.id} bsMap={map}/>
                  );
                })
              }
              {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
              {isLoadingMore && <Loading/>}
            </div>

            <div className="hidden lg:flex sticky top-20 justify-center grow-0 h-fit">
              {
                playlist && (
                  <BSPlaylistSideBar bsPlaylist={playlist}/>
                )

              }
              {
                !playlist && (
                  <div>loading</div>
                )
              }

              {top > 100 && (<motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{scale: 1.1}}
                className={`fixed ml-auto bottom-2 rounded-full bg-gray-200 dark:bg-gray-700 p-2 cursor-pointer `}
                onClick={handleScrollToTop}>
                <div>
                  <FaArrowUp/>
                </div>
              </motion.div>)
              }</div>

          </div>
        </div>
      )
}
    