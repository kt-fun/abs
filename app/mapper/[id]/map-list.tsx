
import {motion} from "framer-motion";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import {EmptyContent, Loading, ReachListEnd} from "@/components/shared/load-status";
import React, {useEffect} from "react";
import {FetchingType, usePagingBSUserMap} from "@/hooks/api/usePagingBSUserMap";
import {useInfinityScroll} from "@/hooks/useInfinityScroll";
import BSMap from "@/components/bsmap";
import {BSBeatMap} from "@/interfaces/beatmap";

const MapList = (
  {
    userId,
    fetchingType
  }: {
    userId:string,
    fetchingType:FetchingType
  }
)=> {

  const { maps,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserMap(fetchingType as FetchingType,userId);
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  return (
    <motion.ul
      variants={containerVariants}
      initial={'hidden'}
      animate={'show'}
      className="grid gap-2 grid-cols-1 md:grid-cols-2 grow px-2 relative"
    >
      {
        maps.map((map: BSBeatMap, i: number) => {
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
      {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
      {isEmpty && !hasMore && !isLoadingMore && <EmptyContent className={'col-span-2'}/>}
      {isLoadingMore && <Loading className={'col-span-2'}/>}
    </motion.ul>
  )
}

export default React.memo(MapList)