import { BSBeatMap } from "@/interfaces/beatmap";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import dayjs from "dayjs";
export type FetchingType = "Published" | "WIP" | "Curated"
const PAGE_SIZE = 20

const currentdate = dayjs().toISOString()
// @ts-ignore
const fetcher = (...args) => fetch(...args)
.then((res) => res.json())
.then((res)=>res.docs)
export const usePagingBSUserMap = (
   fetchingType:FetchingType, userId: string
) => {
    // https://beatsaver.com/api/search/text/0?sortOrder=Curated&curator=58338&automapper=true
    // https://beatsaver.com/api/maps/collaborations/58338?&before=2023-12-13T16:55:22.765655Z
    const [date,setDate] = useState<string>(currentdate)
    const getNextDate = () => {return date}
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => {
            
            if (fetchingType === "Published") {
                //https://beatsaver.com/api/maps/collaborations/58338?&before=2023-12-13T16:55:22.765655Z
                const data1 = getNextDate()
                console.log("date:",data1)
                return `https://bs-api.kt-f63.workers.dev/maps/collaborations/${userId}?&before=${data1}`
            }
            if (fetchingType === "WIP") {
                return ``
            }
            if (fetchingType === "Curated") {
                return `https://bs-api.kt-f63.workers.dev/search/text/${index}?sortOrder=Curated&curator=${userId}&automapper=true`
            }
        },
        fetcher
      );
    useEffect(()=> {
        if (data && data.length > 0 && fetchingType ==="Published") {
            const last = data[0][data[0].length - 1]
            console.log("last:",last)
            // setDate(last.createdAt)
        }
    },[data,fetchingType,setDate])
    const maps:BSBeatMap[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
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