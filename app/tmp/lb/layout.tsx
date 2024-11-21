import React, {Suspense} from "react";
import dynamic from "next/dynamic";
const DynamicOps = dynamic(()=> import('@/app/tmp/lb/ops'), {
  loading: () => <p>Loading...</p>,
})
export default function Layout(
  { children }: { children?: React.ReactNode },
) {


  const data = {
    background: "https://loliapi.com/acg/pe",
    size: 20,
  }
  return (
    <div className="flex h-full flex-col  md:overflow-hidden">
        <DynamicOps/>
      {/*<OpsPanelContext.Provider value={data}>*/}
        <div className="flex-grow md:overflow-y-auto my-2">{children}</div>
      {/*</OpsPanelContext.Provider>*/}
    {/**/}
    </div>

  )
}



