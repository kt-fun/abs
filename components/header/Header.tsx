'use client'
import * as React from 'react';
import { AccessibleIcon, Flex, IconButton, Text, Theme, Tooltip } from '@radix-ui/themes';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import ThemeButton from './ThemeButton';
import HeaderHelpMenu from './HeaderHelpMenu';
import UserNav from './UserNav';
import MobileHeaderDrawer from './MobileHeaderDrawer';

export interface HeaderProps {
  gitHubLink?: string;
  ghost?: boolean;
}

export const useMobileMenuContext = () => {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
};

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

export const Header = ({gitHubLink, ghost }: HeaderProps) => {
  const mobileMenu = useMobileMenuContext();
  const pathname = usePathname();
  const [scrollState, setScrollState] = React.useState<ScrollState>('at-top');

  React.useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const direction = previousScrollY < window.scrollY ? 'scrolling-down' : 'scrolling-up';
      const state = window.scrollY < 30 ? 'at-top' : direction;
      previousScrollY = window.scrollY;
      setScrollState(state);
    };

    if (ghost) {
      addEventListener('scroll', handleScroll, { passive: true });
    } else {
      removeEventListener('scroll', handleScroll);
    }

    handleScroll();
    return () => removeEventListener('scroll', handleScroll);
  }, [ghost]);

  interface NavItem {
    href: string;
    label: string;
  }

  return (
      <header
        data-scroll-state={scrollState}
        data-mobile-menu-open={mobileMenu.open}
        className='w-full px-4 md:px-20 h-16 top-0 z-50 sticky backdrop-blur-2xl '
      >
        <div className='h-full flex justify-between items-center max-w-[1400px] mx-auto'>
          <div className='flex items-center space-x-2'>
                <NextLink href="/">
                  <AccessibleIcon label="ABS">
                    <Text size="6" weight="bold" className="cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-red-500 to-blue-500">Another BeatSaver</Text>
                  </AccessibleIcon>
                </NextLink>
                <div className='hidden md:flex items-center space-x-2'>
                  <HeaderProductLink href="/map" label='beatmap'/>
                  <HeaderProductLink href="/playlist" label='playlist'/>
                  <HeaderProductLink href="/mapper" label='mapper'/>
                  <div className='hidden md:flex'>
                    <HeaderHelpMenu/>
                  </div>
          </div>
          </div>

          <div className='flex space-x-4 items-center '>
            {/* {<UserNav/>} */}
            <div className='hidden md:flex'>
                <ThemeButton />
            </div>

            <div className='flex md:hidden space-x-4'>
                <ThemeButton />
                <MobileHeaderDrawer />
            </div>
          </div>

        </div>


      </header>
  );
};

export const HeaderProductLink = ({
  children,
  label,
  href = '',  
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { label: string }) => {
  const active = usePathname() === href;
  return (
    <NextLink href={href} passHref legacyBehavior>
  
    <div className={`hover:bg-gradient-to-r ${active?'bg-gradient-to-r text-white':''} cursor-pointer from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold`}>
        <a data-state={active ? 'active' : 'inactive'} {...props}>
          <span className={`px-2 py-1 rounded-full  from-red-500 to-blue-500`}><Text size={"4"}>{label}</Text></span>
          <span className="hidden"><Text size={"4"}>{label}</Text></span>
        </a>
      </div>
  
    </NextLink>
  );
}