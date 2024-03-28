'use client'
import {useCallback, useState} from "react";
import {motion, Variants} from "framer-motion";
import * as React from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {Languages} from "lucide-react";
import {switchLocaleAction} from "@/lib/i18n/switch-locale";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

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

const languages = [
  {
    locale: "en",
    id:"english"
  },
  {
    locale: "zh-CN",
    id:"chinese"
  }
]

export default function I18NButton() {
  const {i18n, t} = useTranslation('common');
  // const value =
  const [open,setOpen] = useState(false)
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <motion.span
            onClick={() => {
              setOpen(!open)
            }}
            className={"relative h-6 w-6 items-center inline-flex justify-center"}
          >
            <span className="sr-only">Toggle language</span>
            <Languages className={'h-4 w-4'}/>
          </motion.span>
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <motion.ul
            className={"absolute bg-zinc-100/70  dark:bg-zinc-700/70 backdrop-blur-2xl  w-52 p-2 cursor-pointer border-none shadow-none rounded-lg left-auto top-full right-0"}
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            variants={variants}
          >
            {
              languages.map(lang => {
                return (
                  <motion.li
                    key={lang.id}
                    onClick={() => {
                      switchLocaleAction(lang.locale)
                    }}
                    className={cn(
                      "px-4 py-2 my-0.5 font-medium cursor-pointer hover:bg-zinc-300 rounded-lg transition-colors hover:text-slate-900 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:text-slate-50 dark:focus:text-slate-50",
                      i18n.resolvedLanguage == lang.locale ? 'bg-zinc-200/70 ' : '')}
                    variants={itemVariants}
                  >
                    {t(lang.id)}
                  </motion.li>
                )
              })
            }
          </motion.ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}