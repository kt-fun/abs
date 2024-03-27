'use client'
import { usePagingBSPlaylist } from "@/hooks/api/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/bsplaylist";
import React, { useCallback, useEffect, useState } from "react";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import Loading from "@/components/load-status/Loading";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import EmptyContent from "@/components/load-status/EmptyContent";
import {containerVariants, listItemVariants} from "@/components/variants";
import { motion } from "framer-motion";
import MapFilter from "@/components/filter/map-filter";
import PlaylistFilter from "@/components/filter/playlist-filter";
export default function Home() {
    const { playlists,isLoadingMore,isEmpty,hasMore,loadMore,refresh,queryParam,updateQuery} = usePagingBSPlaylist();
    const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
    useEffect(()=>{
      if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
        loadMore();
      }
    },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
      const skeleton = [1,2,3,4,5,6,7,8,9,10]
      return (
        <>
          <div className="flex justify-center grow">
            <div className="flex-col flex max-w-[1024px]  space-x-4  w-full">
                <div className={' bg-base-light dark:bg-base-dark'}>
                  <h1 className={"text-3xl font-bold"}>Playlists</h1>
                  <span className={"text-zinc-400 dark:text-zinc-300 text-xs"}>find playlist that you like</span>
                </div>
              {
                <PlaylistFilter
                  className={'sticky top-16 z-10 flex left-0 right-0 w-full bg-base-light dark:bg-base-dark py-2'}
                  layout
                  queryParam={queryParam}
                  onUpdateQueryParam={updateQuery}
                  isQuerying={isLoadingMore ?? false}
                />
              }
              <motion.ul
                variants={containerVariants}
                initial={'hidden'}
                animate={'show'}
                className="grid gap-8 grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 md:grid-cols-2 py-2">
                {
                  playlists.map((playlist: IBSPlaylist, i) => {
                    return (
                      <BSPlaylist
                        key={playlist.playlistId}
                        variants={listItemVariants}
                        custom={i}
                        bsPlaylist={playlist}/>
                    );
                  })
                }

                {!isLoadingMore && isEmpty && <EmptyContent/>}
                {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
                {isLoadingMore && <Loading/>}
              </motion.ul>
            </div>
          </div>
        </>
      )
}
    