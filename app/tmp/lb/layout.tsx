import React from "react";
export default function Layout(
  { children }: { children?: React.ReactNode },
) {
  return (
    <div className="flex h-full flex-col  md:overflow-hidden">
        <div className="flex-grow md:overflow-y-auto my-2">{children}</div>
    </div>

  )
}



