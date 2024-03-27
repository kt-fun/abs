import { BSBeatMap } from '@/interfaces/beatmap';
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

const buildSearchParam = (mapQueryPram:MapQueryParam) => {
    let param = new URLSearchParams()
    param.set('sortOrder',mapQueryPram.sortOrder)
    param.set('q',mapQueryPram.queryKey)
    if(mapQueryPram.minRating) {
        param.set('minRating',mapQueryPram.minRating.toString())
    }
    if(mapQueryPram.maxRating) {
        param.set('maxRating',mapQueryPram.maxRating.toString())
    }
    if(mapQueryPram.minNps) {
        param.set('minNps',mapQueryPram.minNps.toString())
    }
    if(mapQueryPram.maxNps) {
        param.set('maxNps',mapQueryPram.maxNps.toString())
    }
    if(mapQueryPram.minBpm) {
        param.set('minBpm',mapQueryPram.minBpm.toString())
    }
    if(mapQueryPram.maxBpm) {
        param.set('maxBpm',mapQueryPram.maxBpm.toString())
    }
    if(mapQueryPram.minDuration) {
        param.set('minDuration',mapQueryPram.minDuration.toString())
    }
    if(mapQueryPram.maxDuration) {
        param.set('maxDuration',mapQueryPram.maxDuration.toString())
    }
    if(mapQueryPram.from) {
        param.set('from',mapQueryPram.from)
    }
    if(mapQueryPram.to) {
        param.set('to',mapQueryPram.to)
    }
    if(mapQueryPram.tags) {
        param.set('tags',mapQueryPram.tags)
    }

    if(mapQueryPram.options) {
        const option = mapQueryPram.options
        if(option.autoMapper != undefined) {
            param.set('auto',option.autoMapper.toString())
        }
        if(option.curated) {
            param.set('curated', option.curated.toString())
        }
        if(option.cinema) {
            param.set('cinema', option.cinema.toString())
        }
        if(option.chroma) {
            param.set('chroma', option.chroma.toString())
        }
        if(option.noodle) {
            param.set('noodle', option.noodle.toString())
        }
        if(option.me) {
            param.set('me', option.me.toString())
        }
        if(option.fullSpread) {
            param.set('fullSpread', option.fullSpread.toString())
        }
        if(option.verified) {
            param.set('verified', option.verified.toString())
        }
        if(option.ranked) {
            param.set('ranked', option.ranked.toString())
        }
    }


    return param
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
        tooltip:"maybe mapped by AI",
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


export type SearchParam = { [key: string]: string | string[] | undefined }



export const buildMapQueryParam = (searchParams:SearchParam) => {
    const takeFirst = (key: string):string|undefined => {
        const v = searchParams[key]
        if (v && v instanceof Array) {
            return v[0]
        }
        return v
    }
    const toFloat = (v: string | undefined)=> {
        if(v == undefined) return v
        const res = parseFloat(v)
        return Number.isNaN(res) ? undefined : res
    }
    const param = {
        queryKey: takeFirst('q') ?? '',
        sortOrder: takeFirst('order') ?? 'Relevance',

    } as MapQueryParam

    if(toFloat(takeFirst('minRating'))) {
        param.minRating = toFloat(takeFirst('minRating'))
    }
    if(toFloat(takeFirst('minNps'))) {
        param.minNps = toFloat(takeFirst('minNps'))
    }
    if(toFloat(takeFirst('minBpm'))) {
        param.minBpm = toFloat(takeFirst('minBpm'))
    }
    if(toFloat(takeFirst('minDuration'))) {
        param.minDuration = toFloat(takeFirst('minDuration'))
    }
    if(toFloat(takeFirst('maxRating'))) {
        param.maxRating = toFloat(takeFirst('maxRating'))
    }
    if(toFloat(takeFirst('maxNps'))) {
        param.maxNps = toFloat(takeFirst('maxNps'))
    }
    if(toFloat(takeFirst('maxBpm'))) {
        param.maxBpm = toFloat(takeFirst('maxBpm'))
    }
    if(toFloat(takeFirst('maxDuration'))) {
        param.maxDuration = toFloat(takeFirst('maxDuration'))
    }
    if(takeFirst('from')) {
        param.from = takeFirst('from')
    }
    if(takeFirst('to')) {
        param.to = takeFirst('to')
    }
    if(takeFirst('tags')) {
        param.tags = takeFirst('tags')
    }
    if(takeFirst('auto')) {
        param.options = {
            ...param.options,
            autoMapper: takeFirst('auto') == 'true'
        }
    }
    if(takeFirst('curated')) {
        param.options = {
            ...param.options,
            curated: takeFirst('curated') == 'true'
        }
    }
    if(takeFirst('chroma')) {
        param.options = {
            ...param.options,
            chroma: takeFirst('chroma') == 'true'
        }
    }
    if(takeFirst('cinema')) {
        param.options = {
            ...param.options,
            cinema: takeFirst('cinema') == 'true'
        }
    }
    if(takeFirst('noodle')) {
        param.options = {
            ...param.options,
            noodle: takeFirst('noodle') == 'true'
        }
    }
    if(takeFirst('me')) {
        param.options = {
            ...param.options,
            me: takeFirst('me') == 'true'
        }
    }
    if(takeFirst('fullSpread')) {
        param.options = {
            ...param.options,
            fullSpread: takeFirst('fullSpread') == 'true'
        }
    }
    if(takeFirst('verified')) {
        param.options = {
            ...param.options,
            verified: takeFirst('verified') == 'true'
        }
    }
    if(takeFirst('ranked')) {
        param.options = {
            ...param.options,
            ranked: takeFirst('ranked') == 'true'
        }
    }
    return param
}

const buildURL = (index:number,param:MapQueryParam) => {
    const baseURL = `/api/search/text/${index}`
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

export const usePagingBSMap = (param?:MapQueryParam) => {
    const [state,setState] = useState<MapQueryParam>(param ?? defaultParam)
    const [storedState,setStoredState] = useState<MapQueryParam>(param ?? defaultParam)
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
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    const loadMore = () => {
        console.log('hasMore', hasMore)
        setSize(size + 1);
    }


    const refresh = ()=> {
        setState(storedState)
        const param = buildSearchParam(storedState)
        const url = window.location.toString().split('?')[0]
        let newUrl = url + "?" + param.toString()
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
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