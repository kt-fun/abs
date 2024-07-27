import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "@/components/ui/link";
import * as React from "react";
import {AnimatePresence, HTMLMotionProps, motion, Variants} from "framer-motion";
import {cn} from "@/lib/utils";
import {NavItem} from "../navItems";
import {useTranslation} from "@/hooks/useTranslation";

const variants:Variants = {
  open: {
    opacity: 1,
    y: 5,
    transition: {
      type: "spring",
      duration: 0.2,
      bounce:0.1,
      damping:8,
      staggerChildren: 0.05, delayChildren: 0.01
    },
  },
  closed: {
    opacity: 0,
    y:-10,
    transition: {
      type: "spring",
      duration: 0.2,
    }
  }
};
const itemVariants:Variants = {
  open:  {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.5,

    }
  },
  closed: {
    opacity: 0,
    y:-10,
    transition: {
      type: "tween",
      duration: 0.5,
    }
  },
};
const Item = React.forwardRef((
  {
    navItem,
    ...rest
  }:{
    navItem:NavItem
  } & HTMLMotionProps<'li'>,
  ref
)=> {

  const {t} = useTranslation('common')
  return (
    <NavigationMenuItem asChild className={'cursor-pointer'}>
      <motion.li {...rest}>
        <Link href={navItem.href!} legacyBehavior passHref>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'cursor-pointer flex w-full text-center font-light font-sans')}>
            <span className={'inline-block'}>{t(navItem.id)}</span>
          </NavigationMenuLink>
        </Link>
      </motion.li>
    </NavigationMenuItem>
  )
})
Item.displayName = "HeaderMenuSubItem"
export const HeaderMenuItem = (
{
navItem
}:{
navItem:NavItem
}
) => {

  const {t} = useTranslation('common')
  return (
    <>
      {navItem.href && <Item navItem={navItem} className={'hover:bg-zinc-200/60 hover:dark:bg-zinc-800/60 rounded-lg  text-lg'}/>}
      {
        !navItem.href && navItem.children &&
          <NavigationMenuItem className={'relative'} >
                  <NavigationMenuTrigger className={"text-lg  font-light"}>
                    {t(navItem.id)}
                  </NavigationMenuTrigger>
              <AnimatePresence>
                  <NavigationMenuContent asChild
                                         className={'border-none shadow-none rounded-lg left-auto top-full right-0 absolute'} >

                      <motion.ul
                          className={"min-w-56 backdrop-blur bg-zinc-100/70 dark:bg-zinc-700/70 w-52"}
                          initial={'closed'}
                          animate={'open'}
                          exit={'closed'}
                          variants={variants}
                      >
                        {
                          navItem.children.map(child =>
                            <Item
                              navItem={child}
                              key={child.href}
                              className={'hover:bg-zinc-200/60 hover:dark:bg-zinc-800/60 rounded-lg px-2 py-1 m-1'}
                              variants={itemVariants}
                            />
                          )
                        }
                      </motion.ul>

                  </NavigationMenuContent>

              </AnimatePresence>
          </NavigationMenuItem>
      }
    </>
  )

}