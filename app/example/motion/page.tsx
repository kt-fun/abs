
'use client'
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function Home() {
  const container = {
    hidden: { opacity: 1,transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 1, delayChildren: 1
      }
    }
  }

  const item = {
    hidden: {
      y: 50,
      opacity: 0,
      transition: (i:number)=>({
        y: { stiffness: 1000 },
        delay: i
      })
    },
    show: (i : number)=>{
      return {
        y: 0,
        opacity: 1,
        transition: {
          y: {stiffness: 1000},
          delay: i
        }
      }
    }
  }

  const [maps,setMaps]= useState<string[]>([])
  useEffect(()=>{
    const ite = Array.from([1,2,3,4,5]).map((item)=>item.toString())
    setTimeout(()=>{
      setMaps(ite)
    },100)
  })
  return (
    <div>
      <motion.ul
        variants={container}
        initial={'hidden'}
        animate={'show'}
        className="">
        {
          maps.map((id:string, i:number) => {
            return (
              <motion.li
                custom={i}
                key={id}
                variants={item}
              >
                {id}
              </motion.li>
            );
          })
        }
      </motion.ul>
    </div>
  )

}