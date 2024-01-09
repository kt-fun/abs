import { BASE_URL } from "@/lib/constant"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"



//@ts-ignore
const fetcher = (resource, init) => fetch(resource, {
    ...init,
    credentials: 'include',
}).then((res) => res.json())


export interface NotifyStats {
    unread: number,
    read: number,
    // notify-preference
    curationAlerts: boolean,
    reviewAlerts: boolean,
}

export const useNotifyStats = () => {
    //@ts-ignore
    const { data, isLoading,error } = useSWR(`${BASE_URL}/api/alerts/stats`, fetcher)
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
        return `https://bs-api.kt-f63.workers.dev/api/alerts/${type}/${index}`
      },
      fetcher
    );
    return {
        data,
        isLoading,
    }
}