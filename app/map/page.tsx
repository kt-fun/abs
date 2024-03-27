'use client'
import { usePagingBSMap} from "@/hooks/api/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import {motion} from "framer-motion";
import React, {useCallback} from "react";
import Loading from "@/components/load-status/Loading";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import {containerVariants, listItemVariants} from "@/components/variants";
import MapFilter from "@/components/filter/map-filter";
import {useWindowScrollEndCallback} from "@/hooks/ui/useWindowScrollCallback";
import EmptyContent from "@/components/load-status/EmptyContent";
import BSMapQueryParam from "@/interfaces/bsmap-query-param";
import {useBeatmaps} from "@/hooks/api/query/usePagingMap";
import BSMap from "@/components/bsmap";
import {Overlay} from "@/components/Overlay";

type SearchParam = { [key: string]: string | string[] | undefined }


export default function Home({
  searchParams,
}:{
  searchParams:SearchParam
}) {

  // let param = BSMapQueryParam.buildSearchParamFromMapQueryParam(BSMapQueryParam.buildMapQueryParamFromSearchParam(searchParams))
  const {  } = useBeatmaps()
  const mapQueryParam = BSMapQueryParam.buildMapQueryParamFromSearchParam(searchParams)
  const { maps,isLoadingMore,isEmpty,hasMore,loadMore,queryParam,updateQuery,refresh} = usePagingBSMap(mapQueryParam);
  const reachEndCallback = useCallback(() => {
    !isLoadingMore && !isEmpty && hasMore && loadMore()
  },[hasMore, isEmpty, isLoadingMore, loadMore])
  useWindowScrollEndCallback(reachEndCallback)
  const scrollToTop = ()=> {
    window.scrollTo({top:0, behavior:'instant'})
  }
  return (
    <>
      <div className="flex max-w-[1024px] grow flex-col pb-2 px-2">
        <div className={"flex items-center bg-base-light dark:bg-base-dark"}>
          <div>
            <h1 className={"text-3xl font-bold"}>BeatMaps</h1>
            <span className={"text-zinc-400 dark:text-zinc-300 text-xs"}>search maps that you want</span>
          </div>
        </div>
        {
          <MapFilter
            className={'sticky top-16 z-10 flex left-0 right-0 w-full bg-base-light dark:bg-base-dark py-2'}
            queryParam={queryParam}
            onUpdateQueryParam={updateQuery}
            onQuery={()=>{
              scrollToTop()
              refresh()}}
            isQuerying={isLoadingMore ?? false}
          />
        }
          <motion.ul
            variants={containerVariants}
            initial={'hidden'}
            animate={'show'}
            className="grid gap-2 grid-cols-1 md:grid-cols-2 grow px-2 relative"
          >
            {
              maps.map((map:BSBeatMap, i:number) => {
                return (
                  <BSMap
                    // todo fix key issue, cause by data repeat
                    key={map.id}
                    variants={listItemVariants}
                    custom={i}
                    bsMap={map}
                  />
                );
              })
            }
            {
              // !isEmpty && isLoadingMore && <div className={"absolute eft-auto right-auto mx-auto top-40"}>
              //   {/*<Overlay show={!isEmpty && isLoadingMore} />*/}
              //       <Loading className={'col-span-2 mx-auto'}/>
              //   </div>
            }
            { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
            { isEmpty && !hasMore && !isLoadingMore && <EmptyContent className={'col-span-2'}/> }
            {  isLoadingMore && <Loading className={'col-span-2'}/> }
          </motion.ul>


      </div>
    </>
  )
}
  