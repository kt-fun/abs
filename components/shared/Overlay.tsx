import {motion} from "framer-motion";
import React from "react";

export const Overlay = (
  {
    show,
    onClick
  }:{
    show: boolean,
    onClick?: ()=>void
  }
) => (
  <motion.div
    initial={false}
    animate={{ opacity: show ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: show ? "auto" : "none" }}
    className="overlay bg-blend-darken top-0 bottom-0 left-1/2 bg-black/[.8] fixed  z-20 -translate-x-1/2 h-full w-full"
    onClick={onClick}
  >
  </motion.div>
);