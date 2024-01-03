'use client'
import BSMapQueryCard from "@/components/BSMapQueryCard";
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
    return (
      <>
        <div className="flex-cols flex max-w-[1200px]  space-x-2">
          <div className="grid gap-2 grid-cols-1 xl:grid-cols-2 md:grid-cols-2 ">
            {
            maps.map((map:BSBeatMap) => {
              return (
                <BSMap key={map.id} bsMap={map}/>
              );
            })
          }</div>

            <div className="hidden lg:flex sticky top-12 items-center justify-center w-[320px]  h-full">
              <BSMapQueryCard 
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
      </>
    )
  }
  