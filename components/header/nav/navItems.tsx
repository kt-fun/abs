import React from 'react';
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";

export const helpMenuList = [
    {
        label: "BeatSaver",
        href: "https://discord.gg/rjVDapkMmj",
        icon: <FaDiscord className="mr-2" />
    },
    {
        label: "BSMG Wiki",
        href: "https://bsmg.wiki/",
        icon: <FaDiscord className="mr-2" />
    },
    {
        label: "BSMG",
        href: "https://discord.gg/beatsabermods",
        icon: <FaDiscord className="mr-2" />
    },
    {
        label: "DMCA Policy",
        href: "https://beatsaver.com/dmca",
        icon: <CiLock className="mr-2"/>
    },
    {
        label: "Term Of Service",
        href: "https://beatsaver.com/policy/tos",
        icon: <CiViewList className="mr-2"/>
    },
    {
        label: "Privacy Policy",
        href: "https://beatsaver.com/policy/privacy",
        icon: <MdOutlinePrivacyTip className="mr-2"/>
    },
    {
        label: "GitHub",
        href: "https://github.com/ktKongTong/abs",
        icon: <FaGithub className="mr-2" />
    }
]

export const navLinks = [
    {
        href: '/map',
        label: 'Beatmap',
    },
    {
        href: '/playlist',
        label: 'Playlist',
    },
    {
        href: '/mapper',
        label: 'Mapper',
    },
    {
        label: 'Help',
        children: helpMenuList
    }
]
export type NavItem = {
    label:string,
    icon?: React.ReactNode,
    href?: string,
    children?: NavItem[]
}