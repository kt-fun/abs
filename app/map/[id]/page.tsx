'use client';

import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import * as MapDiffLabel from "@/components/labels/BSMapDiffLabels";
import { useBSMapDetail } from "@/hooks/api/useBSMapDetail";
import { BSBeatMap, BSMapDiff, getBSMapCoverURL } from "@/interfaces/beatmap";
import * as Tabs from "@radix-ui/react-tabs";
import {IconButton,Button} from "@/components/ui/button";
import {Tooltip} from "@/components/ui/tooltip";
import Link from "@/components/ui/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { getMapTag } from "@/interfaces/mapTags";
import {BSMapReview} from "@/interfaces/beatmap-review"
import { usePagingBSMapReview } from "@/hooks/api/usePagingBSMapReview";
import { BSMapRankItem } from "@/interfaces/beatmap-rank";
import { usePagingBSMapScoreRank } from "@/hooks/api/usePagingMapScoreRank";
import { RxExternalLink } from "react-icons/rx";
import { HiCursorClick } from "react-icons/hi";
import { IoAddOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { FaTwitch } from "react-icons/fa";
import { CiBookmark, CiMusicNote1, CiPlay1 } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
import { PiHeartbeat } from "react-icons/pi";
import { motion } from "framer-motion";
import { useSongPreview } from "@/hooks/useSongPreview";
import CopyIcon from "@/components/CopyIcon";
import MapPreviewIFrame from "@/components/MapPreviewIFrame";
import { BsHeartbreak } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { TbMoodNeutral } from "react-icons/tb";
import BSMapTag from "@/components/BSMapTag";
import BSUserLabel from "@/components/labels/BSUserLabel";
import Loading from "@/components/load-status/Loading";
import {escapeHtml} from "@/lib/ContentEscape";
import {ExternalLink} from "lucide-react";

function replaceWithBr(str:string) {
  return str.replace(/\n/g, "<br />")
}


const ReviewItem = ({
    bsMapReview
}: {bsMapReview:BSMapReview})=> {
    return (
        <>
        <div>
            <div className="flex space-x-2 items-center">
                    <div>
                    {
                    bsMapReview.sentiment == "POSITIVE" && <FcLike/>
                    }
                    {
                    bsMapReview.sentiment == "NEGATIVE" && <BsHeartbreak/>
                    }
                    {
                    bsMapReview.sentiment == "NEUTRAL" && <TbMoodNeutral/>
                    }
                    </div>
                    <Link href={`/mapper/${bsMapReview.creator?.id}`}>
                      {bsMapReview.creator?.name}
                    </Link>
                    <MapMetaLabel.DateLabel date={bsMapReview.createdAt}/>
            </div>
            <div className="flex space-x-2">
                <div >{bsMapReview.sentiment}</div>
                <div >{bsMapReview.creator!!.name}</div>
                <div >{bsMapReview.createdAt}</div>
            </div>
            <div>
                <p className="block" dangerouslySetInnerHTML={{__html: replaceWithBr(bsMapReview.text)}}/>
            </div>
        </div>
        </>
    )
}

const DetailTab = ({
    bsMap
}:{bsMap:BSBeatMap}) => {
    const {reviews} = usePagingBSMapReview(bsMap.id) 
    return <>
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
            <div className="text-xl font-bold">Description</div>
            <p className="block" dangerouslySetInnerHTML={{__html: escapeHtml(replaceWithBr(bsMap.description))}}/>
        </div>
          <div>
            <div className="text-xl font-bold">Difficulty</div>
            {
              bsMap.versions[0].diffs.map((diff) => {
                return (
                  <>
                    <div className="flex justify-start">
                      <div className="min-w-[100px]">
                        <div className="text-xs">{diff.difficulty}</div>
                      </div>
                      <div className='grid grid-cols-4 gap-1 ' key={diff.characteristic + diff.difficulty}>
                        <MapDiffLabel.BSMapParityErrorLabel count={diff.paritySummary.errors}/>
                        <MapDiffLabel.BSNPSLabel nps={diff.nps}/>
                        <MapDiffLabel.BSNJSLabel njs={diff.njs}/>
                        <MapDiffLabel.BSLightCountLabel count={diff.events}/>
                        <MapDiffLabel.BSMapParityWarningLabel count={diff.paritySummary.warns}/>
                        <MapDiffLabel.BSNoteCountLabel count={diff.notes}/>
                        <MapDiffLabel.BSObstacleCountLabel count={diff.obstacles}/>
                        <MapDiffLabel.BSBombCountLabel count={diff.bombs}/>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold">Reviews</div>
            <div className="flex flex-col space-y-2 divide-y-[1px]">
              {
                reviews.length > 0 ? (
                  reviews.map((review) => (
                    <>
                      <ReviewItem bsMapReview={review}/>
                    </>
                  ))
                ) : (
                  <div>no reviews found</div>
                )

              }
            </div>
          </div>

        </div>
    </div>
    </>
}

const truncate = (str: string, n:number) => {
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

const RankTable = ({
    rankItems,
    maxscore,
    hasMore,
    isLoading,
    loadMore,
}:{
    rankItems:BSMapRankItem[],
    maxscore:number,
    hasMore:boolean,
    isLoading:boolean,
    loadMore:()=>void
}) => {
    return (
        <>
        {/*<ScrollArea scrollbars="vertical" style={{ height: 480 }}>*/}
        <Table className="overflow-hidden">
            <TableHeader>
                <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="hidden  sm:table-cell">Mods</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead className="hidden sm:table-cell">PP</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    rankItems.map((rankItem)=>(
                        <TableRow key={rankItem.playerId}>
                            <TableCell>{rankItem.rank}</TableCell>
                            <TableCell>
                              <Tooltip content={rankItem.name}>
                                <div>{truncate(rankItem.name,10)}</div>
                              </Tooltip>
                            </TableCell>
                            <TableCell >{rankItem.score}</TableCell>
                            <TableCell className="hidden sm:table-cell">{rankItem.mods.join(",")}</TableCell>
                            <TableCell>{(rankItem.score/maxscore*100).toFixed(2)}</TableCell>
                            <TableCell  className="hidden sm:table-cell">{rankItem.pp}</TableCell>
                        </TableRow>
                    ))
                }

            </TableBody>
        </Table>
        <div  className=" flex flex-end px-2">
            <Button variant="ghost" className="ml-auto mr-2 my-4" disabled={!hasMore || isLoading} onClick={loadMore}>{
                isLoading ? "Loading..." : "Load More"
            }</Button>
        </div>
        </>
    )
}



const DiffSelector = ({
    diffs, currentDiff, setCurrentDiff
}:{
    diffs:BSMapDiff[],
    currentDiff:BSMapDiff,
    setCurrentDiff:(diff:BSMapDiff)=>void
}) => {
    const diffMap = new Map<string,BSMapDiff>()
    useEffect(()=>{
        diffs.forEach((diff)=>{
            diffMap.set(diff.characteristic + diff.difficulty,diff)
        })
    })
    const handleDiffChange = (diff:string)=>{
        setCurrentDiff(diffMap.get(diff)!)
    }
    return (
        <Select  defaultValue={currentDiff.characteristic + currentDiff.difficulty}  onValueChange={handleDiffChange}>
          <SelectTrigger className="w-fit">
            <SelectValue/>
          </SelectTrigger>
            <SelectContent >
                {
                    diffs.map((diff)=>(
                        <>
                           <SelectItem key={diff.characteristic + diff.difficulty} value={diff.characteristic + diff.difficulty} >{diff.characteristic + diff.difficulty}</SelectItem>
                        </>
                    ))
                }
            </SelectContent>
        </Select>
    )
}


const RankingTab =({
    bsMap,
}:{bsMap:BSBeatMap}) => {
    const [top,setTop] = useState(0);
    const [currentDiff, setCurrentDiff] = useState(bsMap.versions[0].diffs[0])
    const [currentType, setCurrentType] = useState<"BeatLeader"|"ScoreSaber">("BeatLeader")
    const {rankingItems,id,hasMore,loadMore,isLoadingMore} = usePagingBSMapScoreRank(bsMap.versions[0].hash,currentType, currentDiff.characteristic, currentDiff.difficulty)
    const link = useMemo(()=>{
        if(currentType === "BeatLeader") {
            return `https://www.beatleader.xyz/leaderboard/global/${id}`
        }
        return `https://scoresaber.com/leaderboard/${id}`
    },[id,currentType])
    const handleValueChange = (value:string)=>{
        setCurrentType(value as "BeatLeader"|"ScoreSaber")
    }

    return (
        <>
        <div>
        <Tabs.Root className="flex flex-col  mx-auto h-full w-full"  defaultValue="BeatLeader" onValueChange={handleValueChange}>
          <Tabs.List className=" items-center" aria-label="">
            <div className="flex  w-full justify-between items-center">
              <div className="my-2 md:hidden">
                <div className="text-xl font-bold">Ranking</div>
              </div>
              <div className="md:flex items-center space-x-2 justify-end hidden">
                <DiffSelector diffs={bsMap.versions[0].diffs} currentDiff={currentDiff}
                              setCurrentDiff={setCurrentDiff}/>
                <div className="hover:text-blue-400">
                  <Link href={link} target="_blank">
                    {/*<RxExternalLink/>*/}
                    <ExternalLink/>
                  </Link>
                </div>
              </div>
              <div
                className="px-1 py-0.5 rounded-full flex items-center my-auto w-fit space-x-2 bg-gray-100 dark:bg-[#232325] ">
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="BeatLeader">
                  <div>BeatLeader</div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                  value="ScoreSaber">
                  <div>ScoreSaber</div>
                </Tabs.Trigger>
              </div>
            </div>
            <div className="flex md:hidden items-center space-x-2 justify-end">
              <DiffSelector diffs={bsMap.versions[0].diffs} currentDiff={currentDiff} setCurrentDiff={setCurrentDiff}/>
              <div className="hover:text-blue-400">
                <Link href={link} target="_blank">
                  <RxExternalLink/>
                </Link>
              </div>
            </div>

          </Tabs.List>
          <Tabs.Content className="" value="BeatLeader">
          <RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore} isLoading={isLoadingMore} hasMore={hasMore} loadMore={loadMore}/>
          </Tabs.Content>
          <Tabs.Content className="" value="ScoreSaber">
            <RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore} isLoading={isLoadingMore} hasMore={hasMore} loadMore={loadMore}/>
          </Tabs.Content>
        </Tabs.Root>
      </div>
        </>
    )
}


const OpsPanel = ({bsMap}:{bsMap:BSBeatMap})=>{
  const {currentSong,state,play,stop} = useSongPreview()
  const handlePlaySongPreview = () => {
    if(state.playing && currentSong?.id == bsMap.id){
      stop()
    }else{
      play({
        id:bsMap.id,
        previewURL:bsMap.versions[0].previewURL,
        coverURL:getBSMapCoverURL(bsMap),
      })
    }
  }
  const current = useMemo(()=>{
    return currentSong?.id == bsMap?.id
  },[currentSong,bsMap])
  const handleBookmark = ()=>{

  }
  const handleAddToPlaylist = ()=>{

  }
  return (
    <>
    <div className="flex items-center space-x-1 md:justify-start pb-2 justify-evenly md:w-auto w-full">
      <Tooltip content="add to playlist" asChild>
        <IconButton onClick={handleAddToPlaylist}
                    className="w-6 h-6 hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                    variant="ghost">
          <IoAddOutline/>
        </IconButton>
      </Tooltip>
      <Tooltip content="bookmark song" asChild>
        <IconButton onClick={handleBookmark}
                    className="w-6 h-6 hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer"
                    variant="ghost">
          <CiBookmark/>
        </IconButton>
      </Tooltip>
      <Tooltip content="play song preview" asChild>
        <IconButton onClick={handlePlaySongPreview}
                    className={`w-6 h-6 hover:bg-white ${current ? 'bg-white text-red-400' : ''} hover:text-red-400 p-1 rounded-full cursor-pointer ${current && state.loading ? 'animate-spin' : ''}`}
                    variant="ghost">
          {current ? state.loading ? <AiOutlineLoading/> : <PiHeartbeat/> : <CiMusicNote1/>}
        </IconButton>
      </Tooltip>
      <MapPreviewIFrame id={bsMap.id}>
        <IconButton
          className="w-6 h-6 hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer"
          variant="ghost">
          <CiPlay1/>
        </IconButton>
      </MapPreviewIFrame>
      <Tooltip content="copy twitch request" asChild>
        <CopyIcon
          className="w-6 h-6 hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer"
          content={`!bsr ${bsMap.id}`}>
          <FaTwitch/>
        </CopyIcon>
      </Tooltip>
      <Tooltip content="download zip" asChild>
        <IconButton className="w-6 h-6 hover:bg-white hover:text-red-400 p-1 rounded-full"
                    variant="ghost">
          <Link href={bsMap.versions[0].downloadURL} className="text-inherit">
            <IoCloudDownloadOutline/>
          </Link>
        </IconButton>
      </Tooltip>

      <Tooltip content="one click download" asChild>
        <IconButton className="w-6 h-6  p-1 rounded-full hover:bg-white hover:text-red-400" variant="ghost">
          <Link href={`beatsaver://${bsMap.id}`} className="text-inherit">
            <HiCursorClick/>
          </Link>
        </IconButton>
      </Tooltip>
    </div>
    </>
  )
}


const TagList = ({tags,className}:{tags:string[],className?:string})=>{
  return (
    <div className={`flex space-x-1 flex-wrap ${className}`}>
      {
        (tags && tags.length > 0) ? (
          tags?.map((tag) => getMapTag(tag)).filter((it) => it !== undefined)
            .map((tag) => {
                console.log(tag)
                return (
                  <>
                    <BSMapTag
                      className='text-nowrap font-semibold my-0.5 px-2 rounded-lg'
                      key={tag!.slug}
                      tag={tag!}
                    />
                  </>
                )
              }
            )
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default function BSMapDetailPage({params}: { params: { id: string } }) {

  const {bsMap, isLoading, error} = useBSMapDetail(params.id)

  const router = useRouter()
  if (error) {
    router.push("/")
  }
  return isLoading ?
    <Loading/> :
    <>
      <div className=" flex-col max-w-[1200px] grow  space-x-2 justify-center items-center">
        <div className="flex space-x-2">
          <Image
            src={bsMap.versions[0].coverURL}
            className="grow-0 w-[144px] h-[144px] rounded-lg md:w-[300px] md:h-[300px]"
            alt={bsMap.name}
            width={300}
            height={300}
          />
          <div>
            <div className="text-xl font-bold">{bsMap.name}</div>
            <div className="text-xl font-semibold md:block hidden">Song
              Author： {bsMap.metadata.songAuthorName}</div>
            <div className="flex items-center md:space-x-4">
              <div className=" space-x-2 font-semibold items-center md:block hidden">
                Mapper
              </div>
              <BSUserLabel user={bsMap.uploader}/>
            </div>
            {bsMap.curator && (
              <div className="flex md:space-x-4 items-center">
                <div className="font-semibold md:block hidden">Curated By </div>
                <BSUserLabel user={bsMap.curator}/></div>
            )}
            <div className="flex items-center md:space-x-4">
              <div className="font-semibold md:block hidden">Created At</div> <MapMetaLabel.DateLabel date={bsMap.createdAt}/>
            </div>
            <div className="flex md:block space-x-1">
              <div className="flex items-center md:space-x-4">
                <div className="font-semibold md:block hidden">Duration</div> <MapMetaLabel.DurationLabel duration={bsMap.metadata.duration}/>
              </div>
              <div className="flex items-center md:space-x-4">
                <div className="font-semibold md:block hidden">BPM</div> <MapMetaLabel.BSBPMLabel bpm={bsMap.metadata.bpm}/>
              </div>
            </div>
            <div className="flex items-center md:space-x-4">
              <div className="font-semibold md:block hidden">Rating</div>
              <MapMetaLabel.ThumbDownCountLabel count={bsMap.stats.downvotes} />
              <MapMetaLabel.ThumbUpCountLabel count={bsMap.stats.upvotes}/>
              <MapMetaLabel.BSRatingLabel rate={bsMap.stats.score} />
            </div>
            <div className="hidden md:flex">
              <TagList tags={bsMap.tags ?? []}/>
            </div>
            <div className="hidden md:flex">
              <OpsPanel bsMap={bsMap}/>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div className="flex md:hidden py-2">
          <TagList tags={bsMap.tags ?? []} className=""/>
        </div>
        <div className="flex md:hidden justify-end mr-0 ml-auto">
          <OpsPanel bsMap={bsMap}/>
        </div>
        <div className="hidden md:flex">
          <Tabs.Root className="flex flex-col w-full h-full " defaultValue="tab1">
            <Tabs.List
              className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mx-auto space-x-2 mb-2"
              aria-label="">
              <Tabs.Trigger
                className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                value="tab1">
                <div>detail</div>
              </Tabs.Trigger>
              <Tabs.Trigger
                className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white"
                value="tab2">
                <div>ranking</div>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <DetailTab bsMap={bsMap}/>
            </Tabs.Content>
            <Tabs.Content  value="tab2">
              <RankingTab bsMap={bsMap}/>
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="block md:hidden">
          <DetailTab bsMap={bsMap}/>
          <RankingTab bsMap={bsMap}/>
        </div>
      </div>
    </>
}
  