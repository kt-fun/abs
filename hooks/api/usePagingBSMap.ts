import { BSBeatMap } from '@/interfaces/beatmap';
import { BASE_URL } from '@/lib/constant';
import { jsonFetcher } from '@/lib/fetcher';
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
const fetcher = (input: RequestInfo,init?: RequestInit) => jsonFetcher(input,init).then((res)=>res.docs)

export interface MapQueryParam {
    queryKey:string,
    sortOrder: string,
    minRating?:number,
    maxRating?:number,
    minBpm?:number,
    maxBpm?:number,
    minDuration?:number,
    maxDuration?:number,
    minNps?:number,
    maxNps?:number,
    from?: string,
    to?: string,
    tags?: string,
    mapper?: string,
    options?: {
        autoMapper?:boolean,
        chroma?:boolean,
        cinema?:boolean,
        noodle?:boolean,
        me?: boolean,
        ranked?: boolean,
        curated?: boolean,
        verified?: boolean,
        fullSpread?: boolean,
    },
}

interface Option {
    value:string,
    label:string,
    tooltip?:string,
}

export const options:Option[] = [
    {
        value:"autoMapper",
        label:"AI",
        tooltip:"Auto Mapper, notice: not all ai maps has such tag",
    },
    {
        value:"chroma",
        label:"Chroma",
        tooltip:"Chroma",
    },
    {
        value:"cinema",
        label:"Cinema",
        tooltip:"Cinema",
    },
    {
        value:"noodle",
        label:"Noodle Extension",
        tooltip:"Noodle Extension",
    },
    {
        value:"me",
        label:"Mapping Extension",
        tooltip:"Mapping Extension",
    },
    {
        value:"ranked",
        label:"Ranked",
        tooltip:"only ranked maps",
    },
    {
        value:"curated",
        label:"Curated",
        tooltip:"Curated",
    },
    {
        value:"verified",
        label:"Verified",
        tooltip:"Verified",
    },
    {
        value:"fullSpread",
        label:"Full Spread",
        tooltip:"Full Spread",
    },

]

const buildURL = (index:number,param:MapQueryParam) => {
    const baseURL = `${BASE_URL}/api/search/text/${index}`
    let paramMap:any = {}
    if (param.options?.autoMapper) {
        paramMap["automapper"] = true
    }
    if (param.options?.chroma) {
        paramMap["chroma"] = true
    }
    if (param.options?.cinema) {
        paramMap["cinema"] = true
    }
    if (param.options?.noodle) {
        paramMap["noodle"] = true
    }
    if (param.options?.me) {
        paramMap["me"] = true
    }
    if (param.options?.ranked) {
        paramMap["ranked"] = true
    }
    if (param.options?.curated) {
        paramMap["curated"] = true
    }
    if (param.options?.verified) {
        paramMap["verified"] = true
    }
    if (param.options?.fullSpread) {
        paramMap["fullSpread"] = true
    }
    if (param.queryKey!="") {
        paramMap["q"] = param.queryKey
    }
    if (param.sortOrder!="") {
        paramMap["sortOrder"] = param.sortOrder
    }
    if (param.minRating) {
        paramMap["minRating"] = param.minRating
    }
    if (param.maxRating) {
        paramMap["maxRating"] = param.maxRating
    }
    if (param.minBpm) {
        paramMap["minBpm"] = param.minBpm
    }
    if (param.maxBpm) {
        paramMap["maxBpm"] = param.maxBpm
    }
    if (param.minDuration) {
        paramMap["minDuration"] = param.minDuration
    }
    if (param.maxDuration) {
        paramMap["maxDuration"] = param.maxDuration
    }
    if (param.minNps) {
        paramMap["minNps"] = param.minNps
    }
    if (param.maxNps) {
        paramMap["maxNps"] = param.maxNps
    }
    if (param.from) {
        paramMap["from"] = param.from
    }
    if (param.to) {
        paramMap["to"] = param.to
    }
    if (param.tags) {
        paramMap["tags"] = param.tags
    }
    if (param.mapper) {
        paramMap["mapper"] = param.mapper
    }
    let keys = Object.keys(paramMap)
    let queryParam = "?"
    for (const k in keys) {
        queryParam += `${keys[k]}=${paramMap[keys[k]]}&`
    }
    return baseURL + queryParam
}

const defaultParam:MapQueryParam = {
    sortOrder:"Relevance",
    queryKey:"",
}

export const usePagingBSMap = () => {
    const [state,setState] = useState<MapQueryParam>(defaultParam)
    const [storedState,setStoredState] = useState<MapQueryParam>(defaultParam)
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading,
        error
      } = useSWRInfinite(
        (index) => buildURL(index, state),
        fetcher,{
            keepPreviousData: true,
          }
      );
    const maps:BSBeatMap[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;

    const refresh = ()=> {
        setState(storedState)
    }
    const updateQuery = useCallback((param:MapQueryParam)=> {
        setStoredState(param)
    },[setStoredState])
    return {
        maps,
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