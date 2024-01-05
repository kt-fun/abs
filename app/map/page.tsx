'use client'
import BSMapQueryCard from "@/components/BSMapQueryCard";
import BSMapSkeleton from "@/components/BSMapSkeleton";
import BSMapper from "@/components/BSMapper";
import NPSRangePicker from "@/components/NPSRangePicker";
import SearchBar from "@/components/SearchBar";
import BSMap from "@/components/bs-map";
import { usePagingBSMap } from "@/hooks/usePagingBSMap";
import { BSBeatMap } from "@/interfaces/beatmap";
import { Card, Slider, Switch,Text} from "@radix-ui/themes";
import { motion } from "framer-motion";
import { use, useCallback, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
export default function Home() {
  const { maps,isLoadingMore,isEmpty,hasMore,loadMore,queryParam,updateQuery,refresh} = usePagingBSMap();

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
    const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
      <>
        <div className="flex-cols flex max-w-[1200px] grow  space-x-2">
          <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 md:grid-cols-2 grow">
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

              { top > 100 ?( <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover={{ scale: 1.1 }}
              className={`fixed ml-auto bottom-2 rounded-full bg-gray-200 dark:bg-gray-700 p-2 cursor-pointer `} onClick={handleScrollToTop}>
                <Text size={"6"}>
                  <FaArrowUp />
                </Text>
              </motion.div>):(<></>)
              }</div>

        </div>
      </>
    )
  }
  