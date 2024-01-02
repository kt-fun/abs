import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 20
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const usePagingBSUser = () => {
    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => {
          return `https://bs-api.kt-f63.workers.dev/users/list/${index}?sortOrder=Relevance`
        },
        fetcher
      );
      
    const users:BSUserWithStats[] = data ? [].concat(...data) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === PAGE_SIZE;
    return {
        users,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}