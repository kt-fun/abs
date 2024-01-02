import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";


// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useBSUser = (uid: number) => {
    return useSWR(`https://beatsaver.com/api/users/id/${uid}`, fetcher)
}