"use client"
import React, {useRef} from "react";
import dynamic from "next/dynamic";
import { OpsPanelContext } from "./optsPanel";
import {useRandomBackground} from "@/hooks/useBackground";
const DynamicOps = dynamic(()=> import('@/app/tmp/lb/client/ops'), {
  loading: () => <p>Loading...</p>,
})
export default function Layout(
  { children }: { children?: React.ReactNode },
) {
  const randombgOps = useRandomBackground()
  const data = {
    background: randombgOps.background,
    size: 20
  }
  const ref = useRef(null)
  return (
    <div className="flex h-full flex-col  md:overflow-hidden">
      <DynamicOps randombgOps={randombgOps} elementRef={ref}/>
      <OpsPanelContext.Provider value={data}>
        <div className="flex-grow md:overflow-y-auto my-2" ref={ref}>{children}</div>
      </OpsPanelContext.Provider>

    </div>

  )
}



