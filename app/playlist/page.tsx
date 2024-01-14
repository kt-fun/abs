'use client'
import { usePagingBSPlaylist } from "@/hooks/api/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/BSPlaylist";
import { useCallback, useEffect, useState } from "react";
import BSPlaylistQueryCard from "@/components/BSPlaylistQueryCard";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import BSPlaylistSkeleton from "@/components/BSPlaylistSkeleton";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import Loading from "@/components/load-status/Loading";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import EmptyContent from "@/components/load-status/EmptyContent";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {IoSearch} from "react-icons/io5";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import BSMapQueryCard from "@/components/BSMapQueryCard";
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
                {!isLoadingMore&&isEmpty && <EmptyContent/>}
                { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
                { isLoadingMore && <Loading/> }
              </div>
              <div className="hidden lg:flex sticky top-20 items-center justify-center w-[250px] max-h-[480px]  h-fit ">
                <BSPlaylistQueryCard
                  queryParam={queryParam}
                  updateQuery={updateQuery}
                  query={refresh}
                  className="hidden lg:flex sticky top-12 items-center justify-center w-[250px] shadow-md h-fit p-2"
                />
                { showScrollToTop ?( <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.1 }}
                className={`fixed ml-auto bottom-2 rounded-full bg-blue-200 p-2 cursor-pointer `} onClick={scrollToTop}>
                  <div >
                    <FaArrowUp />
                  </div>
                </motion.div>):(<></>)
                }
              </div>
              <Sheet>
                <SheetTrigger className="flex fixed lg:hidden bottom-5 mr-10 right-5">
                  {/*<div className="flex fixed sm:hidden bottom-5 mr-10 right-5">*/}
                    <motion.div
                      whileHover={{scale: 1.1}}
                      className={`fixed ml-auto bottom-5 right-5 mr-0 rounded-full bg-blue-500 text-white p-2 cursor-pointer`}
                      >
                      <div className="text-3xl">
                        <IoSearch/>
                      </div>
                    </motion.div>
                  {/*</div>*/}
                </SheetTrigger>
                <SheetContent side="bottom" >
                  <ScrollArea className={`flex-grow overflow-y-auto max-h-[400px]`}>
                    <BSPlaylistQueryCard
                      queryParam={queryParam}
                      updateQuery={updateQuery}
                      query={refresh}
                      className="px-2 py-4 z-[100] shadow-none border-0"
                    ></BSPlaylistQueryCard>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </>
      )
    }
    