'use client'
import { usePagingBSMap} from "@/hooks/api/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import {motion} from "framer-motion";
import React, {useCallback} from "react";
import Loading from "@/components/shared/load-status/Loading";
import ReachListEnd from "@/components/shared/load-status/ReachListEnd";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import MapFilter from "@/components/filter/map-filter";
import {useWindowScrollEndCallback} from "@/hooks/ui/useWindowScrollCallback";
import EmptyContent from "@/components/shared/load-status/EmptyContent";
import BSMapQueryParam from "@/interfaces/bsmap-query-param";
import {useBeatmaps} from "@/hooks/api/query/usePagingMap";
import BSMap from "@/components/bsmap";
import {useTranslation} from "@/hooks/useTranslation";

type SearchParam = { [key: string]: string | string[] | undefined }


export default function Home({
  searchParams,
}:{
  searchParams:SearchParam
}) {
  const {t} = useTranslation('page.main')
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
      <div className="flex max-w-[1024px] grow flex-col pb-2 bg-base-light dark:bg-base-dark">
        <div className={"flex items-center bg-base-light dark:bg-base-dark px-4"}>
          <div>
            <h1 className={"text-3xl font-bold"}>{t('title')}</h1>
            <span className={"text-zinc-400 dark:text-zinc-300 text-xs"}>{t('sub-title')}</span>
          </div>
        </div>
        {
          <MapFilter
            className={'sticky top-16 z-10 flex left-0 right-0 w-full bg-base-light dark:bg-base-dark mb-2 p-2'}
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
          className="grid gap-2 grid-cols-1 md:grid-cols-2 grow px-4 relative"
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
  