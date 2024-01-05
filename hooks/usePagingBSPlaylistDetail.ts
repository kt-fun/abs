import { BSBeatMap } from "@/interfaces/beatmap";
import { BSPlaylist } from "@/interfaces/bs-playlist";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 100
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

interface BSPlaylistDetail {
    maps:BSBeatMap[],
    playlist:BSPlaylist
}

export const usePagingBSPlaylistDetail = (playlistId:string) => {
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading,
        error
      } = useSWRInfinite(
        (index) => `https://beatsaver.com/api/playlists/id/${playlistId}/${index}`,
        fetcher,
      );
      const [playlist,setPlaylist] = useState<BSPlaylist>()
      useEffect(()=> {
          if (data && data.length > 0) {
            setPlaylist(data[0]["playlist"])
          }
      },[data])
    //   const datas = data ? [].concat(...data)
      const maps:BSBeatMap[] = data ? [].concat(...data).flatMap((item)=> {
          return item["maps"]
      }).map((item)=>{return item["map"]}) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.maps.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.maps.length === PAGE_SIZE;
      console.log("hasMore",hasMore)
    return {
        playlist,
        maps,
        error,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}