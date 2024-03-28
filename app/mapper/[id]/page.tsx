'use client'

import { useBSUser } from "@/hooks/api/useBSUser";
import {Download, DownloadCloud} from 'lucide-react'
import * as Tabs from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import React, {useState} from "react";
import {Loading} from "@/components/shared/load-status";
import {escapeHtml} from "@/lib/ContentEscape";
import ReviewList from "@/app/mapper/[id]/review-list";
import {Avatar} from "@/components/ui/avatar";
import PlaylistsTab from "@/app/mapper/[id]/playlist-tab";
import MapList from "@/app/mapper/[id]/map-list";
import { motion } from "framer-motion";
import {useLocaleFormat} from "@/hooks/useFormat";


const getUserPlaylist = (uid: number, oneClick: boolean) => {
  if (oneClick) {
    return `bsplaylist://playlist/https://api.beatsaver.com/users/id/${uid}/playlist/beatsaver-user-${uid}.bplist`
  }
  return `https://api.beatsaver.com/users/id/${uid}/playlist`
}
const Label = ({
                 label, content
               }: {
  label: string,
  content: string
}) => {
  return (<div className="font-medium text-xs flex flex-col items-center cursor-default">
    <span className={"text-xs opacity-50"}>{label}</span>
    <span>{content}</span>
  </div>)
}

export default function MapperDetailPage({params}: { params: { id: number } }) {
  const {formatNumber} = useLocaleFormat()
  const {bsUserWithStats, isLoading, error} = useBSUser(params.id)
  const router = useRouter()
  if (error) {
    console.log(error)
    router.push("/")
  }
  const [value,setValue] = useState("Published")
  const TabValues = [{
    value: 'Published',
    label: 'Published',
    content: <MapList userId={params.id.toString()} fetchingType="Curated"/>
  },{
    value: 'Playlist',
    label: 'Playlist',
    content: <PlaylistsTab userId={params.id.toString()}/>
  // },{
  //   value: 'WIP',
  //   label: 'UnPublished',
  //   content: <MapList userId={params.id.toString()} fetchingType="WIP"/>
  },{
    value: 'Curated',
    label: 'Curated',
    content: <MapList userId={params.id.toString()} fetchingType="Curated"/>
  },{
    value: 'Reviews',
    label: 'Reviews',
    content: <ReviewList user={bsUserWithStats}/>
  }]
  const handleFollow = ()=> {
    //todo
  }
    return isLoading?(<Loading/>)
    : (
        <div className=" max-w-[1024px] w-full px-2">

          <div className="block  mb-2">
            <div className="flex flex-col">
              <div className={'flex space-x-2 flex-col'}>
                <div className={'flex space-x-2'}>
                  <Avatar src={bsUserWithStats.avatar} className={'h-8 aspect-square rounded-lg'}/>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-3 text-ellipsis">
                        {bsUserWithStats.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pl-2">
                <p
                  className="text-ellipsis overflow-hidden text-xs opacity-60 p-2"
                  dangerouslySetInnerHTML={{__html: bsUserWithStats.description == "" ? "No description" : escapeHtml(bsUserWithStats.description)}}
                />
              </div>
              <div className={'flex self-end space-x-2'}>

                <div className={'border border-zinc-200 dark:border-zinc-800 rounded-lg items-center text-xs bg-zinc-100/30 backdrop-blur flex '}>
                  <a  href={getUserPlaylist(bsUserWithStats.id, false)} className={'flex space-x-1 px-2 py-1'}>
                  <Download className={'h-4 w-4'}/>
                    <span>{"playlist"} </span>
                  </a>
                  <a href={getUserPlaylist(bsUserWithStats.id,true)} className={'bg-zinc-200/30 h-full py-1 rounded-r-lg items-center text-center align-middle inline-flex'}>
                    <span className={'m-auto mx-1 self-center align-middle text-center'}><DownloadCloud className={'h-4 w-4 '}/></span>
                  </a>
                </div>
                <button
                  onClick={handleFollow}
                  className={'border border-zinc-200 dark:border-zinc-800 rounded-lg items-center text-xs bg-zinc-100/30 backdrop-blur flex px-2 py-1'}>
                  {bsUserWithStats.followData?.following ? "unfollow" : "follow"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex grow space-x-2">
            <Tabs.Tabs
              className="flex flex-col  mx-auto h-full w-full"
              onValueChange={setValue}
              value={value}
            >
              <div className={'flex justify-between items-center flex-col md:flex-row'}>
                <div className={'flex order-0 md:order-1 w-full justify-between md:justify-end shrink items-center'}>
                  <div className="grid xl:grid grid-rows-1 grid-cols-4 gap-1 ">
                    <Label label={"total map"} content={formatNumber(bsUserWithStats.stats!.totalMaps)}/>
                    <Label label={"like"} content={formatNumber(bsUserWithStats.stats!.totalUpvotes)}/>
                    <Label label={"dislike"} content={formatNumber(bsUserWithStats.stats!.totalDownvotes)}/>
                    <Label label={"avg rate"} content={`${formatNumber(bsUserWithStats.stats!.avgScore)}%`}/>
                  </div>
                  <div className="flex space-x-2 pl-2">
                    <div className="font-medium text-xs flex flex-col items-center cursor-pointer">
                      <span className={"text-xs opacity-50"}>followers</span>
                      <span>{bsUserWithStats.followData!.followers}</span>
                    </div>
                    {
                      bsUserWithStats.followData!.follows && <div className="font-medium text-xsflex flex-col">
                            <span className={"text-xs opacity-50"}>following</span>
                            <span>{bsUserWithStats.followData!.follows}</span>
                        </div>
                    }
                  </div>
                </div>
                <Tabs.TabsList
                  className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mr-auto ml-auto space-x-2 my-2 grow"
                >
                  {
                    TabValues.map(item=> (
                      <Tabs.TabsTrigger
                        key={item.value}
                        className="px-2 relative bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        value={item.value}>
                        {
                          value == item.value && <motion.span
                            layoutId={'active-tab'}
                            transition={{
                              duration: 0.5
                            }}
                            className={"absolute inset-0 bg-base-light dark:bg-base-dark shadow-md"}
                            style={{ borderRadius: 9999 }}
                          >
                          </motion.span>
                        }
                        <div className={'z-10'}>{item.label}</div>
                      </Tabs.TabsTrigger>
                    ))
                  }
                </Tabs.TabsList>
              </div>
              {
                TabValues.map(item=>
                  <Tabs.TabsContent
                    value={item.value}
                    key={item.value}
                  >
                      {item.content}
                  </Tabs.TabsContent>
                )
              }
            </Tabs.Tabs>
          </div>

        </div>
      )
}