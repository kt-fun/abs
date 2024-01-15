'use client'
import BSMapQueryCard from "@/components/BSMapQueryCard";
import BSMapSkeleton from "@/components/BSMapSkeleton";
import BSMap from "@/components/BSMap";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { usePagingBSMap } from "@/hooks/api/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Loading from "@/components/load-status/Loading";
import { IoSearch } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import EmptyContent from "@/components/load-status/EmptyContent";
import ReachListEnd from "@/components/load-status/ReachListEnd";
export default function Home() {
  const contentRef = useRef(null);
  const { maps,isLoadingMore,isEmpty,hasMore,loadMore,queryParam,updateQuery,refresh} = usePagingBSMap();
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  const containerVariants = {
    hidden: { opacity: 0, y: "100vw" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <>
      <div className="flex max-w-[1200px] grow  space-x-2">
        <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 md:grid-cols-2 grow" >
          {
            maps.length == 0 && isLoadingMore  && (
              skeleton.map((i:number)=>
                <BSMapSkeleton key={`${i}`}/>)
            )
          }
          {
            maps.map((map:BSBeatMap) => {
              return (
                <BSMap key={map.id} bsMap={map}/>
              );
            })
          }
          { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
          { isLoadingMore && <Loading/> }
        </div>

        <div className="hidden lg:flex sticky top-20 justify-center w-[250px] grow-0 h-fit">
          <BSMapQueryCard
            queryParam={queryParam}
            updateQuery={updateQuery}
            query={refresh}
            className="hidden lg:block sticky top-16 items-center grow-0 justify-center w-[250px] shadow-md "
          />
          { showScrollToTop ?( <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ scale: 1.1 }}
            className={`fixed ml-auto bottom-2 rounded-full bg-gray-200 dark:bg-gray-700 p-2 cursor-pointer animate`} onClick={scrollToTop}>
            <div className="text-lg">
              <FaArrowUp />
            </div>
          </motion.div>):(<></>)
          }
        </div>

        <Sheet>
          <SheetTrigger>
            <div className="flex fixed lg:hidden bottom-5 mr-10 right-5">
              <motion.div
                whileHover={{scale: 1.1}}
                className={`fixed ml-auto bottom-5 mr-10 rounded-full bg-blue-500 text-white p-2 cursor-pointer`}
              >
                <div className="text-3xl">
                  <IoSearch/>
                </div>
              </motion.div>
            </div>
          </SheetTrigger>
          <SheetContent side="bottom" >
            <ScrollArea className={`flex-grow overflow-y-auto max-h-[500px] no-scrollbar`}>
              <BSMapQueryCard
                queryParam={queryParam}
                updateQuery={updateQuery}
                query={refresh}
                className="px-2 py-4 shadow-none border-0"
              ></BSMapQueryCard>
              <ScrollBar orientation="vertical" />
            </ScrollArea>

          </SheetContent>
        </Sheet>


      </div>
    </>
  )
}
  