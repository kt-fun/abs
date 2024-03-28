import React, {useRef, useState} from "react";
import {BSBeatMap} from "@/interfaces/beatmap";
import {HTMLMotionProps, motion} from "framer-motion";
import {Overlay} from "@/components/bsmap/overlay";
import BSMap from "./bsmap";
import {cn} from "@/lib/utils";
const variant = {
  open: {
    zIndex: 10,
    transition: {type: "spring", stiffness: 200, damping: 30},
  },
  closed: {
    zIndex: 'auto',
    transition: {
      type: "spring", stiffness: 300, damping: 35,
      zIndex: {
        delay: 2,
      },
    },
  },
}
const WrappedBSMap =(
{
  bsMap,
  ...rest
}: {
  bsMap:BSBeatMap
}
& HTMLMotionProps<"div">
)=> {
  const cardRef = useRef(null);
  const [isSelected,setIsSelected] = useState(false)


  return (
    <motion.div
      {...rest}
      className={cn(
        !isSelected ? 'hover:z-[2]' : ' touch-none '
      )}
    >
      {<Overlay isSelected={isSelected} onClick={()=>{setIsSelected(false)}}/>}
      <div
        className={cn(
          ` w-full h-full block pointer-events-none relative`,
          isSelected ? ` top-0 left-0 right-0 px-1 py-16 sm:px-10 sm:pt-24 fixed overflow-y-scroll z-50 block` : ``
        )}
      >
        <motion.div
          ref={cardRef}
          className={cn(
            "pointer-events-auto h-full w-full my-0 mx-auto relative",
            isSelected? 'h-auto max-w-[1024px]':''
          )}
          layout
          variants={variant}
          animate={isSelected ? "open" : "closed"}
          whileHover={{
            scale: isSelected ? 1 : 1.02
          }}
        >
          <BSMap
            bsMap={bsMap} mode={isSelected ? 'detail' : 'overview'}
            onContentUpdate={()=>{}}
            onSelect={()=>{setIsSelected(true)}}/>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default React.memo(WrappedBSMap)

