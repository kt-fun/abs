import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { jsonWithCredentialFetcher } from "@/lib/fetcher";
import useSWR from "swr";
export const useBSUser = (uid: number) => {
    const { data, isLoading,error } = useSWR(`/api/users/id/${uid}`, jsonWithCredentialFetcher)
    return {
        "bsUserWithStats": data as BSUserWithStats,
        isLoading,
        error,
    }
}
