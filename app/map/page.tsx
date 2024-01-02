'use client'
import BSMapper from "@/components/BSMapper";
import BSMap from "@/components/bs-map";
import { usePagingBSMap } from "@/hooks/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import { use, useCallback, useEffect, useState } from "react";
export default function Home() {
  const { maps,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSMap();

  // handler inifinite scroll
  const handleScroll = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (isLoadingMore || isEmpty || !hasMore) return;
        loadMore();
      }
    }, [isLoadingMore, isEmpty, hasMore,loadMore]);

  useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
      <>
        <div>
          <div>filter</div>
          
          <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 md:grid-cols-2 ">
            {
            maps.map((map:BSBeatMap) => {
              return (
                <BSMap key={map.id} bsMap={map}/>
              );
            })
          }</div>
        </div>
      </>
    )
  }
  