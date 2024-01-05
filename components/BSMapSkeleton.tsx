import { Skeleton } from "@/components/ui/skeleton"
import { Box, Card, Flex, Inset,Text } from "@radix-ui/themes"

export default function BSMapSkeleton() {
    return (
        <>
        <Card className="shadow-md max-h-[200px]">
            <Flex className='h-full'>
                <Inset side="left" className='min-w-[200px] max-w-[200px]'>
                <Skeleton className="h-[200px] w-[200px] rounded-l-md" />
                </Inset>
                <Box className="h-full flex flex-col pl-2">
                <Skeleton className="max-w-[200px] rounded-l-md" />
                        <Text
                        size="4"
                        className="overflow-ellipsis line-clamp-1 invisible"
                        >{"ツクモの契 feat. 重音テトdss"}</Text>
                </Box>

            </Flex>
        </Card>
        </>
    )
}