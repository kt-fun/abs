'use client'
import { usePagingBSPlaylist } from "@/hooks/api/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/BSPlaylist";
import { useCallback, useEffect, useState } from "react";
import { Card, Slider, Switch,Text} from "@radix-ui/themes";
import SearchBar from "@/components/SearchBar";
import BSPlaylistQueryCard from "@/components/BSPlaylistQueryCard";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import BSPlaylistSkeleton from "@/components/BSPlaylistSkeleton";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
export default function Home() {
    const { playlists,isLoadingMore,isEmpty,hasMore,loadMore,refresh,queryParam,updateQuery} = usePagingBSPlaylist();
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
      const skeleton = [1,2,3,4,5,6,7,8,9,10]
      return (
        <>
          <div className="flex justify-center grow">
            <div  className="flex-cols flex max-w-[1200px]  space-x-4">
              <div className="grid gap-8 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
                {
                  playlists.length == 0  && (
                    skeleton.map((i:number)=>
                    <BSPlaylistSkeleton key={`${i}`}/>)
                  )
                }
                {
                playlists.map((playlist:IBSPlaylist) => {
                  return (
                  <BSPlaylist  key={playlist.playlistId} bsPlaylist={playlist}/>
                  );
                })
                }
              </div>
              <div>



              </div>
              <div className="hidden lg:flex sticky top-12 items-center justify-center w-[320px] max-h-[480px]  h-full">
              <BSPlaylistQueryCard 
                queryParam={queryParam}
                updateQuery={updateQuery}
                query={refresh}
                className="hidden lg:flex sticky top-12 items-center justify-center w-[320px] shadow-md h-full"
              />

              { showScrollToTop ?( <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              className={`fixed ml-auto bottom-2 rounded-full bg-blue-200 p-2 cursor-pointer `} onClick={scrollToTop}>
                <Text size={"6"}>
                  <FaArrowUp />
                </Text>
              </motion.div>):(<></>)
              }</div>
            </div>
          </div>
        </>
      )
    }
    