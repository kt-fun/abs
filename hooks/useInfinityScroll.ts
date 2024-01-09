import { MutableRefObject, useCallback, useEffect, useState } from "react";

export const useInfinityScroll = () => {
    const [reachedBottom,setReachedBottom] = useState(false);
    const [top,setTop] = useState(0);
    const handleScroll = useCallback(() => {
        setTop(document.documentElement.scrollTop);
        if(document.body.clientHeight <= window.innerHeight) {
            reachedBottom || setReachedBottom(true);
        }else if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
            reachedBottom || setReachedBottom(true);
        }else {
            reachedBottom && setReachedBottom(false);
        }
      }, [reachedBottom]);
    useEffect(() => {
        const interval = setInterval(() => {
          handleScroll();
        }, 1000);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
      }, [handleScroll]);

        return {
            reachedBottom,
            setReachedBottom,
            showScrollToTop: top > 100,
            scrollToTop: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
        }
}