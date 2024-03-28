import {usePagingBSUserPlaylist} from "@/hooks/api/usePagingBSUserPlaylist";
import {useInfinityScroll} from "@/hooks/useInfinityScroll";
import React, {useEffect} from "react";
import {motion} from "framer-motion";
import {containerVariants, listItemVariants} from "@/components/variants";
import {BSPlaylist as IBSPlaylist} from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/bsplaylist";
import EmptyContent from "@/components/load-status/EmptyContent";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import Loading from "@/components/load-status/Loading";

const PlaylistsTab = (
  {
    userId
  }: {
    userId:string
  }
) => {
  const { playlists,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserPlaylist(userId);
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  return (
    <motion.ul
      variants={containerVariants}
      initial={'hidden'}
      animate={'show'}
      className="grid gap-2 grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2 py-2">
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
    // <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 justify-evenly">
    //   {
    //     playlists.map(
    //       (playlist) => {
    //         return (
    //           <BSPlaylist key={playlist.playlistId} bsPlaylist={playlist}/>
    //         );
    //       })
    //   }
    //   {!isLoadingMore && isEmpty && <EmptyContent/>}
    //   {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
    //   {isLoadingMore && <Loading/>}
    // </div>
  )
}

export default PlaylistsTab