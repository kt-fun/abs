import { BSPlaylist } from '@/interfaces/bs-playlist';
import { jsonFetcher, jsonWithCredentialFetcher } from '@/lib/fetcher';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import BSPlaylistQueryParam, {PlaylistQueryParam} from "@/interfaces/bsplaylist-query-param";
import BSMapQueryParam, {MapQueryParam} from "@/interfaces/bsmap-query-param";

const PAGE_SIZE = 20
const fetcher = (input: RequestInfo,init?: RequestInit) => jsonFetcher(input,init).then((res)=>res.docs)

const buildURL = (index:number, param:PlaylistQueryParam)=> {
    const url = `/api/playlists/search/${index}`
    const p = BSPlaylistQueryParam.buildSearchParamFromPlaylistQueryParam(param)
    return url + "?" + p.toString()
}
const defaultParam:PlaylistQueryParam = {
    sortOrder:"Relevance",
    queryKey:""
}

export const usePagingBSPlaylist = (param?:MapQueryParam) => {
    const [state,setState] = useState<PlaylistQueryParam>(param??defaultParam)
    const [storedState,setStoredState] = useState<PlaylistQueryParam>(param??defaultParam)
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

    const refresh = ()=> {
        setState(storedState)
        const param = BSMapQueryParam.buildSearchParamFromMapQueryParam(storedState)
        const url = window.location.toString().split('?')[0]
        let newUrl = url + "?" + param.toString()
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    }
    const updateQuery = useCallback((param:PlaylistQueryParam)=> {
        setStoredState(param)
    },[setStoredState])
    return {
        playlists,
        "queryParam":storedState,
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