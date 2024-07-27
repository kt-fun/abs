import React from "react";
import NextLink from "next/link";
import {LinkProps} from "next/link";
import {cn} from "@/lib/utils";

const Link = React.forwardRef((
  {
    children,
    className,
    target,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
    className?: string;
  } & LinkProps,
  ref
)=> {
  return(
    <NextLink {...props} className={cn("", className)} target={target} ref={ref as any}>
      {children}
    </NextLink>
  )
})

Link.displayName = "Link";

export default Link;