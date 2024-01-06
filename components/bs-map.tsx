'use client'
import Image from 'next/image'
import { ClockIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, HoverCard, IconButton, Inset, Link, Separator, Text, Theme, Tooltip } from '@radix-ui/themes'
import { BSBeatMap, getBSMapCoverURL, getMaxNPS } from '@/interfaces/beatmap'
import MapperAvatar from '@/components/mapper-avatar'
import NPSLabel from '@/components/labels/NPSLabel'
import DurationLabel from '@/components/labels/DurationLabel'
import ThumbUpLabel from '@/components/labels/ThumbUpLabel'
import ThumbDownLabel from '@/components/labels/ThumbDownLabel'
import RatingLabel from '@/components/labels/RatingLabel'
import DateLabel from '@/components/labels/DateLabel'
import BSUserLabel from '@/components/labels/BSUserLabel'
import FeatureIcons from '@/icons/FeatureIcons'
import { getMapTag } from '@/interfaces/mapTags'
import BSMapTag from './BSMapTag'
import * as Progress from '@radix-ui/react-progress';
import { IoCloudDownloadOutline, IoSpeedometerOutline } from 'react-icons/io5'
import BSLabel from './labels/BSLabel'
import NextLink from 'next/link'
import { HiCursorClick } from 'react-icons/hi'
import { FaTwitch } from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoAddOutline } from "react-icons/io5";
import NJSLabel from './labels/NJSLabel'
import LightAmountLabel from './labels/LightAmountLabel'
import BSBombAmountLabel from './labels/BSBombAmount'
import BSNoteAmountLabel from './labels/BSNoteAmountLabel'
import BSObstacleAmountLabel from './labels/BSObstacleAmountLabel'
import BSBPMLabel from './labels/BSBPMLabel'
import BSIDLabel from './labels/BSIDLabel'
import { PiHeartbeat } from "react-icons/pi";
import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useSongPreview, useSongPreviewState } from '@/hooks/useSongPreview'
import { AiOutlineLoading } from "react-icons/ai";
import CopyIcon from './CopyIcon'
interface BSMapProps {
    bsMap:BSBeatMap
}

const diffShort = {
  "Easy":"Easy",
  "Normal":"Normal",
  "Hard":"Hard",
  "Expert":"Expert",
  "ExpertPlus":"Expert+",
}

const getIcon = (characteristic:MapCharacteristic)=>{
    switch(characteristic){
      case "Standard":
        return <IoSpeedometerOutline/>
      case "NoArrows":
        return <IoSpeedometerOutline/>
      case "OneSaber":
        return <IoSpeedometerOutline/>
      case "90Degree":
        return <IoSpeedometerOutline/>
      case "360Degree":
        return <IoSpeedometerOutline/>
      case "Lightshow":
        return <IoSpeedometerOutline/>
      case "Lawless":
        return <IoSpeedometerOutline/>
      case "Legacy":
        return <IoSpeedometerOutline/>
    }
}
type MapCharacteristic = "Standard" | "NoArrows" | "OneSaber" | "90Degree" | "360Degree" | "Lightshow" | "Lawless" | "Legacy"
type MapDiff = "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus"

export default function BSMap(
    {bsMap}: {bsMap:BSBeatMap}
) {
  const {currentSong,state,play,stop} = useSongPreview()
  const bg = getBSMapCoverURL(bsMap)
  const handlePlaySongPreview = () => {
    if(state.playing && currentSong?.id == bsMap.id){
      stop()
    }else{
      play({
        id:bsMap.id,
        previewURL:bsMap.versions[0].previewURL,
        coverURL:bg,
      })
    }
  }
  const current = currentSong?.id == bsMap.id
  const handleBookmark = ()=>{

  }

  const handleAddToPlaylist = ()=>{

  }

  const handlePlayMapPreview = ()=>{

  }
  const handleCopyMapId = ()=>{
    navigator.clipboard.writeText(bsMap.id);
  }
  const score = bsMap.stats.score*100

  return (
    <Card
    className='shadow-md max-h-[200px]'
    >
      <Flex className='h-full'>
      <Inset  side="left" className='min-w-[200px] max-w-[200px]'>
      <div
          className="relative h-[200px] xl:h-[200px] z-0  group"
          style={{
              backgroundImage: `url('${bg}')`,
              backgroundSize: 'cover',
          }}>
              <div className={`z-100 bg-black/[.6] h-full group-hover:visible ${current?'':'invisible'}  bg-blend-darken`}>
                  <Theme appearance="dark" className="bg-transparent h-full">
                      <div className="flex flex-col justify-between  h-full pt-auto pb-0">
                          <div className='mx-1'>
                              <Text as="p" size="1" className="text-ellipsis overflow-hidden line-clamp-[4]">
                                  {bsMap.description == "" ? "No description" : bsMap.description}
                              </Text>
                          </div>
                          <div className='mx-1 mt-auto'>
                            <div className='flex space-x-1 flex-wrap '>
                              {
                                bsMap.versions[0].diffs.map((diff)=>{
                                  return (
                                    <>
                                        <HoverCard.Root key={diff.characteristic+diff.difficulty+bsMap.id}>
                                          <HoverCard.Trigger>
                                        <Text key={diff.difficulty + diff.characteristic} size={"1"}
                                        className='font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 hover:text-red-500 border-solid border flex items-center'
                                        >
                                          {getIcon(diff.characteristic as MapCharacteristic)}
                                          <span className='ml-[2px]'>{diffShort[diff.difficulty as MapDiff]}</span>
                                          </Text>
                                        </HoverCard.Trigger>
                                        <HoverCard.Content side="top" align="center">
                                          <Text className='cursor-default'>{diff.characteristic}</Text>
                                          <div className='grid grid-cols-3 gap-1'>
                                            <NPSLabel size={"1"} nps={diff.nps}/>
                                            <NJSLabel size={"1"} njs={diff.njs}/>
                                            <LightAmountLabel size={"1"} amount={diff.events}/>
                                            <BSNoteAmountLabel size={"1"} amount={diff.notes}/>
                                            <BSObstacleAmountLabel size={"1"} amount={diff.obstacles}/>
                                            <BSBombAmountLabel size={"1"} amount={diff.bombs}/>
                                          </div>
                                        </HoverCard.Content>
                                        </HoverCard.Root>                   
                                    </>

                                  )
                                })
                              }
                            </div>
                          </div>
                          <div>

                              <div className="flex items-center space-x-1 mx-auto justify-center pb-2">
                                  <Tooltip content="add to playlist">
                                    <span onClick={handleAddToPlaylist} className="hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer">
                                        <IoAddOutline />
                                    </span>
                                  </Tooltip>
                                  <Tooltip content="bookmark song">
                                    <span onClick={handleBookmark} className="hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer">
                                        <CiBookmark />
                                    </span>
                                  </Tooltip>
                                  <Tooltip content="play song preview">
                                    {
                                      current?
                                    <motion.span 
                                      animate={
                                        state.loading?
                                        {rotate:360}:
                                        {scale:1.05}
                                      }
                                      transition={
                                        state.loading?
                                        {duration:1,repeat:Infinity}:
                                        {duration:.5,repeat:Infinity}
                                      }
                                      onClick={handlePlaySongPreview} 
                                      className={`hover:bg-white ${current?'bg-white text-red-400':''} hover:text-red-400 p-1 rounded-full cursor-pointer`}>
                                        {
                                          state.loading?
                                          <AiOutlineLoading/>:
                                          <PiHeartbeat/>
                                        }
                                    </motion.span>:
                                    <span 
                                    onClick={handlePlaySongPreview} 
                                    className={`hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer`}>
                                      <CiMusicNote1/>
                                    </span>
                                    }
                                  </Tooltip>
                                  <Tooltip content="play map preview">
                                    <span onClick={handlePlayMapPreview} className="hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer">
                                        <CiPlay1 />
                                    </span>
                                  </Tooltip>
                                  <Tooltip content="copy twitch request">
                                    <CopyIcon className="hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer" content={`!bsr ${bsMap.id}`}>
                                      <FaTwitch />
                                    </CopyIcon>
                                  </Tooltip>
                                  <Tooltip content="download zip">
                                  <NextLink href={bsMap.versions[0].downloadURL}  className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                          <IoCloudDownloadOutline  />
                                  </NextLink>
                                  </Tooltip>
                                  <Tooltip content="one click download">
                                      <NextLink href={`beatsaver://${bsMap.id}`} className="hover:bg-white hover:text-red-400 p-1 rounded-full">
                                          <HiCursorClick/>
                                      </NextLink>
                                  </Tooltip>
                              </div>
                          </div>
                      </div>

                  </Theme>
              </div>
          </div>
      </Inset>
        <Box className='h-full flex flex-col pl-2 '>
          <Link href={`/map/${bsMap.id}`}>
            <Text
              size="4"
              className="overflow-ellipsis line-clamp-1"
              >{bsMap.name}</Text>
          </Link>
          <div className='flex space-x-2 items-center'>
            <BSUserLabel size={"1"} user={bsMap.uploader}/>
            <div onClick={handleCopyMapId} className='cursor-pointer'>
            <BSIDLabel size={"1"} id={bsMap.id} />
            </div>

          </div>
          <div className='flex space-x-2'>
            <NPSLabel size={"1"} nps={getMaxNPS(bsMap)} tooltip='max nps of this map'/>
            <DurationLabel size={"1"} duration={bsMap.metadata.duration}/>

            <BSBPMLabel size={"1"} bpm={bsMap.metadata.bpm}/>
          </div>
          <FeatureIcons bsMap={bsMap} className='py-1'/>
          <div className='flex gap-1 overflow-auto flex-wrap'>
            {
              bsMap.tags?.map((tag)=>getMapTag(tag)!!).map((tag)=>(
                <BSMapTag className='text-nowrap font-semibold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent' size={"1"} key={tag.slug} tag={tag}/>
              ))
            }
          </div>


          <div className="mt-auto">
          

            <div className='flex items-center'>
              <Progress.Root className="relative overflow-hidden rounded-full w-32 h-2 bg-gray-100" value={score}>
                <Progress.Indicator
                    className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                    style={{ transform: `translateX(-${100 - score}%)` }}
                />
              </Progress.Root>
              <Text className="pl-2" size="1" weight="medium">{score.toFixed(1)}%</Text>
            </div>
            <div className='flex items-center  space-x-2'>
              <div className='flex items-center space-x-2'>
              <ThumbUpLabel size={"1"} likeCnt={bsMap.stats.upvotes}/>
              <ThumbDownLabel size={"1"} dislikeCnt={bsMap.stats.upvotes}/>
              </div>
              <Separator orientation="vertical" className="h-4"/>
            <DateLabel size={"1"} date={bsMap.lastPublishedAt}/>
            </div>
          </div>
        </Box>
      </Flex>
    </Card>
  )
}
function useAudio(arg0: { src: string; autoPlay: boolean }): [any, any, any, any] {
  throw new Error('Function not implemented.')
}

