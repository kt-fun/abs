'use client';
import BSBPMLabel from "@/components/labels/BSBPMLabel";
import BSUserLabel from "@/components/labels/BSUserLabel";
import DurationLabel from "@/components/labels/DurationLabel";
import NJSLabel from "@/components/labels/NJSLabel";
import NPSLabel from "@/components/labels/NPSLabel";
import { useBSMapDetail } from "@/hooks/api/useBSMapDetail";
import { BSBeatMap, BSMapDiff, getBSMapCoverURL } from "@/interfaces/beatmap";
import * as Tabs from "@radix-ui/react-tabs";
import { Avatar, Button, Card, Link, ScrollArea, Select, Table, Text, Tooltip } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NextLink from 'next/link'
import { useCallback, useEffect, useMemo, useState } from "react";
import BSMapTag from '@/components/BSMapTag'
import {BSMapTag as IBSMapTag } from '@/interfaces/mapTags'
import { getMapTag } from "@/interfaces/mapTags";
import LightAmountLabel from "@/components/labels/LightAmountLabel";
import BSNoteAmountLabel from "@/components/labels/BSNoteAmountLabel";
import BSObstacleAmountLabel from "@/components/labels/BSObstacleAmountLabel";
import BSBombAmountLabel from "@/components/labels/BSBombAmount";
import BSParityErrorLabel from "@/components/labels/BSParityErrorLabel";
import BSWarningLabel from "@/components/labels/BSWarningLabel";
import {BSMapReview} from "@/interfaces/beatmap-review"
import { usePagingBSMapReview } from "@/hooks/api/usePagingBSMapReview";
import { BSMapRankingItem } from "@/interfaces/beatmap-rank";
import { usePagingBSMapScoreRank } from "@/hooks/api/usePagingMapScoreRank";
import { RxExternalLink } from "react-icons/rx";
import ThumbDownLabel from "@/components/labels/ThumbDownLabel";
import ThumbUpLabel from "@/components/labels/ThumbUpLabel";
import RatingLabel from "@/components/labels/RatingLabel";
import DateLabel from "@/components/labels/DateLabel";
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
                    <Text>
                    {
                    bsMapReview.sentiment == "POSITIVE" && <FcLike/>
                    }
                    {
                    bsMapReview.sentiment == "NEGATIVE" && <BsHeartbreak/>
                    }
                    {
                    bsMapReview.sentiment == "NEUTRAL" && <TbMoodNeutral/>
                    }
                    </Text>
                    <NextLink href={`/mapper/${bsMapReview.creator?.id}`}>
                    <Link>
                    <Text>{bsMapReview.creator?.name}</Text>
                    </Link>
                    </NextLink>
                    <DateLabel date={bsMapReview.createdAt}/>
            </div>
            <div className="flex space-x-2">
                <Text size={"2"}>{bsMapReview.sentiment}</Text>
                <Text size={"2"}>{bsMapReview.creator!!.name}</Text>
                <Text size={"2"}>{bsMapReview.createdAt}</Text>
            </div>
            <div>
                <p className="block" dangerouslySetInnerHTML={{__html: replaceWithBr(bsMapReview.text)}}/>
            </div>
        </div>
        </>
    )
}

const DetialTab = ({
    bsMap
}:{bsMap:BSBeatMap}) => {
    const {reviews} = usePagingBSMapReview(bsMap.id) 
    return <>
    <Card>
        <div className="grid grid-cols-2 gap-2">
        <div>
            <Heading size={"2"}>Description</Heading>
            <p className="block" dangerouslySetInnerHTML={{__html: replaceWithBr(bsMap.description)}}/>
        </div>
        <div>
            <Heading size={"2"}>Difficulty</Heading>                              
            {
                bsMap.versions[0].diffs.map((diff)=> {
                    return (
                        <>
                        <div className="flex justify-start">
                            <div className="min-w-[100px]">
                                <Text size={"2"}>{diff.difficulty}</Text>
                            </div>
                            <div className='grid grid-cols-4 gap-1 ' key={diff.characteristic + diff.difficulty}>
                                <BSParityErrorLabel size={"1"} amount={diff.paritySummary.errors} />
                                <NPSLabel size={"1"} nps={diff.nps}/>
                                <NJSLabel size={"1"} njs={diff.njs}/>
                                <LightAmountLabel size={"1"} amount={diff.events}/>
                                <BSWarningLabel size={"1"} amount={diff.paritySummary.warns} />
                                <BSNoteAmountLabel size={"1"} amount={diff.notes}/>
                                <BSObstacleAmountLabel size={"1"} amount={diff.obstacles}/>
                                <BSBombAmountLabel size={"1"} amount={diff.bombs}/>
                            </div>             
                        </div>                                   
                        </>
                    )
                })
            }
        </div>
        <div className="col-span-2">
            <Heading size={"2"}>Reviews</Heading>
            <div className="flex flex-col space-y-2 divide-y-[1px]">
            
            {
                reviews.length > 0 ? (
                    reviews.map((review)=> (
                        <>
                        <ReviewItem bsMapReview={review}/>
                        </>
                    ))
                ):(
                    <div>no reviews found</div>
                )

            }
            </div>
        </div>

        </div>
    </Card>
    </>
}


const RankTable = ({
    rankItems,
    maxscore,
    hasMore,
    isLoading,
    loadMore,
}:{
    rankItems:BSMapRankingItem[],
    maxscore:number,
    hasMore:boolean,
    isLoading:boolean,
    loadMore:()=>void
}) => {
    return (
        <>
        <ScrollArea scrollbars="vertical" style={{ height: 480 }}>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Mods</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Accuracy</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PP</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    rankItems.map((rankItem)=>(
                        <Table.Row key={rankItem.playerId}>
                            <Table.RowHeaderCell>{rankItem.rank}</Table.RowHeaderCell>
                            <Table.Cell>{rankItem.name}</Table.Cell>
                            <Table.Cell>{rankItem.score}</Table.Cell>
                            <Table.Cell>{rankItem.mods.join(",")}</Table.Cell>
                            <Table.Cell>{(rankItem.score/maxscore*100).toFixed(2)}</Table.Cell>
                            <Table.Cell>{rankItem.pp}</Table.Cell>
                        </Table.Row>
                    ))
                }

            </Table.Body>
        </Table.Root>
        <div  className="w-full flex flex-end px-2">
            <Button variant="ghost" className="ml-auto mr-2 my-4" disabled={!hasMore || isLoading} onClick={loadMore}>{
                isLoading ? "Loading..." : "Load More"
            }</Button>
        </div>

            </ScrollArea>
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
        <Select.Root defaultValue={currentDiff.characteristic + currentDiff.difficulty}  onValueChange={handleDiffChange}>
            <Select.Trigger />
            <Select.Content>
                {
                    diffs.map((diff)=>(
                        <>
                           <Select.Item key={diff.characteristic + diff.difficulty} value={diff.characteristic + diff.difficulty} >{diff.characteristic + diff.difficulty}</Select.Item>
                        </>
                    ))
                }
            </Select.Content>
        </Select.Root>
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
        <Card>
        <Tabs.Root className="flex flex-col  mx-auto h-full w-full"  defaultValue="BeatLeader" onValueChange={handleValueChange}>
            <Tabs.List  className="flex justify-between" aria-label="">
                <div className="px-1 py-0.5 rounded-full flex w-fit mr-auto space-x-2 mb-2 bg-gray-100 dark:bg-[#232325] ">
                <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="BeatLeader">
                    <div>BeatLeader</div>
                </Tabs.Trigger>
                <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="ScoreSaber">
                    <div>ScoreSaber</div>
                </Tabs.Trigger>
                </div>
                <div className="flex items-center space-x-2">
                    <DiffSelector diffs={bsMap.versions[0].diffs} currentDiff={currentDiff} setCurrentDiff={setCurrentDiff}/>
                    <Text size={"4"} className="hover:text-blue-400">
                    <NextLink href={link} target="_blank">
                        <RxExternalLink/>
                    </NextLink>
                    </Text>
                </div>

            </Tabs.List>
            <Tabs.Content className="TabsContent" value="BeatLeader">
                {
                    rankingItems.length > 0 ? 
                    (<RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore} isLoading={isLoadingMore} hasMore={hasMore} loadMore={loadMore}/>)
                    :( <div>no score found</div>)
                }
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="ScoreSaber">
                {
                    rankingItems.length > 0 ? 
                    (<RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore} isLoading={isLoadingMore} hasMore={hasMore} loadMore={loadMore}/>):
                    (<div>no score found</div>)
                }
            </Tabs.Content>
            </Tabs.Root>
            </Card>
        </>
    )
}

export default function BSMapDetailPage({ params }: { params: { id: string } }) {

  const {bsMap, isLoading, error} = useBSMapDetail(params.id)

  const router = useRouter()
  if(error) {
    router.push("/")
  }
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
    return isLoading? 
    <div>loading</div>
    :
    <>
        <div className=" flex-col max-w-[1200px] grow  space-x-2 justify-center items-center">
            <div className="flex space-x-2">
                <Image 
                src={bsMap.versions[0].coverURL} 
                className="grow-0 w-[300px] h-[300px] rounded-lg" 
                alt={bsMap.name} 
                width={300} 
                height={300}
                />
                <div>
                    <Heading>{bsMap.name}</Heading>
                    <Heading size={"2"} className=" font-semibold">Song Author： {bsMap.metadata.songAuthorName}</Heading>
                    <Text className="flex space-x-2 font-semibold items-center">Mapper <BSUserLabel user={bsMap.uploader} size={"3"}/></Text>
                    {bsMap.curator && (
                        <div className="flex space-x-4 items-center">
                            <Text className="font-semibold">Curated By </Text> 
                        <BSUserLabel user={bsMap.curator} size={"3"}/></div>
                    )}
                    <div className="flex items-center space-x-4">
                        <Text className="font-semibold">Created At</Text> <DateLabel date={bsMap.createdAt} size={"3"}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Text className="font-semibold">Duration</Text> <DurationLabel duration={bsMap.metadata.duration} size={"3"}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Text className="font-semibold">BPM</Text> <BSBPMLabel bpm={bsMap.metadata.bpm} size={"3"}/>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Text className="font-semibold">Rating</Text>
                        <ThumbDownLabel dislikeCnt={bsMap.stats.downvotes} size={"3"}/>
                        <ThumbUpLabel likeCnt={bsMap.stats.upvotes} size={"3"}/>
                        <RatingLabel  rate={bsMap.stats.score} size={"3"}/>
                    </div>
                    <div className="flex items-center space-x-1">
                        
                        <Text className="font-semibold">Tags</Text> {
                            
                            (bsMap.tags && bsMap.tags?.length > 0) ? (
                                bsMap.tags?.map((tag)=>getMapTag(tag))?.map((tag:IBSMapTag|undefined)=>
                                    <BSMapTag 
                                    className='text-nowrap font-semibold my-0.5 px-2 rounded-lg' size={"3"}
                                    key={tag!.slug} 
                                    tag={tag!}
                                    />
                                )
                            ):(
                                <div>no tags</div>
                            )
                        }
                    </div>
                    <div>

                    <div className="flex items-center space-x-1 justify-start pb-2">
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
                                        state.loading? (
                                        <motion.span 
                                            animate={{rotate:360}}
                                            transition={{duration:1,repeat:Infinity}}
                                            onClick={handlePlaySongPreview} 
                                            className={`hover:bg-white ${current?'bg-white text-red-400':''} hover:text-red-400 p-1 rounded-full cursor-pointer`}
                                        >
                                            <AiOutlineLoading/>
                                        </motion.span>
                                        ):(
                                        <motion.span 
                                            animate={{scale:1.05}}
                                            transition={{duration:.5,repeat:Infinity}}
                                            onClick={handlePlaySongPreview} 
                                            className={`hover:bg-white ${current?'bg-white text-red-400':''} hover:text-red-400 p-1 rounded-full cursor-pointer`}
                                        >
                                            <PiHeartbeat/>
                                        </motion.span>
                                        )
                                    :
                                    <span 
                                    onClick={handlePlaySongPreview} 
                                    className={`hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer`}>
                                      <CiMusicNote1/>
                                    </span>
                                    }
                                  </Tooltip>
                                  <Tooltip content="play map preview">
                                    <MapPreviewIFrame id={bsMap.id}>
                                    <span  className="hover:bg-white hover:text-red-400 p-1 rounded-full cursor-pointer">
                                        <CiPlay1 />
                                    </span>
                                    </MapPreviewIFrame>
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
            </div>
            <div className="flex grow">
                <Tabs.Root className="flex flex-col  mx-auto h-full w-full"  defaultValue="tab1">
                <Tabs.List className="px-1 py-0.5 bg-gray-100 dark:bg-[#232325] rounded-full flex w-fit mx-auto space-x-2 mb-2" aria-label="">
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="tab1">
                        <div>detail</div>
                    </Tabs.Trigger>
                    
                    <Tabs.Trigger className="rounded-full px-2 data-[state=active]:dark:bg-[#0d0d0e] data-[state=active]:bg-white" value="tab2">
                        
                        <div>ranking</div>
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="tab1">
                    <DetialTab bsMap={bsMap}/>
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <RankingTab bsMap={bsMap}/>
                </Tabs.Content>                    
                </Tabs.Root>
            </div>
        </div>
    </>
}
  