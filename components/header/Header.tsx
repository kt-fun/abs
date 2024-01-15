'use client'
import * as React from 'react';

import { usePathname } from 'next/navigation'
import ThemeButton from './ThemeButton';
import HeaderHelpMenu from './HeaderHelpMenu';
import MobileHeaderDrawer from './MobileHeaderDrawer';
import Link from "@/components/ui/link";
import UserNav from "@/components/header/UserNav";

export const useMobileMenuContext = () => {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
};

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

export const Header = () => {
  const mobileMenu = useMobileMenuContext();
  const [scrollState, setScrollState] = React.useState<ScrollState>('at-top');
  return (
      <header
        data-scroll-state={scrollState}
        data-mobile-menu-open={mobileMenu.open}
        className='w-full px-4 md:px-20 h-16 top-0 z-50 sticky backdrop-blur-2xl '
      >
        <div className='h-full flex justify-between items-center max-w-[1400px] mx-auto'>
            <div className='flex items-center space-x-2'>
              <Link href="/" className="hover:no-underline">
                  <div className="font-bold text-2xl cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-red-500 to-blue-500">Another BeatSaver</div>
              </Link>
              <div className='hidden md:flex items-center space-x-2'>
                <HeaderLink href="/map" label='beatmap'/>
                <HeaderLink href="/playlist" label='playlist'/>
                <HeaderLink href="/mapper" label='mapper'/>
                <div className='hidden md:flex'>
                  <HeaderHelpMenu/>
                </div>
              </div>
            </div>
            <div className='hidden md:flex space-x-2 items-center'>
              {/*<UserNav/>*/}
              <ThemeButton />
            </div>
            <div className='flex md:hidden space-x-2 items-center'>
              {/*<div className="w-10 h-10 ">*/}
              {/*  <UserNav/>*/}
              {/*</div>*/}
              <ThemeButton/>
              <MobileHeaderDrawer />
            </div>
        </div>
      </header>
  );
};

export const HeaderLink = ({
  children,
  label,
  href = '',  
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { label: string }) => {
  const active = usePathname() === href;
  return (
    <Link href={href} passHref legacyBehavior>
  
    <div className={`hover:bg-gradient-to-r ${active?'bg-gradient-to-r text-white':''} cursor-pointer from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold`}>
        <a data-state={active ? 'active' : 'inactive'} {...props}>
          <span className={`px-2 py-1 rounded-full  from-red-500 to-blue-500 text-xl`}>{label}</span>
          <span className="sr-only">{label}</span>
        </a>
      </div>
  
    </Link>
  );
}