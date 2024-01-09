'use client'
import BSMapper from "@/components/BSMapper";
import BSPlaylist from "@/components/BSPlaylist";
import BSMap from "@/components/bs-map";
import { useBSUser } from "@/hooks/api/useBSUser";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { usePagingBSUser } from "@/hooks/api/usePagingBSUser";
import { FetchingType, usePagingBSUserMap } from "@/hooks/api/usePagingBSUserMap";
import { usePagingBSUserPlaylist } from "@/hooks/api/usePagingBSUserPlaylist";
import { usePagingBSUserReview } from "@/hooks/api/usePagingBSUserReview";
import { BSUser, BSUserWithStats } from "@/interfaces/beatsaver-user";
import { Card, Link, Text } from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BSMapperSideBar from "@/components/BSMapperSideBar";
import BSUserLabel from "@/components/labels/BSUserLabel";
import MapperAvatar from "@/components/mapper-avatar";
import NextLink from "next/link";
import DateLabel from "@/components/labels/DateLabel";
import { FcLike } from "react-icons/fc";
import { BsHeartbreak } from "react-icons/bs";
import { TbMoodNeutral } from "react-icons/tb";
const MapListTab = (
  {
    userId,
    fetchingType
  }: {
    userId:string,
    fetchingType:FetchingType
  }
) => {
  const { maps,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserMap(fetchingType as FetchingType,userId);
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  return (
    <div className=" grid grid-cols-2 gap-2">
    {maps.map(
      (map) => {
        return (
          <BSMap key={map.id} bsMap={map}/>
        );
      })
    }
    </div>

  )
}

const PlaylistsTab = (
  {
    userId
  }: {
    userId:string
  }
) => {
  const { playlists,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserPlaylist(userId);
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  return (
    <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
    {playlists.map(
      (playlist) => {
        return (
          <BSPlaylist key={playlist.playlistId} bsPlaylist={playlist}/>
        );
      })
    }
    </div>
  )
}
const ReviewsTab = (
  {
    userId
  }: {
    userId:string
  }
) => {
  const { reviews,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserReview(userId);
  const {reachedBottom,showScrollToTop, scrollToTop} = useInfinityScroll();
  useEffect(()=>{
    if (reachedBottom && !isLoadingMore && !isEmpty && hasMore){
      loadMore();
    }
  },[reachedBottom,isLoadingMore,isEmpty,hasMore,loadMore])
  return (
    <div className="grid gap-2">
    
    {  reviews.map(
      (review) => {
        return (
          <div key={review.id}>
            <Card>
              <div className="flex space-x-2 items-center">
                <Text>
                {
                  review.sentiment == "POSITIVE" && <FcLike/>
                }
                {
                  review.sentiment == "NEGATIVE" && <BsHeartbreak/>
                }
                {
                  review.sentiment == "NEUTRAL" && <TbMoodNeutral/>
                }
                </Text>
                <NextLink href={`/map/${review.map?.id}`}>
                  <Link>
                  <Text>{review.map?.name}</Text>
                  </Link>
                </NextLink>
                <DateLabel date={review.createdAt}/>
              </div>
              <div>
              {review.text}
              </div>
            </Card>

          </div>
        );
      })
    }
    </div>
  )
}

export default function MapperDetailPage({ params }: { params: { id: number } }) {

    const {bsUserWithStats, isLoading, error} = useBSUser(params.id)
    const router = useRouter()
    if(error) {
      console.log(error)
      router.push("/")
    }
    const handleTabChange = (value:string) => {
    }

    return isLoading?(
      <>
      <div>isLoading</div>
      </>
    )
    :
    (
      <>
      <div className="flex max-w-[1200px] grow space-x-2">
          <Tabs.Root className="flex flex-col  mx-auto h-full w-full"  defaultValue="Published" onValueChange={handleTabChange}>
                <Tabs.List className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mx-auto space-x-2 mb-2" aria-label="">
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Published">
                        <div>Published</div>
                    </Tabs.Trigger>
                    {
                      false && <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="WIP">
                          <div>UnPublished</div>
                      </Tabs.Trigger>
                    }
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Curated">
                        <div>Curated</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Playlists">
                        <div>Playlists</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Reviews">
                        <div>Reviews</div>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="" value="Published">
                  <MapListTab userId={params.id.toString()} fetchingType="Published"/>
                </Tabs.Content>
                {
                  false && 
                  <Tabs.Content className="" value="WIP">
                    <MapListTab userId={params.id.toString()} fetchingType="WIP"/>
                  </Tabs.Content>
                }
                <Tabs.Content className="" value="Curated">
                <MapListTab userId={params.id.toString()} fetchingType="Curated"/>
                </Tabs.Content> 
                <Tabs.Content className="" value="Reviews">
                <ReviewsTab userId={params.id.toString()}/>
                </Tabs.Content>
                <Tabs.Content className="" value="Playlists">
                <PlaylistsTab userId={params.id.toString()}/>
                </Tabs.Content>
          </Tabs.Root>
          <div className="hidden lg:block sticky top-28 justify-center w-[320px] grow-0 h-fit">
            <BSMapperSideBar bsMapper={bsUserWithStats}/>  
          </div>
      </div>

      </>
    )
}