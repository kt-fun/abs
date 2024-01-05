'use client'
import BSMapper from "@/components/BSMapper";
import { useBSUser } from "@/hooks/useBSUser";
import { usePagingBSUser } from "@/hooks/usePagingBSUser";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function MapperDetailPage({ params }: { params: { id: number } }) {

    const {data, isLoading, error} = useBSUser(params.id)
    // const currentUser = data
    const router = useRouter()
    if(error) {
      router.push("/")
    }
// // paging bsuser collaboration map
// paging bsuser wip map
// paging bsuser curated map
// paging bsuser playlist
// paging bsuser review
// user account setup
    const [top,setTop] = useState(0);
    return (
      <>
      <div className="flex-cols flex max-w-[1200px]  space-x-2">
        {/* split with  */}
      </div>

      </>
    )
}