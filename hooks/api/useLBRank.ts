"use client"
import {useQuery} from "@tanstack/react-query";
import {getLBScoreInfo} from "@/hooks/api/api";




export const useLBRankQuery = (type: 'hitcnt'|'score', segmentSize: number, initData?: Record<any, any>) => {
  return  useQuery({
    queryKey: [`lb-rank-${type}`],
    queryFn: ()=> {
      return getLBScoreInfo(type, segmentSize)
    },
    initialData: initData ?? {},
  });


}