import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { BASE_URL } from "@/lib/constant";
import { jsonWithCredentialFetcher } from "@/lib/fetcher";
import useSWR from "swr";
export const useBSUser = (uid: number) => {
    const { data, isLoading,error } = useSWR(`${BASE_URL}/api/users/id/${uid}`, jsonWithCredentialFetcher)
    return {
        "bsUserWithStats": data as BSUserWithStats,
        isLoading,
        error,
    }
}
