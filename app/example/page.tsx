
'use client'
import {useWindowScroll} from "react-use";

export default function Home() {


  const {y} = useWindowScroll()
  console.log(y)
  return (
    <div className={'h-[4096px] w-full from-red-500 to-blue-500 bg-gradient-to-b '}>
      <div className={"text-3xl text-white fixed"}>
        {y}
      </div>
    </div>
  )

}