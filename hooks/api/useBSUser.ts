import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { BASE_URL } from "@/lib/constant";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";


const fetcher = (resource:string, init:RequestInit|undefined) => fetch(resource, {
    ...init,
    credentials: 'include',
}).then((res) => res.json())

export const useBSUser = (uid: number) => {
    const { data, isLoading,error } = useSWR(`${BASE_URL}/api/users/id/${uid}`, fetcher)
    return {
        "bsUserWithStats": data as BSUserWithStats,
        isLoading,
        error,
    }
}
