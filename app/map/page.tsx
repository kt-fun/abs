'use client'
import BSMapQueryCard from "@/components/BSMapQueryCard";
import BSMapSkeleton from "@/components/BSMapSkeleton";
import BSMapper from "@/components/BSMapper";
import SearchBar from "@/components/SearchBar";
import BSMap from "@/components/bs-map";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { usePagingBSMap } from "@/hooks/api/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import { Card, Slider, Switch,Text} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
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
            </div>

            <div className="hidden lg:flex sticky top-20 justify-center w-[320px] grow-0 h-[640px]">
              <BSMapQueryCard 
                queryParam={queryParam}
                updateQuery={updateQuery}
                query={refresh}
                className="hidden lg:flex sticky top-16 items-center grow-0 justify-center w-[320px] shadow-md "
              />

              { showScrollToTop ?( <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              className={`fixed ml-auto bottom-2 rounded-full bg-gray-200 dark:bg-gray-700 p-2 cursor-pointer `} onClick={scrollToTop}>
                <Text size={"6"}>
                  <FaArrowUp />
                </Text>
              </motion.div>):(<></>)
              }</div>

        </div>
      </>
    )
  }
  