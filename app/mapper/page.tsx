'use client'
import BSMapper from "@/components/BSMapper";
import { usePagingBSUser } from "@/hooks/usePagingBSUser";
import { useCallback, useEffect } from "react";

export default function MapperPage() {
    const { users,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUser();

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

    // add event listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [handleScroll]);

    return (
      <>
      <div>
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