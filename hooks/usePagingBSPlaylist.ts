import { BSBeatMap } from '@/interfaces/beatmap';
import { BSPlaylist } from '@/interfaces/bs-playlist';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
// todo error handle
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json()).then((res)=>res.docs)

export interface PlaylistQueryParam {
    queryKey:string,
    autoMapper?:boolean,
    verifiedMapper?: boolean,
    sortKey: "",
}
const buildURL = (index:number,param:PlaylistQueryParam) => {
    const baseURL = `https://bs-api.kt-f63.workers.dev/playlists/search/${index}`
    let paramMap:any = {}
    if (param.autoMapper) {
        paramMap["automapper"] = true
    }
    if (param.queryKey!="") {
        paramMap["q"] = param.queryKey
    }
    let keys = Object.keys(paramMap)
    let queryParam = "?"
    for (const k in keys) {
        queryParam += `${k}=${paramMap[k]}`
    }
    return baseURL + queryParam
}

const defaultParam:PlaylistQueryParam = {
    sortKey:"",
    queryKey:""
}

export const usePagingBSPlaylist = () => {
    const [state,setState] = useState<PlaylistQueryParam>(defaultParam)
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => buildURL(index, state),
        fetcher,
      );
      
    const playlists:BSPlaylist[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    const refresh = useCallback(()=> {
        setSize(0)
    },[setSize])
    const updateQuery = useCallback((param:PlaylistQueryParam)=> {
        setState(param)
    },[setState])
    return {
        playlists,
        "queryParam":state,
        isLoadingMore,
        refresh,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
        updateQuery
    }
}