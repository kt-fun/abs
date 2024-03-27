import { BSBeatMap } from "@/interfaces/beatmap";
import { BASE_URL } from "@/lib/constant";
import { jsonFetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useBSMapDetail = (mapId: string) => {
    const { data, isLoading,error } = useSWR(`/api/maps/id/${mapId}`, jsonFetcher)
    return {
        "bsMap": data as BSBeatMap,
        isLoading,
        error,
    }
}