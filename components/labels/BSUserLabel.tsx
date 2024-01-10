'use client'
import { BSUser } from "@/interfaces/beatsaver-user";
import { Box, Flex, Link, Tooltip,Text, Responsive,HoverCard, Inset } from "@radix-ui/themes";
import MapperAvatar from "@/components/mapper-avatar";
import { ClientOnly } from "../ClientOnly";
import BSUserDetailCard from "../BSUserDetialCard";
import { TextSize } from "@/interfaces/text-size";
import { motion } from "framer-motion";
const truncated = (text:string) => {
    if (text.length > 15) {
        return text.substring(0,15) + '...'
    }
    return text
}
export default function BSUserLabel(
    {user,size,tooltip}:{user:BSUser,size?:TextSize,tooltip?:string}
){
    return (
        <>
            <HoverCard.Root>
                <HoverCard.Trigger>
                    <Link href={`/mapper/${user.id}`}>
                        <Box className="flex items-center  cursor-pointer">
                            <MapperAvatar src={user.avatar} verified={user.verifiedMapper}/>
                            <Text className='my-auto' size={size}>{truncated(user.name)}</Text>
                        </Box>
                    </Link>
                </HoverCard.Trigger>
                <HoverCard.Content>
                    <Inset className="max-w-[320px]">
                        <BSUserDetailCard user={user} />
                    </Inset>
                </HoverCard.Content>
            </HoverCard.Root>
        </>
    )
}