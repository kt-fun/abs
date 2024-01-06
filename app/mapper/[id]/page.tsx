'use client'
import BSMapper from "@/components/BSMapper";
import BSPlaylist from "@/components/BSPlaylist";
import BSMap from "@/components/bs-map";
import { useBSUser } from "@/hooks/useBSUser";
import { usePagingBSUser } from "@/hooks/usePagingBSUser";
import { FetchingType, usePagingBSUserMap } from "@/hooks/usePagingBSUserMap";
import { usePagingBSUserPlaylist } from "@/hooks/usePagingBSUserPlaylist";
import { usePagingBSUserReview } from "@/hooks/usePagingBSUserReview";
import { BSUser, BSUserWithStats } from "@/interfaces/beatsaver-user";
import { Card, Tabs } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  return (
    <>
    {maps.map(
      (map) => {
        return (
          <BSMap key={map.id} bsMap={map}/>
        );
      })
    }
    </>

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
  return (
    <>
    {playlists.map(
      (playlist) => {
        return (
          <BSPlaylist key={playlist.playlistId} bsPlaylist={playlist}/>
        );
      })
    }
    </>

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
  return (
    <>
    {reviews.map(
      (review) => {
        return (
          <div key={review.id}>
            {review.text}
          </div>
        );
      })
    }
    </>
  )
}

export default function MapperDetailPage({ params }: { params: { id: number } }) {

    const {bsUserWithStats, isLoading, error} = useBSUser(params.id)
    const router = useRouter()
    if(error) {
      router.push("/")
    }
    const handleTabChange = (value:string) => {
    }

    return (
      <>
      <div className="flex-cols flex max-w-[1200px]  space-x-2">
        <Card>
          <Tabs.Root className="flex flex-col  mx-auto h-full w-full"  defaultValue="Published" onValueChange={handleTabChange}>
                <Tabs.List className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mx-auto space-x-2 mb-2" aria-label="">
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Published">
                        <div>Published</div>
                    </Tabs.Trigger>
                    
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="WIP">
                        <div>UnPublished</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Curated">
                        <div>Curated</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Reviews">
                        <div>Reviews</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="Playlists">
                        <div>Playlists</div>
                    </Tabs.Trigger>
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="AccountSettings">
                        <div>AccountSettings</div>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="Published">
                  <MapListTab userId={params.id.toString()} fetchingType="Published"/>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="WIP">
                
                  <MapListTab userId={params.id.toString()} fetchingType="WIP"/>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="Curated">
                <MapListTab userId={params.id.toString()} fetchingType="Curated"/>
                </Tabs.Content> 
                <Tabs.Content className="TabsContent" value="Reviews">
                <ReviewsTab userId={params.id.toString()}/>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="Playlists">
                <PlaylistsTab userId={params.id.toString()}/>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="AccountSettings">
                <MapListTab userId={params.id.toString()} fetchingType="Curated"/>
                </Tabs.Content>                               
                </Tabs.Root>
        </Card>
        
      </div>

      </>
    )
}