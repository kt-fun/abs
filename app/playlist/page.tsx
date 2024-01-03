'use client'
import { usePagingBSPlaylist } from "@/hooks/usePagingBSPlaylist";
import { BSPlaylist as IBSPlaylist } from "@/interfaces/bs-playlist";
import BSPlaylist from "@/components/BSPlaylist";
import { useCallback, useEffect, useState } from "react";
import { Card, Slider, Switch,Text} from "@radix-ui/themes";
import SearchBar from "@/components/SearchBar";
import BSPlaylistQueryCard from "@/components/BSPlaylistQueryCard";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
export default function Home() {
    const { playlists,isLoadingMore,isEmpty,hasMore,loadMore,refresh,queryParam,updateQuery} = usePagingBSPlaylist();
    const [top,setTop] = useState(0);
    // handler inifinite scroll
    const handleScroll = useCallback(() => {
        setTop(document.documentElement.scrollTop);
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          if (isLoadingMore || isEmpty || !hasMore) return;
          loadMore();
        }
      }, [isLoadingMore, isEmpty, hasMore,loadMore]);
  
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [handleScroll]);

      const handleScrollToTop = useCallback(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
      }, []);
      const containerVariants = {
        hidden: { opacity: 0, y: "100vw" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      
      return (
        <>
          <div className="flex items-center justify-center">
            <div  className="flex-cols flex max-w-[1200px]  space-x-4">
              <div className="grid gap-8 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
                {
                  // todo add empty state
                  playlists.length === 0 && <>
                  <div>
                    todo
                    Nothing Here
                    </div>
                  </>
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
              <div className="hidden lg:flex sticky top-12 items-center justify-center w-[320px]  h-full">
              <BSPlaylistQueryCard 
                queryParam={queryParam}
                updateQuery={updateQuery}
                query={refresh}
                className="hidden lg:flex sticky top-12 items-center justify-center w-[320px] shadow-md h-full"
              />

              { top > 100 ?( <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              className={`fixed ml-auto bottom-2 rounded-full bg-blue-200 p-2 cursor-pointer `} onClick={handleScrollToTop}>
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
    