
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon, DiscIcon } from '@radix-ui/react-icons';
import React from 'react';
import Link from 'next/link';
import { HoverCard } from '@radix-ui/themes';
import { FaDiscord } from "react-icons/fa";

export default function HeaderHelpMenu() {
return (
<HoverCard.Root>
    <HoverCard.Trigger className="">
        <div className='flex space-x-2 items-center'>
            Help <CaretDownIcon aria-hidden />
        </div>
    </HoverCard.Trigger>
    <HoverCard.Content>
        <ul className="Help List">
                <li>
                    <Link className="flex space-x-2 items-center" href={"/helper"}>
                        <FaDiscord className="mr-2" /> BeatSaver
                    </Link>
                </li>
                <li>
                    <Link className="flex space-x-2 items-center" href={"/helper"}>
                        <FaDiscord className="mr-2" /> BSMG Wiki
                    </Link>
                </li>
                <li>
                    <Link className="flex space-x-2 items-center" href={"/helper"}>
                        <FaDiscord className="mr-2" /> BSMG
                    </Link>
                </li>
                <li>
                    <Link className="flex space-x-2 items-center" href={"/helper"}>
                        <FaDiscord className="mr-2" /> About
                    </Link>
                </li>
                <li>
                    <Link className="" href={"/helper"}>
                        DMCA Policy
                    </Link>
                </li>
                <li>
                    <Link className="" href={"/helper"}>
                        Term Of Service
                    </Link>
                </li>
                <li>
                    <Link className="" href={"/helper"}>
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link className="" href={"/helper"}>
                        Term Of Service
                    </Link>
                </li>
        </ul>
    </HoverCard.Content>
</HoverCard.Root>
);
}