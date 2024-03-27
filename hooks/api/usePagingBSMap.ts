import { BSBeatMap } from '@/interfaces/beatmap';
import { jsonFetcher } from '@/lib/fetcher';
import { useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import BSMapQueryParam,{ MapQueryParam} from "@/interfaces/bsmap-query-param";

const PAGE_SIZE = 20
const fetcher = (input: RequestInfo,init?: RequestInit) => jsonFetcher(input,init).then((res)=>res.docs)


const defaultParam:MapQueryParam = {
    sortOrder:"Relevance",
    queryKey:"",
}

const buildURL = (index:number, param:MapQueryParam)=> {
    const url = `/api/search/text/${index}`
    const p = BSMapQueryParam.buildSearchParamFromMapQueryParam(param)
    return url + "?" + p.toString()
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
        setSize(size + 1);
    }


    const refresh = ()=> {
        setState(storedState)
        const param = BSMapQueryParam.buildSearchParamFromMapQueryParam(storedState)
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

export const options = []