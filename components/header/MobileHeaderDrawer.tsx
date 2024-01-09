'use client'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { IconButton, Tooltip } from "@radix-ui/themes"
import { HeaderProductLink, useMobileMenuContext } from "./Header";

  
  export default function MobileHeaderDrawer() {
    const mobileMenu = useMobileMenuContext();
    return (
        <Sheet>
        <SheetTrigger>
            <IconButton
                size="3"
                variant="ghost"
                color="gray"
                data-state={mobileMenu.open ? 'open' : 'closed'}
                onClick={() => mobileMenu.setOpen((open:boolean) => !open)}
                >
            <HamburgerMenuIcon width="16" height="16" />
            </IconButton>
        </SheetTrigger>
        <SheetContent>
            <div className="flex flex-col py-2 space-y-2">
            <HeaderProductLink href="/map" label='beatmap'/>
            <HeaderProductLink href="/playlist" label='playlist'/>
            <HeaderProductLink href="/mapper" label='mapper'/>
            </div>
        </SheetContent>
        </Sheet>

    )
  }