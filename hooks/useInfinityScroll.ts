import { MutableRefObject, useCallback, useEffect, useState } from "react";

export const useInfinityScroll = () => {
  // for mobile devices, may have some compatibility issues,not exactly equal,
  // so if distance to bottom is less than 10px then we consider it as reached bottom
    const [almostReachedBottom,setAlmostReachedBottom] = useState(false);
    const [top,setTop] = useState(0);
    const handleScroll = useCallback(() => {
        setTop(document.documentElement.scrollTop);
        if(document.body.clientHeight <= window.innerHeight) {
          almostReachedBottom || setAlmostReachedBottom(true);
        }else if (
          window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.offsetHeight
        ) {
          almostReachedBottom || setAlmostReachedBottom(true);
        }else {
          almostReachedBottom && setAlmostReachedBottom(false);
        }
      }, [almostReachedBottom]);

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
            reachedBottom:almostReachedBottom,
            setReachedBottom:setAlmostReachedBottom,
            showScrollToTop: top > 100,
            scrollToTop: () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
        }
}