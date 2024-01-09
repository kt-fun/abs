import { MutableRefObject, useCallback, useEffect, useState } from "react";

export const useInfinityScroll = () => {
    const [reachedBottom,setReachedBottom] = useState(false);
    const [top,setTop] = useState(0);
    const handleScroll = useCallback(() => {
        setTop(document.documentElement.scrollTop);
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
            reachedBottom || setReachedBottom(true);
        }else {
            reachedBottom && setReachedBottom(false);
        }
      }, [reachedBottom]);
  
    useEffect(() => {
        const observer = new MutationObserver(() => {
            // 在DOM变化时重新检查位置?
            handleScroll()
          });
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
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