import { Skeleton } from "@/components/ui/skeleton"
import { Box, Card, Flex, Inset,Text } from "@radix-ui/themes"
import BSLabel from "./labels/BSLabel"
import DateLabel from "./labels/DateLabel"
import BSMapAmountLabel from "./labels/BSMapAmount"
import { CiStar } from "react-icons/ci"

export default function BSPlaylistSkeleton() {
    return (
        <>
        <Card className=" group flex flex-col w-[320px] h-full xl:w-[256px]" >
                <Inset clip="padding-box" side="top" pb="current">
                <Skeleton className="h-[256px] w-[256px] rounded-l-md" />
                </Inset>
                {/* <Skeleton className="max-w-[200px] rounded-l-md" /> */}

                <div className="flex justify-between items-center invisible">
                    <span className="font-semibold text-lg line-clamp-1 text-ellipsis">
                        <Text>{"bsPlaylist.name"}</Text>
                    </span>
                    <Text>s</Text>
                    {/* <BSUserLabel user={bsPlaylist.owner}/> */}
                </div>
                <div className="flex items-center justify-between pr-2 invisible">
                        <DateLabel date={"2024-01-04T03:48:16.848015Z"} size={"1"}/>
                        <div className="flex items-center space-x-1 text-center">
                            <BSMapAmountLabel amount={0}  size={"1"}/>
                            <div className="flex items-center">
                                <CiStar/>
                                <Text className="pl-1" size="1" weight="medium">{89.3}%</Text>
                            </div>
                        </div>
                </div>
        </Card>
        </>
    )
}