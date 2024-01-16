'use client'
import Link from '@/components/ui/link'
import {Button, IconButton} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {HoverCard as HoverCardRoot,HoverCardContent,HoverCardTrigger}   from '@/components/ui/hover-card'
import {Tooltip} from "@/components/ui/tooltip";
import {BSBeatMap, BSMapDiff, getBSMapCoverURL, getMaxNPS} from '@/interfaces/beatmap'
import * as MapDiffLabel from '@/components/labels/BSMapDiffLabels'
import * as MapMetaLabel from '@/components/labels/BSMapMetaLabels'
import BSUserLabel from '@/components/labels/BSUserLabel'
import FeatureIcons, {checkIfHasFeature} from '@/components/icons/FeatureIcons'
import {BSMapTagType, getMapTag} from '@/interfaces/mapTags'
import BSMapTag from './BSMapTag'
import * as Progress from '@radix-ui/react-progress';
import {IoCloudDownloadOutline} from 'react-icons/io5'
import {HiCursorClick} from 'react-icons/hi'
import {FaTwitch} from "react-icons/fa";
import {CiBookmark, CiMusicNote1, CiPlay1} from "react-icons/ci";
import {PiHeartbeat} from "react-icons/pi";
import {useSongPreview} from '@/hooks/useSongPreview'
import {AiOutlineLoading} from "react-icons/ai";
import CopyIcon from './CopyIcon'
import MapPreviewIFrame from './MapPreviewIFrame'
import {CharacteristicIcon} from "@/components/icons/Characteristic";
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ScrollArea,ScrollBar} from "@/components/ui/scroll-area";

const diffShort = {
  "Easy":"Easy",
  "Normal":"Normal",
  "Hard":"Hard",
  "Expert":"Expert",
  "ExpertPlus":"Expert+",
}

const diffShortest = {
  "Easy":"E",
  "Normal":"N",
  "Hard":"H",
  "Expert":"EX",
  "ExpertPlus":"EX+",
}

type MapCharacteristic = "Standard" | "NoArrows" | "OneSaber" | "90Degree" | "360Degree" | "Lightshow" | "Lawless" | "Legacy"
type MapDiff = "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus"


const DiffCard = ({diff}:{diff:BSMapDiff}) => {
  const [diffHoverCardOpen, setDiffHoverCardOpen] = useState(false)
  const handleDiffHoverCardClick = () => setDiffHoverCardOpen((prevOpen) => !prevOpen)
  return(
    // popover can't work properly with tooltip, see https://github.com/radix-ui/primitives/issues/2248
    // and hover card can't work properly trigger by touch event due to radix-ui team's design decision
    // see https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209
    // later we need provide a custom component work as hover in desktop and popover in mobile
    //   <Popover key={diff.characteristic + diff.difficulty + bsMap.id}>
    //     <PopoverTrigger key={diff.difficulty + diff.characteristic + bsMap.id} className="w-fit">
    //       <span
    //         key={diff.difficulty + diff.characteristic + bsMap.id}
    //         className='relative w-fit text-white hover:text-red-500 font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 border-solid border flex items-center flex-shrink'
    //       >
    //         <CharacteristicIcon characteristic={diff.characteristic} className="w-4 h-4"/>
    //         <span className='ml-[2px] text-xs'>{diffShortest[diff.difficulty as MapDiff]}</span>
    //       </span>
    //     </PopoverTrigger>
    //     <PopoverContent align="center" className="shadow-md p-2 border">
    //       <div className='cursor-default'>{diff.characteristic}</div>
    //       <div className='grid grid-cols-3 gap-1'>
    //         <MapDiffLabel.BSNPSLabel nps={diff.nps}/>
    //         <MapDiffLabel.BSNJSLabel njs={diff.njs}/>
    //         <MapDiffLabel.BSLightCountLabel count={diff.events}/>
    //         <MapDiffLabel.BSNoteCountLabel count={diff.notes}/>
    //         <MapDiffLabel.BSObstacleCountLabel count={diff.obstacles}/>
    //         <MapDiffLabel.BSBombCountLabel count={diff.bombs}/>
    //       </div>
    //     </PopoverContent>
    //   </Popover>
    <HoverCardRoot open={diffHoverCardOpen} onOpenChange={setDiffHoverCardOpen}>
      <HoverCardTrigger className="w-fit" onClick={handleDiffHoverCardClick}>
          <span className='relative w-fit text-white hover:text-red-500 font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 border-solid border flex items-center'>
            <CharacteristicIcon characteristic={diff.characteristic} className="w-4 h-4"/>
            <span className='ml-[2px] text-xs'>{diffShortest[diff.difficulty as MapDiff]}</span>
          </span>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="shadow-md p-2 border">
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
}


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
            className=" h-[160px] sm:h-[200px] w-[160px] sm:w-[200px] group  rounded-l-lg"
            style={{
                backgroundImage: `url('${bg}')`,
                backgroundSize: 'cover',
            }}>
            <div className={`z-100 bg-black/[.6] h-full group-hover:visible ${current?'':'invisible'}  bg-blend-darken  rounded-l-lg`}>
              <div
                className="flex flex-col justify-between pt-auto px-1 bg-transparent h-full z-[200]  rounded-l-lg">
                {
                  bsMap.curator &&
                    <div className="flex space-x-1 items-center mx-1 text-white">
                        <span className="text-xs font-medium hidden sm:inline">Curator:</span>
                        <BSUserLabel user={bsMap.curator} className="font-light text-white" linkClassName="text-white"/>
                    </div>
                }
                <div onClick={handleCopyMapId} className='text-white flex'>
                  <MapMetaLabel.BSIDLabel id={bsMap.id} className="cursor-pointer" tooltip="copy map id"/>
                  {
                    checkIfHasFeature(bsMap) &&
                      <div className="flex space-x-1 items-center mx-1 text-white">
                          <FeatureIcons bsMap={bsMap} className="*:h-4 *:w-4 *:items-center *:flex "/>
                      </div>
                  }
                </div>
                <p
                  className="text-ellipsis overflow-hidden  line-clamp-1 sm:line-clamp-4 text-xs dark text-gray-200 mx-1"
                >
                  {bsMap.description == "" ? "No description" : bsMap.description}
                </p>
                <ScrollArea>
                  <div className='grid  grid-rows-1 sm:grid-rows-2 grid-flow-col'>
                    {
                      bsMap.versions[0].diffs.map((diff) => <DiffCard diff={diff} key={diff.characteristic + diff.difficulty + bsMap.id}/>)
                    }
                  </div>
                  <ScrollBar orientation="horizontal"/>
                </ScrollArea>
                <div className="grid grid-cols-4 gap-1 sm:flex items-center mx-auto justify-center pb-0.5">
                  {/*<Tooltip content="add to playlist" asChild>*/}
                  {/*  <IconButton onClick={handleAddToPlaylist}*/}
                  {/*              className="w-6 h-6 hover:bg-white text-white hover:text-red-400 rounded-full cursor-pointer"*/}
                  {/*              variant="ghost">*/}
                  {/*    <IoAddOutline/>*/}
                  {/*  </IconButton>*/}
                  {/*</Tooltip>*/}
                  {/*<Tooltip content="bookmark song" asChild>*/}
                  {/*  <IconButton onClick={handleBookmark}*/}
                  {/*              className="w-6 h-6 hover:bg-white text-white hover:text-red-400 rounded-full cursor-pointer"*/}
                  {/*              variant="ghost">*/}
                  {/*    <CiBookmark/>*/}
                  {/*  </IconButton>*/}
                  {/*</Tooltip>*/}
                  <Tooltip content="play song preview" asChild>
                    <IconButton onClick={handlePlaySongPreview}
                                className={`w-6 h-6 hover:bg-white ${current ? 'bg-white text-red-400' : ' text-white'} hover:text-red-400 rounded-full cursor-pointer ${current && state.loading ? 'animate-spin' : ''}`}
                                variant="ghost">
                      {current ? state.loading ? <AiOutlineLoading/> : <PiHeartbeat/> : <CiMusicNote1/>}
                    </IconButton>
                  </Tooltip>
                  <MapPreviewIFrame id={bsMap.id}>
                    <IconButton
                      className="w-6 h-6 hover:bg-white text-white hover:text-red-400 rounded-full cursor-pointer"
                      variant="ghost">
                      <CiPlay1/>
                    </IconButton>
                  </MapPreviewIFrame>

                  <Tooltip content="copy twitch request" >
                    <CopyIcon
                      className="w-6 h-6 hover:bg-white text-white hover:text-red-400 rounded-full cursor-pointer"
                      content={`!bsr ${bsMap.id}`}>
                      <FaTwitch/>
                    </CopyIcon>
                  </Tooltip>
                  <Tooltip content="download zip" asChild>
                    <IconButton className="w-6 h-6 text-white hover:bg-white hover:text-red-400 rounded-full"
                                variant="ghost">
                      <Link href={bsMap.versions[0].downloadURL} className="text-inherit">
                        <IoCloudDownloadOutline/>
                      </Link>
                    </IconButton>
                  </Tooltip>
                  <Tooltip content="one click download" asChild>
                    <IconButton className="w-6 h-6  rounded-full  text-white hover:bg-white hover:text-red-400" variant="ghost">
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
          <MapMetaLabel.DurationLabel duration={bsMap.metadata.duration} tooltip={"duration of this map"}/>
          <MapMetaLabel.BSBPMLabel bpm={bsMap.metadata.bpm}/>
          </div>
        <ScrollArea>
          <div className='flex gap-1 p-1'>
            {
              bsMap.tags?.map((tag) => getMapTag(tag))
                .filter((tag) => tag != undefined && tag.type == BSMapTagType.Style)
                .map((tag) => {
                  return (
                    <BSMapTag className='text-nowrap font-medium text-xs' key={tag!.slug} tag={tag!}/>
                  )
                })
            }
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>

        <div className="mt-auto mb-2">
          <div className='flex items-center'>
            <Progress.Root className="relative overflow-hidden rounded-full min-w-24 max-w-32 h-2 bg-gray-100"
                           value={score}>
              <Progress.Indicator
                className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                style={{transform: `translateX(-${100 - score}%)` }}
                />
              </Progress.Root>
              <div className="pl-2 font-medium text-xs">{score.toFixed(1)}%</div>
            </div>
          <div className='flex items-center  space-x-2'>
              <div className='flex items-center space-x-2'>
              <MapMetaLabel.ThumbUpCountLabel count={bsMap.stats.upvotes} tooltip="up vote count"/>
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

