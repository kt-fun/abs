'use client'

import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {flushSync} from "react-dom";
import {useRef} from "react";


export default function ThemeSwitch() {
  const {theme, setTheme, systemTheme} = useTheme()
  const nextTheme = () => {
    switch (theme) {
      case 'light': return 'dark'
      case 'dark': return 'light'
      case 'system': return 'light'
    }
    return "light"
  }
  const ref = useRef<HTMLDivElement>(null);
  const setToggle = async () => {
    if (
      !ref.current ||
      // @ts-ignore
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme());
      return;
    }
    // @ts-ignore
    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme());
      });
    }).ready;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom),
    );

    // document.documentElement.animate(
    //   {
    //     clipPath: [
    //       `circle(0px at ${x}px ${y}px)`,
    //       `circle(${maxRadius}px at ${x}px ${y}px)`,
    //     ],
    //   },
    //   {
    //     duration: 900,
    //     easing: 'ease-in-out',
    //     pseudoElement: '::view-transition-new(root)',
    //   }
    // );
  }
  return (
    <>
      <motion.div
        className={'p-2 w-10 h-10 border rounded-full border-transparent cursor-pointer'}
        onClick={() => setToggle()}
        ref={ref}
      >
        <AnimatePresence>
          {
            (theme === 'light' || (theme === 'system' && systemTheme === 'dark')) &&
              <motion.div
                  key={'light'}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
              ><Sun/></motion.div>
          }
          {
            (theme === 'dark' || (theme === 'system' && systemTheme === 'light')) &&
              <motion.div
                  key={'dark'}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{opacity: 1, y: 0 }}
              >
                  <Moon/>
              </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </>
  )
}