import { BSBeatMap } from "@/interfaces/beatmap";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dayjs from "dayjs";
import { BASE_URL } from "@/lib/constant";
import { jsonFetcher } from "@/lib/fetcher";
export type FetchingType = "Published" | "WIP" | "Curated"
const PAGE_SIZE = 20

const currentdate = dayjs().toISOString()

const fetcher = (input: RequestInfo,init?: RequestInit) => jsonFetcher(input,init).then((res)=>res.docs)

export const usePagingBSUserMap = (
   fetchingType:FetchingType, userId: string
) => {
    const func = () => {
        if (fetchingType === "Published") {
            return (pageIndex:number, previousPageData:any) => {
                if (previousPageData){
                    const prevLast = previousPageData[previousPageData.length - 1]
                    return `${BASE_URL}/api/maps/collaborations/${userId}?&before=${prevLast.createdAt}`
                }
                return `${BASE_URL}/api/maps/collaborations/${userId}?&before=${currentdate}`
            }
        }
        if (fetchingType === "WIP") {
            return (index:number) => `${BASE_URL}/api/maps/wip/${index}`
        }
        return (index:number) => `${BASE_URL}/api/search/text/${index}?sortOrder=Curated&curator=${userId}&automapper=true`
        
    }

    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        func(),
        fetcher
      );
    const maps:BSBeatMap[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => {
        setSize(size + 1)
    };
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    return {
        maps,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}