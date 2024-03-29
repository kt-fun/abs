'use client'
import { usePagingBSPlaylist } from "@/hooks/api/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/bsplaylist";
import React, { useEffect } from "react";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import {Loading,ReachListEnd, EmptyContent} from "@/components/shared/load-status";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import { motion } from "framer-motion";
import PlaylistFilter from "@/components/filter/playlist-filter";
import {useTranslation} from "@/hooks/useTranslation";
import BSPlaylistQueryParam from "@/interfaces/bsplaylist-query-param";


type SearchParam = { [key: string]: string | string[] | undefined }


export default function Playlist({
 searchParams,
}:{
  searchParams:SearchParam
}) {

    const {t} = useTranslation('page.playlist')
  const playlistQueryParam = BSPlaylistQueryParam.buildPlaylistQueryParamFromSearchParam(searchParams)
    const { playlists,isLoadingMore,isEmpty,hasMore,loadMore,refresh,queryParam,updateQuery} = usePagingBSPlaylist(playlistQueryParam);
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
            <div className="flex-col flex max-w-[1024px]  w-full">
                <div className={' bg-base-light dark:bg-base-dark p-2'}>
                  <h1 className={"text-3xl font-bold"}>{t('title')}</h1>
                  <span className={"text-zinc-400 dark:text-zinc-300 text-xs"}>{t('sub-title')}</span>
                </div>
              {
                <PlaylistFilter
                  className={'sticky top-16 z-10 flex left-0 right-0 w-full bg-base-light dark:bg-base-dark p-2'}
                  queryParam={queryParam}
                  onUpdateQueryParam={updateQuery}
                  onQuery={()=>{
                    scrollToTop()
                    refresh()}}
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
    