'use client'
import * as React from 'react';
import { AccessibleIcon, Flex, IconButton, Text, Theme, Tooltip } from '@radix-ui/themes';
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import ThemeButton from './ThemeButton';
import HeaderHelpMenu from './HeaderHelpMenu';

export interface HeaderProps {
  gitHubLink?: string;
  ghost?: boolean;
}

const useMobileMenuContext = () => {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
};

type ScrollState = 'at-top' | 'scrolling-up' | 'scrolling-down';

export const Header = ({gitHubLink, ghost }: HeaderProps) => {
  const mobileMenu = useMobileMenuContext();
  const router = useRouter();
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

  return (
      <header
        data-scroll-state={scrollState}
        data-mobile-menu-open={mobileMenu.open}
        className='w-full px-20 h-16 top-0 z-50'
      >
        <div className='h-full flex justify-between items-center'>
            
          <div className='hidden md:flex items-center'>
                <NextLink href="/">
                  <AccessibleIcon label="ABS">
                    <Text size="6" weight="bold" className="cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-red-500 to-blue-500">Another BeatSaver</Text>
                  </AccessibleIcon>
                </NextLink>
          </div>
          <div className='hidden md:flex items-center'>
            <HeaderProductLink
              href="/map"
              active={ pathname === '/map' }
            >beatmap</HeaderProductLink>
            <HeaderProductLink
              href="/playlist"
              active={ pathname === '/playlist' }
            >playlist</HeaderProductLink>
            <HeaderProductLink 
              href="/mapper" 
              active={pathname === '/mapper'}
            >mapper</HeaderProductLink>
          </div>
          <div className='flex space-x-4 items-center'>
            <div className='hidden md:flex'>
              <Tooltip className="" content="View GitHub ">
                <div>Login</div>
              </Tooltip>
              </div>
            <div className='hidden md:flex'>
            <HeaderHelpMenu/>
            </div>

            <div className='hidden md:flex'>
                {gitHubLink && (
                <Tooltip  content="View GitHub">
                    <IconButton asChild size="3" variant="ghost" color="gray">
                    <a href={gitHubLink} target="_blank">
                        <GitHubLogoIcon width="16" height="16" />
                    </a>
                    </IconButton>
                </Tooltip>
                )}
                <ThemeButton />
            </div>

            <div className='flex md:hidden'>
                <ThemeButton />
                <Tooltip className="radix-themes-custom-fonts" content="Navigation">
                    <IconButton
                        size="3"
                        variant="ghost"
                        color="gray"
                        data-state={mobileMenu.open ? 'open' : 'closed'}
                        onClick={() => mobileMenu.setOpen((open:boolean) => !open)}
                        >
                    <HamburgerMenuIcon width="16" height="16" />
                    </IconButton>
                </Tooltip>
            </div>
          </div>

        </div>


      </header>
  );
};

const HeaderProductLink = ({
  active,
  children,
  href = '',
  ...props
}: React.ComponentPropsWithoutRef<'a'> & { active?: boolean }) => (
  <NextLink href={href} passHref legacyBehavior>
    <a data-state={active ? 'active' : 'inactive'} {...props}>
      <span className={`px-2 font-medium text-base rounded-lg ${active?'bg-gradient-to-r text-white':''} from-red-500 to-blue-500`}>{children}</span>
      <span className="hidden">{children}</span>
    </a>
  </NextLink>
);