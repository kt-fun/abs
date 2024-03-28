import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import * as React from "react";
import {NavItem} from "@/components/header/nav/navItems";
import HeaderItem, {Item} from "@/components/header/nav/mobile-nav-item/HeaderItem";
import {useTranslation} from "@/hooks/useTranslation";



export const CollapsibleItem = (
{
  navItem
}:{
  navItem:NavItem
}
)=> {

  const {t} = useTranslation('common')
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <motion.div
    >

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={"flex items-center justify-between w-full"}
      >
        <Item item={navItem}/>
        <span>
            <ChevronsUpDown className="h-4 w-4"/>
            <span className="sr-only">{t('header.toggle')}</span>
          </span>
      </button>
      <AnimatePresence>
        {

          isOpen &&
            <motion.ul
                layout
                initial={{height: 0, opacity: 0}}
                animate={{height: 'auto', opacity: 1}}
                exit={{height: 0, opacity: 0}}
                className={"pl-4 space-y-2 pt-2 text-current/70"}
            >
              {
                navItem.children && navItem.children.map(it => {
                    return it.href && <HeaderItem item={it} key={it.id} className={" font-normal leading-tight "}/>
                  }
                )
              }
            </motion.ul>
        }
      </AnimatePresence>
    </motion.div>
  )
}