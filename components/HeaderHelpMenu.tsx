
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, DiscIcon } from '@radix-ui/react-icons';
import React from 'react';
import Link from 'next/link';
import { HoverCard } from '@radix-ui/themes';
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TbApi } from "react-icons/tb";
import { CiLock } from "react-icons/ci";
import { Text } from '@radix-ui/themes';
import { CiViewList } from "react-icons/ci";
import { text } from 'stream/consumers';
interface LinkProps {
    text: string;
    href: string;
    icon?: React.ReactNode;
}
const MenuItems = (
    {link}: {link: LinkProps}
) => {
    return (
        <li className='hover:bg-gray-300 rounded-full px-2 py-0.5'>
            <Text >
            <Link className="flex space-x-2 items-center text-sm font-semibold" href={link.href}>
                {link.icon} {link.text}
            </Link>
            </Text>
        </li>
    )
}

const menuList = [
    {
        text: "BeatSaver",
        href: "https://discord.gg/rjVDapkMmj",
        icon: <FaDiscord className="mr-2" />
    },
    {
        text: "BSMG Wiki",
        href: "https://bsmg.wiki/",
        icon: <FaDiscord className="mr-2" />
    },
    {
        text: "BSMG",
        href: "https://discord.gg/beatsabermods",
        icon: <FaDiscord className="mr-2" />
    },
    {
        text: "About",
        href: "/about",
        icon: <FaDiscord className="mr-2" />
    },
    {
        text: "DMCA Policy",
        href: "/helper",
        icon: <CiLock className="mr-2"/>
    },
    {
        text: "Term Of Service",
        href: "https://beatsaver.com/policy/tos",
        icon: <CiViewList className="mr-2"/>
    },
    {
        text: "Privacy Policy",
        href: "https://beatsaver.com/policy/privacy",
        icon: <MdOutlinePrivacyTip className="mr-2"/>
    },
    {
        text: "GitHub",
        href: "https://github.com/ktKongTong/abs",
        icon: <FaGithub className="mr-2" />
    }
]

export default function HeaderHelpMenu() {
return (
<HoverCard.Root>
    <HoverCard.Trigger className="">
        <Text size={"4"} className='flex space-x-2 font-semibold items-center hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 cursor-default'>
            Help <CaretDownIcon aria-hidden />
        </Text>
    </HoverCard.Trigger>
    <HoverCard.Content>
        <ul className="Help List">
            {
                menuList.map((link: LinkProps) => {
                    return (
                        <MenuItems key={link.text} link={link} />
                    )
                })
            }
        </ul>
    </HoverCard.Content>
</HoverCard.Root>
);
}