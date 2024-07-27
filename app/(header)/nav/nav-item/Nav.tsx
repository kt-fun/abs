'use client'
import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigation-menu";
import * as React from "react";
import {HeaderMenuItem} from "./HeaderMenuItem";
import {navLinks} from "../navItems";

const  Nav = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>)=> {
  return (
    <NavigationMenu asChild >
      <div {...props}>
        <NavigationMenuList>
          {
            navLinks.map(item=><HeaderMenuItem navItem={item} key={item.label}/>)
          }
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  )
}

export default Nav