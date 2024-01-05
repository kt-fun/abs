import { BSBeatMap } from "@/interfaces/beatmap";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";


// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useBSMapDetail = (mapId: string) => {
    const { data, isLoading,error } = useSWR(`https://beatsaver.com/api/maps/id/${mapId}`, fetcher)
    return {
        "bsMap": data as BSBeatMap,
        isLoading,
        error,
    }
}