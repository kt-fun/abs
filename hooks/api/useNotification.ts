import { jsonWithCredentialFetcher } from "@/lib/fetcher"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"
import {BSNotification} from "@/interfaces/bs-notification";

export interface NotifyStats {
    unread: number,
    read: number,
    // notify-preference
    curationAlerts: boolean,
    reviewAlerts: boolean,
}

export const useNotifyStats = () => {
    //@ts-ignore
    const { data, isLoading,error } = useSWR(`/api/alerts/stats`, jsonWithCredentialFetcher)
    return {
        data:data as NotifyStats,
        isLoading,
        error,
    }
}

type notifyType = "read" | "unread"

export const usePagingNotifications = (
    type: "read" | "unread"
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
        return `/api/alerts/${type}/${index}`
      },
      jsonWithCredentialFetcher
    );
    const notifications:BSNotification[] = data ? [].concat(...data) : [];
    const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.length === 20;
    return {
        notifications,
        isLoadingMore,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        isLoading,
    }
}