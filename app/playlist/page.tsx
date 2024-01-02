'use client'
import { usePagingBSPlaylist } from "@/hooks/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/BSPlaylist";
import { useCallback, useEffect } from "react";

export default function Home() {
    const { playlists,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSPlaylist();
  
    // handler inifinite scroll
    const handleScroll = useCallback(() => {
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
  
      return (
        <>
          <div>
            <div>filter</div>
            <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(256px,1fr))]">
              {
              playlists.map((playlist:IBSPlaylist) => {
                return (
                <BSPlaylist  key={playlist.playlistId} bsPlaylist={playlist}/>
                );
              })
            }</div>
          </div>
        </>
      )
    }
    