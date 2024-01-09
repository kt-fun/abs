'use client'
import BSMapper from "@/components/BSMapper";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { usePagingBSUser } from "@/hooks/api/usePagingBSUser";
import { useCallback, useEffect } from "react";

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
            !isLoadingMore&&isEmpty && 
            <div>
                Nothing Here
            </div>
        }
        {!isEmpty && 
        <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
            {
                users.map((it)=> 
                    <BSMapper key={it.id} bsUserWithStats={it}/>
                )
            }
        </div>
        }
        {!hasMore && !isLoadingMore &&
            <div>
                No More Data
            </div>
        }
        {isLoadingMore &&
            <div className="flex justify-center">
                loading data
            </div>
        }
      </div>

      </>
    )
}