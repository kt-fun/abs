import { BASE_URL } from "@/lib/constant"
import { jsonWithCredentialFetcher } from "@/lib/fetcher"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

export interface NotifyStats {
    unread: number,
    read: number,
    // notify-preference
    curationAlerts: boolean,
    reviewAlerts: boolean,
}

export const useNotifyStats = () => {
    //@ts-ignore
    const { data, isLoading,error } = useSWR(`${BASE_URL}/api/alerts/stats`, jsonWithCredentialFetcher)
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
        return `${BASE_URL}/api/alerts/${type}/${index}`
      },
      jsonWithCredentialFetcher
    );
    return {
        data,
        isLoading,
    }
}