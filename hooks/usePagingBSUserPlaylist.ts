import { BSBeatMap } from '@/interfaces/beatmap';
import { BSPlaylist } from '@/interfaces/bs-playlist';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
// todo error handle
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json()).then((res)=>res.docs)

export const usePagingBSUserPlaylist = (userId:string) => {
    // 
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => `https://bs-api.kt-f63.workers.dev/playlists/user/${userId}/${index}`,
        fetcher,
      );
    
    const playlists:BSPlaylist[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    return {
        playlists,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore
    }
}