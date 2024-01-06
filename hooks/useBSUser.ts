import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";


// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useBSUser = (uid: number) => {
    const { data, isLoading,error } = useSWR(`https://beatsaver.com/api/users/id/${uid}`, fetcher)
    return {
        "bsUserWithStats": data as BSUserWithStats,
        isLoading,
        error,
    }
}


// paging bsuser collaboration map
// paging bsuser wip map
// paging bsuser curated map
// paging bsuser playlist
// paging bsuser review
// user account