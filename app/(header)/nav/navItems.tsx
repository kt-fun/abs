import React from 'react';
import { FaDiscord } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";

export const helpMenuList = [
    {
        id:"header.nav.help.discord.beatsaver",
        href: "https://discord.gg/rjVDapkMmj",
        icon: <FaDiscord className="mr-2" />
    },
    {
        id:"header.nav.help.bsmg.wiki",
        // label: "BSMG Wiki",
        href: "https://bsmg.wiki/",
        icon: <FaDiscord className="mr-2" />
    },
    {
        id:"header.nav.help.discord.bsmg",
        label: "BSMG",
        href: "https://discord.gg/beatsabermods",
        icon: <FaDiscord className="mr-2" />
    },
    {
        id:"header.nav.help.dmca",
        label: "DMCA Policy",
        href: "https://beatsaver.com/dmca",
        icon: <CiLock className="mr-2"/>
    },
    {
        id:"header.nav.help.tos",
        label: "Term Of Service",
        href: "https://beatsaver.com/policy/tos",
        icon: <CiViewList className="mr-2"/>
    },
    {
        id:"header.nav.help.pp",
        label: "Privacy Policy",
        href: "https://beatsaver.com/policy/privacy",
        icon: <MdOutlinePrivacyTip className="mr-2"/>
    },
    {
        id:"header.nav.help.github",
        label: "GitHub",
        href: "https://github.com/ktKongTong/abs",
        icon: <FaGithub className="mr-2" />
    }
]

export const navLinks = [
    {
        id:"header.nav.beatmap",
        href: '/map',
        label: 'Beatmap',
    },
    {
        id:"header.nav.playlist",
        href: '/playlist',
        label: 'Playlist',
    },
    {
        id:"header.nav.mapper",
        href: '/mapper',
        label: 'Mapper',
    },
    {
        id:"header.nav.help.self",
        label: 'Help',
        children: helpMenuList
    }
]
export type NavItem = {
    // label:string,
    id: string,
    icon?: React.ReactNode,
    href?: string,
    children?: NavItem[]
}