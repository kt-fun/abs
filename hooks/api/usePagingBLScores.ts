import useSWRInfinite from "swr/infinite";
import {jsonFetcher} from "@/lib/fetcher";
import {BeatLeaderScore} from "@/interfaces/beatmap-rank";
import {useCallback, useEffect, useState} from "react";

export const usePagingBLScores = (
  hash:string, gameMode: string, difficulty: string
) => {
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index) => {
      return `/api/beatleader/v3/scores/${hash}/${difficulty}/${gameMode}/general/x/x?page=${index+1}`
    },
    jsonFetcher
  );
  const metadata = data?.[0]?.["metadata"]
  const rankingItems:BeatLeaderScore[] = data ? [].concat(...data).flatMap((item)=> {
    return item["data"]
  }) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;
  const isEmpty = rankingItems.length === 0;
  const loadMore = useCallback(() => setSize(size + 1),[setSize, size]);
  const hasMore = false;

  const loadedPage = size

  const [currentPage,setCurrentPage] = useState(1)
  useEffect(()=>{
    setCurrentPage(1)
  },[difficulty,gameMode,hash])
  const totalPage = metadata? Math.ceil(metadata['total']/metadata['itemsPerPage']) : undefined
  const pageSize:number|undefined =metadata?.['itemsPerPage']
  const hasNextPage = totalPage ? currentPage < totalPage : false
  const hasPreviousPage = currentPage > 1

  const previousPage = useCallback(()=>{
    hasPreviousPage && setCurrentPage(currentPage - 1)
  },[currentPage, hasPreviousPage])
  const nextPage = useCallback(async ()=>{
    if (!hasNextPage) return
    if (currentPage == loadedPage) {
      await loadMore()
    }
    setCurrentPage(currentPage + 1)
  },[currentPage, hasNextPage, loadMore, loadedPage])
  const currentData:BeatLeaderScore[] = pageSize ? rankingItems.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []
  return {
    scores:currentData as BeatLeaderScore[],
    "isLoadingMore":!!isLoadingMore,
    loadMore,
    isEmpty,
    isRefreshing,
    size,
    hasMore,
    totalPage,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    previousPage,
    nextPage,
  }
}