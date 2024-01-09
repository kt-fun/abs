import { BSMapRankingItem } from "@/interfaces/beatmap-rank";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import { BASE_URL } from "@/lib/constant";
import { jsonFetcher } from "@/lib/fetcher";
import { set } from "date-fns";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 12

function difficultyToNumber(diff:String) {
    switch(diff) {
        case "Easy":
            return 1;
        case "Normal":
            return 3;
        case "Hard":
            return 5;
        case "Expert":
            return 7;
        case "ExpertPlus":
            return 9;
        default:
            throw new Error("invalid difficulty");
    }
}

function gameModeToNumber(chracteristic:String) {
    switch(chracteristic) {
        case "Standard":
            return 0;
        case "NoArrows":
            return 1;
        case "OneSaber":
            return 2;
        case "90Degree":
            return 3;
        case "360Degree":
            return 4;
        case "Lightshow":
            return 5;
        case "Lawless":
            return 6;
        default:
            throw new Error("invalid game mode");
    }
}

export const usePagingBSMapScoreRank = (
    hash:string,type:"BeatLeader" | "ScoreSaber", gameMode: string, difficulty: string
) => {
    const [gameModeN,difficultyN] = [gameModeToNumber(gameMode),difficultyToNumber(difficulty)]

    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
      } = useSWRInfinite(
        (index) => {
          return `${BASE_URL}/api/scores/${hash}/${index+1}?type=${type}&gameMode=${gameModeN}&difficulty=${difficultyN}`
        },
        jsonFetcher
      );
    const [uid,setUid] = useState<string>("")
    useEffect(()=> {
        if (data && data.length > 0) {
            setUid(data[0]["uid"])
        }
    },[data])
    const rankingItems:BSMapRankingItem[] = data ? [].concat(...data).flatMap((item)=> {
        return item["scores"]
    }) : [];
    const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isRefreshing = isValidating && data && data.length === size;
    const isEmpty = data?.[0]?.length === 0;
    const loadMore = () => setSize(size + 1);
    const hasMore = data?.[data.length - 1]?.["scores"].length === PAGE_SIZE;
    return {
        "id":uid,
        rankingItems:rankingItems as BSMapRankingItem[],
        "isLoadingMore":isLoadingMore?true:false,
        loadMore,
        isEmpty,
        isRefreshing,
        size,
        hasMore,
    }
}