import { BSBeatMap } from '@/interfaces/beatmap';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
// todo error handle
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json()).then((res)=>res.docs)

export interface MapQueryParam {
    queryKey:string,
    autoMapper?:boolean,
    sortKey: "",
}

const buildURL = (index:number,param:MapQueryParam) => {
    const baseURL = `https://bs-api.kt-f63.workers.dev/search/text/${index}`
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

const defaultParam:MapQueryParam = {
    sortKey:"",
    queryKey:""
}

export const usePagingBSMap = () => {
    const [state,setState] = useState<MapQueryParam>(defaultParam)
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
      
    const maps:BSBeatMap[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    const refresh = useCallback(()=> {
        setSize(0)
    },[setSize])
    const updateQuery = useCallback((param:MapQueryParam)=> {
        setState(param)
    },[setState])
    return {
        maps,
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