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

export interface FeatureOption {
    value:string,
    label:string,
    tooltip?:string,
}

export const options:FeatureOption[] = [
    {
        value:"autoMapper",
        label:"AI",
        tooltip:"Auto Mapper, notice: not all ai maps has such tag",
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
        value:"fullSpread",
        label:"Full Spread",
        tooltip:"Full Spread",
    },

]

const buildURL = (index:number,param:MapQueryParam) => {
    const baseURL = `${BASE_URL}/api/search/text/${index}`
    let paramMap:any = {}
    if (param.options) {
        for (const item in param.options) {
            paramMap[item] = param.options[item as keyof typeof param.options]
        }
    }
    if (param.queryKey!="") {
        paramMap["q"] = param.queryKey
    }
    if (param.sortOrder!="") {
        paramMap["sortOrder"] = param.sortOrder
    }
    for (const item in param) {
        if (item!="options" && item!="queryKey" && item!="sortOrder" && param[item as keyof typeof param]) {
            paramMap[item] = param[item as keyof typeof param]
        }
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