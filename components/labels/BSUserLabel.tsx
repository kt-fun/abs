'use client'
import { BSUser } from "@/interfaces/beatsaver-user";
import { Box, Flex, HoverCard, Link, Tooltip,Text, Responsive } from "@radix-ui/themes";
import MapperAvatar from "@/components/mapper-avatar";
import { ClientOnly } from "../ClientOnly";
import BSUserDetailCard from "../BSUserDetialCard";
import { TextSize } from "@/interfaces/text-size";
const truncated = (text:string) => {
    if (text.length > 8) {
        return text.substring(0,8) + '...'
    }
    return text
}
export default function BSUserLabel(
    {user,size}:{user:BSUser,size?:TextSize}
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
                    <BSUserDetailCard user={user} />
                </HoverCard.Content>
            </HoverCard.Root>
        </>
    )
}