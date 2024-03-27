import {useWindowScroll} from "react-use";
import {useMotionValue, useMotionValueEvent} from "framer-motion";
import {useEffect} from "react";

export const useWindowScrollEndCallback = (callback:()=>void)=> {
  const { y} = useWindowScroll();
  const scrollYProgress = useMotionValue(0)
  useEffect(()=> {
    scrollYProgress.set((y + window.innerHeight)/ document.body.offsetHeight)
  },[scrollYProgress, y])
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.99) {callback()}
  })
}