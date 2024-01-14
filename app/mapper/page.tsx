'use client'
import BSMapper from "@/components/BSMapper";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { usePagingBSUser } from "@/hooks/api/usePagingBSUser";
import { useCallback, useEffect } from "react";
import Loading from "@/components/load-status/Loading";
import EmptyContent from "@/components/load-status/EmptyContent";
import ReachListEnd from "@/components/load-status/ReachListEnd";

export default function MapperPage() {
    const { users,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUser();
    const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
    useEffect(()=>{
      if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
        loadMore();
      }
    },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
    return (
      <>
      <div className="flex-cols flex max-w-[1200px]  space-x-2">
        {
        <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
            {
                !isEmpty && users.map((it)=> 
                    <BSMapper key={it.id} bsUserWithStats={it} className="sm:w-full"/>
                )
            }
          {!isLoadingMore&&isEmpty && <EmptyContent/>}
          { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
          { isLoadingMore && <Loading/> }
        </div>
        }
      </div>

      </>
    )
}