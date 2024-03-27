'use client'
import {motion, useCycle} from "framer-motion";
import * as React from "react";
import {useRef} from "react";
import {useDimensions} from "@/hooks/ui/useDimensions";
import {navLinks} from "@/components/header/nav/navItems";
import HeaderItem from "@/components/header/nav/mobile-nav-item/HeaderItem";
import MenuToggle from "@/components/header/nav/mobile-nav-item/MenuToggle";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 10%)`,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(10px at 100% 10%)",
    opacity: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
const MobileNav = ()=> {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={"flex items-center"}
      ref={containerRef}
    >
      <motion.div variants={sidebar} layout
                  className="w-full fixed left-0 right-0 top-16 h-auto bg-white dark:bg-zinc-700/70 px-4 py-2 rounded-b-lg z-30 ">
        <motion.ul
          variants={variants}
          layout
          className={"divide-y"}
        >
          {navLinks.map((item, i) => (
            <motion.li
              key={i}
              className={"py-2 space-y-2"}
            >
              <HeaderItem item={item}/>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()}/>
    </motion.nav>
  )
}

export default MobileNav