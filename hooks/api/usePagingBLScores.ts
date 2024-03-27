import useSWRInfinite from "swr/infinite";
import {jsonFetcher} from "@/lib/fetcher";
import {BeatLeaderScore} from "@/interfaces/beatmap-rank";

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
  const rankingItems:BeatLeaderScore[] = data ? [].concat(...data).flatMap((item)=> {
    return item["data"]
  }) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;
  const isEmpty = rankingItems.length === 0;
  const loadMore = () => setSize(size + 1);
  const hasMore = false;
  return {
    scores:rankingItems as BeatLeaderScore[],
    "isLoadingMore":!!isLoadingMore,
    loadMore,
    isEmpty,
    isRefreshing,
    size,
    hasMore,
  }
}