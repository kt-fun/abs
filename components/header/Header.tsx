import * as React from 'react';
import ThemeButton from './ThemeButton';
import Link from "@/components/ui/link";
import Nav from "@/components/header/nav/nav-item/Nav";
import MobileNav from "@/components/header/nav/mobile-nav-item/mobileNav";
import I18NButton from "@/components/header/i18nButton";

export const Header = () => {
  return (
      <header
        className='w-full px-4 md:px-8 h-full top-0 z-20 sticky bg-base-light dark:bg-base-dark'
      >
        <div className='h-16 flex justify-between items-center max-w-[1200px] mx-auto'>
          <div className='flex items-center space-x-2'>
            <Link href="/" className="hover:no-underline">
                <div className="font-semibold text-2xl cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-red-500 to-blue-500">
                  AIOSaber
                </div>
            </Link>
            <Nav className='hidden md:flex items-center space-x-2'/>
          </div>
            <div className='hidden md:flex space-x-2 items-center'>
              {/*<UserNav/>*/}
              <I18NButton/>
              <ThemeButton />
            </div>
          <div className='flex md:hidden space-x-2 items-center'>
            {/*<div className="w-10 h-10 ">*/}
            {/*  <UserNav/>*/}
            {/*</div>*/}
            <I18NButton/>
            <ThemeButton/>
            <MobileNav/>
          </div>
        </div>
      </header>
  );
};