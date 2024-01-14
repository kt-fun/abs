'use client'
import Link from '@/components/ui/link'
import {IconButton} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {HoverCard as HoverCardRoot,HoverCardContent,HoverCardTrigger}   from '@/components/ui/hover-card'
import {Tooltip} from "@/components/ui/tooltip";
import {BSBeatMap, getBSMapCoverURL, getMaxNPS} from '@/interfaces/beatmap'
import * as MapDiffLabel from '@/components/labels/BSMapDiffLabels'
import * as MapMetaLabel from '@/components/labels/BSMapMetaLabels'
import BSUserLabel from '@/components/labels/BSUserLabel'
import FeatureIcons, {checkIfHasFeature} from '@/components/icons/FeatureIcons'
import {BSMapTagType, getMapTag} from '@/interfaces/mapTags'
import BSMapTag from './BSMapTag'
import * as Progress from '@radix-ui/react-progress';
import {IoAddOutline, IoCloudDownloadOutline} from 'react-icons/io5'
import {HiCursorClick} from 'react-icons/hi'
import {FaTwitch} from "react-icons/fa";
import {CiBookmark, CiMusicNote1, CiPlay1} from "react-icons/ci";
import {PiHeartbeat} from "react-icons/pi";
import {useSongPreview} from '@/hooks/useSongPreview'
import {AiOutlineLoading} from "react-icons/ai";
import CopyIcon from './CopyIcon'
import MapPreviewIFrame from './MapPreviewIFrame'
import {CharacteristicIcon} from "@/components/icons/Characteristic";
import React from "react";
import { ThemeProvider } from './ThemeProvider';

const diffShort = {
  "Easy":"Easy",
  "Normal":"Normal",
  "Hard":"Hard",
  "Expert":"Expert",
  "ExpertPlus":"Expert+",
}

type MapCharacteristic = "Standard" | "NoArrows" | "OneSaber" | "90Degree" | "360Degree" | "Lightshow" | "Lawless" | "Legacy"
type MapDiff = "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus"

export default function BSMap(
    {bsMap}: {bsMap:BSBeatMap}
) {
  const bg = getBSMapCoverURL(bsMap)
  const {currentSong,state,play,stop} = useSongPreview()
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

  const handleCopyMapId = ()=>{
    navigator.clipboard.writeText(bsMap.id);
  }
  const score = bsMap.stats.score*100

  return (
    <Card
      className='shadow-md h-[162px] sm:h-[202px] min-w-[360px]'
    >
    <div className='flex h-[160px] sm:h-[200px] overflow-hidden'>
      <div className='w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-l-lg'>
        <div
            className="relative  h-[160px] sm:h-[200px]  group  rounded-l-lg"
            style={{
                backgroundImage: `url('${bg}')`,
                backgroundSize: 'cover',
            }}>
            <div className={`z-100 bg-black/[.6] h-full group-hover:visible ${current?'':'invisible'}  bg-blend-darken  rounded-l-lg`}>
              <div
                className="flex flex-col justify-between pt-auto pb-0 p-1 bg-transparent h-full z-[200]  rounded-l-lg">
                {
                  bsMap.curator && <div className="flex space-x-1 items-center mx-1 text-white">
                        <span className="text-xs font-medium">Curator:</span> <BSUserLabel user={bsMap.curator} className="font-semibold text-white"/>
                    </div>
                }
                <div onClick={handleCopyMapId} className='text-white flex'>
                  <MapMetaLabel.BSIDLabel id={bsMap.id} className="cursor-pointer" tooltip="copy map id"/>
                  {
                    checkIfHasFeature(bsMap) &&
                      <div className="flex space-x-1 items-center mx-1 text-white">
                          <FeatureIcons bsMap={bsMap} className="*:h-6 *:w-6 *:items-center *:flex "/>
                      </div>
                  }
                </div>

                <div className='mx-1'>
                  <p className="text-ellipsis overflow-hidden line-clamp-[4] text-xs dark text-gray-200">
                    {bsMap.description == "" ? "No description" : bsMap.description}
                  </p>
                </div>
                <div className='mx-1 mt-auto'>
                  <div className='grid overflow-x-auto grid-rows-2 grid-flow-col no-scrollbar'>
                    {
                      bsMap.versions[0].diffs.map((diff) => {
                        return (
                            <HoverCardRoot key={diff.characteristic + diff.difficulty + bsMap.id}>
                              <HoverCardTrigger key={diff.difficulty + diff.characteristic + bsMap.id} className="w-fit">
                                          <span
                                            key={diff.difficulty + diff.characteristic + bsMap.id}
                                            className='relative w-fit text-white hover:text-red-500 font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 border-solid border flex items-center flex-shrink'
                                          >
                                            <CharacteristicIcon characteristic={diff.characteristic} className="w-4 h-4"/>
                                            <span className='ml-[2px] text-xs'>{diffShort[diff.difficulty as MapDiff]}</span>
                                          </span>
                              </HoverCardTrigger>
                              <HoverCardContent side="top" align="center" className="z-[100] shadow-md p-2 border">
                                <div className='cursor-default'>{diff.characteristic}</div>
                                <div className='grid grid-cols-3 gap-1'>
                                  <MapDiffLabel.BSNPSLabel nps={diff.nps}/>
                                  <MapDiffLabel.BSNJSLabel njs={diff.njs}/>
                                  <MapDiffLabel.BSLightCountLabel count={diff.events}/>
                                  <MapDiffLabel.BSNoteCountLabel count={diff.notes}/>
                                  <MapDiffLabel.BSObstacleCountLabel count={diff.obstacles}/>
                                  <MapDiffLabel.BSBombCountLabel count={diff.bombs}/>
                                </div>
                              </HoverCardContent>
                            </HoverCardRoot>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="flex items-center space-x-1 mx-auto justify-center py-1">
                  <Tooltip content="add to playlist" asChild>
                    <IconButton onClick={handleAddToPlaylist}
                                className="w-4 h-4  sm:w-6 sm:h-6 hover:bg-white text-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                                variant="ghost">
                      <IoAddOutline/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="bookmark song" asChild>
                    <IconButton onClick={handleBookmark}
                                className="w-4 h-4  sm:w-6 sm:h-6 hover:bg-white text-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                                variant="ghost">
                      <CiBookmark/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="play song preview" asChild>
                    <IconButton onClick={handlePlaySongPreview}
                                className={`w-4 h-4  sm:w-6 sm:h-6 hover:bg-white ${current ? 'bg-white text-red-400' : ' text-white'} hover:text-red-400 p-1 rounded-full cursor-pointer ${current && state.loading ? 'animate-spin' : ''}`}
                                variant="ghost">
                      {current ? state.loading ? <AiOutlineLoading/> : <PiHeartbeat/> : <CiMusicNote1/>}
                    </IconButton>
                  </Tooltip>
                  <MapPreviewIFrame id={bsMap.id}>
                    <IconButton
                      className="w-4 h-4  sm:w-6 sm:h-6 hover:bg-white text-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                      variant="ghost">
                      <CiPlay1/>
                    </IconButton>
                  </MapPreviewIFrame>

                  <Tooltip content="copy twitch request" asChild>
                    <CopyIcon
                      className="w-4 h-4  sm:w-6 sm:h-6 hover:bg-white text-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                      content={`!bsr ${bsMap.id}`}>
                      <FaTwitch/>
                    </CopyIcon>
                  </Tooltip>
                  <Tooltip content="download zip" asChild>
                    <IconButton className="w-4 h-4  sm:w-6 sm:h-6 text-white hover:bg-white hover:text-red-400 p-1 rounded-full"
                                variant="ghost">
                      <Link href={bsMap.versions[0].downloadURL} className="text-inherit">
                        <IoCloudDownloadOutline/>
                      </Link>
                    </IconButton>

                  </Tooltip>
                  <Tooltip content="one click download" asChild>
                    <IconButton className="w-4 h-4  sm:w-6 sm:h-6  p-1 rounded-full  text-white hover:bg-white hover:text-red-400" variant="ghost">
                      <Link href={`beatsaver://${bsMap.id}`} className="text-inherit">
                        <HiCursorClick/>
                      </Link>
                    </IconButton>
                  </Tooltip>
                </div>

              </div>
            </div>
        </div>
      </div>

      <div className='h-full ml-2 flex flex-col'>
        <Link href={`/map/${bsMap.id}`} className="overflow-ellipsis line-clamp-1 text-xl font-medium pr-2">
            {bsMap.name}
          </Link>
        <div className='flex items-center'>
          <BSUserLabel user={bsMap.uploader}/>

        </div>
        <div className='flex space-x-2'>
          <MapDiffLabel.BSNPSLabel nps={getMaxNPS(bsMap)} tooltip='max nps of this map'/>
          <MapMetaLabel.DurationLabel duration={bsMap.metadata.duration}/>
          <MapMetaLabel.BSBPMLabel bpm={bsMap.metadata.bpm}/>
          </div>
          <div className='flex gap-1 flex-wrap p-1'>
            {
              bsMap.tags?.map((tag)=>getMapTag(tag))
                .filter((tag)=>tag != undefined && tag.type == BSMapTagType.Style)
                .map((tag)=>{
                  return (
                    <BSMapTag className='text-nowrap font-semibold' key={tag!.slug} tag={tag!}/>
                  )
                })
            }
          </div>
          <div className="mt-auto mb-2">
          

            <div className='flex items-center'>
              <Progress.Root className="relative overflow-hidden rounded-full min-w-24 max-w-32 h-2 bg-gray-100" value={score}>
                <Progress.Indicator
                    className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                    style={{ transform: `translateX(-${100 - score}%)` }}
                />
              </Progress.Root>
              <div className="pl-2 font-medium text-xs">{score.toFixed(1)}%</div>
            </div>
            <div className='flex items-center  space-x-2'>
              <div className='flex items-center space-x-2'>
              <MapMetaLabel.ThumbUpCountLabel count={bsMap.stats.upvotes}/>
              <MapMetaLabel.ThumbDownCountLabel count={bsMap.stats.downvotes}/>
              </div>
              {/*<Separator orientation="vertical" className="h-4"/>*/}
              <MapMetaLabel.DateLabel date={bsMap.lastPublishedAt}/>
            </div>
          </div>
    </div>
      </div>
    </Card>
  )
}

