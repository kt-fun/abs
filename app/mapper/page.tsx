'use client'
import BSMapper from "@/components/bsmapper";
import { usePagingBSUser } from "@/hooks/api/usePagingBSUser";
import { motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import {ReachListEnd, EmptyContent, Loading} from "@/components/shared/load-status";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import {useWindowScrollEndCallback} from "@/hooks/ui/useWindowScrollCallback";
import {useTranslation} from "@/hooks/useTranslation";

export default function MapperPage() {
  const {t} = useTranslation('page.mapper')
  const { users,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUser();
  const reachEndCallback = useCallback(() => {
    !isLoadingMore && !isEmpty && hasMore && loadMore()
  },[hasMore, isEmpty, isLoadingMore, loadMore])
  useWindowScrollEndCallback(reachEndCallback)
    return (
      <>
        <div className="max-w-[1024px] w-full">
          <div className={"bg-base flex items-center mb-2"}>
            <div>
              <h1 className={"text-3xl font-bold"}>{t('title')}</h1>
            </div>
            {/*<SearchBar queryKey={''} onQueryKeyChange={()=>{}} onQuery={()=>{}}/>*/}
          </div>
          <motion.ul
            variants={containerVariants}
            initial={'hidden'}
            animate={'show'}
            className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {
              !isEmpty &&  users.map((it, i:number) => {
                return (
                  <motion.li
                    variants={listItemVariants}
                    custom={i}
                    key={it.id}
                  >
                    <BSMapper bsUserWithStats={it} className="w-full"/>
                  </motion.li>
                );
              })
            }
            {!isLoadingMore && isEmpty && <EmptyContent/>}
            {!isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/>}
            {isLoadingMore && <Loading/>}
          </motion.ul>
        </div>

      </>
    )
}