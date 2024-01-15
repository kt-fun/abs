'use client'
import BSPlaylist from "@/components/BSPlaylist";
import BSMap from "@/components/BSMap";
import { useBSUser } from "@/hooks/api/useBSUser";
import { useInfinityScroll } from "@/hooks/useInfinityScroll";
import { FetchingType, usePagingBSUserMap } from "@/hooks/api/usePagingBSUserMap";
import { usePagingBSUserPlaylist } from "@/hooks/api/usePagingBSUserPlaylist";
import { usePagingBSUserReview } from "@/hooks/api/usePagingBSUserReview";
import  {Card} from "@/components/ui/card";
import Link from "@/components/ui/link";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BSMapperSideBar from "@/components/BSMapperSideBar";
import {DateLabel} from "@/components/labels/BSMapMetaLabels";
import { FcLike } from "react-icons/fc";
import { BsHeartbreak } from "react-icons/bs";
import { TbMoodNeutral } from "react-icons/tb";
import Loading from "@/components/load-status/Loading";
import ReachListEnd from "@/components/load-status/ReachListEnd";
import EmptyContent from "@/components/load-status/EmptyContent";
import {BSMapCountLabel} from "@/components/labels/BSLabel";
import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import {escapeHtml} from "@/lib/ContentEscape";
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
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
      {
        maps.map(
        (map) => {
          return (
            <BSMap key={map.id} bsMap={map}/>
          );
        })
      }
      { !isLoadingMore && isEmpty && <EmptyContent/> }
      { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
      { isLoadingMore && <Loading/> }
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
    <div className="grid gap-2 grid-cols-1 xl:grid-cols-3 md:grid-cols-2 justify-evenly">
      {
        playlists.map(
        (playlist) => {
          return (
            <BSPlaylist key={playlist.playlistId} bsPlaylist={playlist}/>
          );
        })
      }
      { !isLoadingMore && isEmpty && <EmptyContent/> }
      { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
      { isLoadingMore && <Loading/> }
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
            <Card className="p-2">
              <div className="flex space-x-2 items-center">
                <div className="font-medium text-xs">
                {
                  review.sentiment == "POSITIVE" && <FcLike/>
                }
                {
                  review.sentiment == "NEGATIVE" && <BsHeartbreak/>
                }
                {
                  review.sentiment == "NEUTRAL" && <TbMoodNeutral/>
                }
                </div>
                  <Link  href={`/map/${review.map?.id}`}>
                  <div>{review.map?.name}</div>
                  </Link>
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
      { !isLoadingMore && isEmpty && <EmptyContent/> }
      { !isEmpty && !hasMore && !isLoadingMore && <ReachListEnd/> }
      { isLoadingMore && <Loading/> }
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

    return isLoading?(<Loading/>)
    : (
        <div className=" max-w-[1200px]">

          <div className="block lg:hidden mb-2">
            <div className="flex justify-start">
              <div
                className="h-[144px] w-[144px] sm:h-[256px] sm:w-[256px] aspect-square rounded-lg"
                style={{
                  backgroundImage: `url('${bsUserWithStats.avatar}')`,
                  backgroundSize: 'cover',
                }}
              />
              <div className="pl-2">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-3 text-ellipsis">
                        {bsUserWithStats.name}
                    </span>
                </div>
                <div className="">
                  <div className="font-medium text-xs">
                    followers: {bsUserWithStats.followData!.followers}
                  </div>
                  {
                    bsUserWithStats.followData!.follows &&
                      <span className="font-medium text-xs">
                        following: {bsUserWithStats.followData!.follows}
                        </span>
                  }
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <BSMapCountLabel count={bsUserWithStats.stats!.totalMaps}/>
                  <MapMetaLabel.BSRatingLabel rate={bsUserWithStats.stats!.avgScore / 100}/>
                  <MapMetaLabel.ThumbUpCountLabel count={bsUserWithStats.stats!.totalUpvotes}/>
                  <MapMetaLabel.ThumbDownCountLabel count={bsUserWithStats.stats!.totalDownvotes}/>
                </div>

                <p
                  className="text-ellipsis overflow-hidden text-xs hidden sm:block"
                  dangerouslySetInnerHTML={{__html: bsUserWithStats.description == "" ? "No description" : escapeHtml(bsUserWithStats.description)}}
                />
                {/*<p className="text-ellipsis overflow-hidden text-xs hidden sm:block">*/}
                {/*  {bsUserWithStats.description == "" ? "No description" : bsUserWithStats.description}*/}
                {/*</p>*/}
              </div>

            </div>
            <p
              className="text-ellipsis overflow-hidden text-xs block sm:hidden"
              dangerouslySetInnerHTML={{__html: bsUserWithStats.description == "" ? "No description" : escapeHtml(bsUserWithStats.description)}}
            />
            {/*<p className="text-ellipsis overflow-hidden text-xs block sm:hidden">*/}
            {/*  {bsUserWithStats.description == "" ? "No description" : bsUserWithStats.description}*/}
            {/*</p>*/}
          </div>
          <div className="flex grow space-x-2">

            <Tabs.Root className="flex flex-col  mx-auto h-full w-full" defaultValue="Published"
                       onValueChange={handleTabChange}>
              <Tabs.List
                className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mx-auto space-x-2 mb-2"
                aria-label="">
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="Published">
                  <div>Published</div>
                </Tabs.Trigger>
                {
                  false && <Tabs.Trigger
                        className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                        value="WIP">
                        <div>UnPublished</div>
                    </Tabs.Trigger>
                }
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="Curated">
                  <div>Curated</div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="Playlists">
                  <div>Playlists</div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="Reviews">
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
            <div className="hidden lg:block sticky top-28 justify-center w-[256px] grow-0 h-fit">
              <BSMapperSideBar bsMapper={bsUserWithStats}/>
            </div>
          </div>

        </div>
      )
}