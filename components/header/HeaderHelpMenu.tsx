
import { CaretDownIcon, DiscIcon } from '@radix-ui/react-icons';
import React from 'react';
import { HoverCard,HoverCardTrigger,HoverCardContent } from '@/components/ui/hover-card';
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import Link from "@/components/ui/link";
interface LinkProps {
    text: string;
    href: string;
    icon?: React.ReactNode;
}
const MenuItems = (
    {link}: {link: LinkProps}
) => {
    return (
        <li className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5'>
            <Link className="flex space-x-2 items-center text-sm font-semibold hover:text-white text-inherit hover:no-underline" href={link.href}>
                {link.icon} {link.text}
            </Link>
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
        text: "DMCA Policy",
        href: "https://beatsaver.com/dmca",
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
<HoverCard>
    <HoverCardTrigger className="">
        <div className='flex text-xl space-x-2 font-semibold items-center hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 cursor-default'>
            Help <CaretDownIcon aria-hidden />
        </div>
    </HoverCardTrigger>
    <HoverCardContent>
        <ul className="p-1">
            {
                menuList.map((link: LinkProps) => {
                    return (
                        <MenuItems key={link.text} link={link} />
                    )
                })
            }
        </ul>
    </HoverCardContent>
</HoverCard>
);
}