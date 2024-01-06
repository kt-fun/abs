'use client';
import BSBPMLabel from "@/components/labels/BSBPMLabel";
import BSUserLabel from "@/components/labels/BSUserLabel";
import DurationLabel from "@/components/labels/DurationLabel";
import NJSLabel from "@/components/labels/NJSLabel";
import NPSLabel from "@/components/labels/NPSLabel";
import { useBSMapDetail } from "@/hooks/useBSMapDetail";
import { BSBeatMap, BSMapDiff } from "@/interfaces/beatmap";
import * as Tabs from "@radix-ui/react-tabs";
import { Avatar, Card, Select, Table, Text } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { usePagingBSMapReview } from "@/hooks/usePagingBSMapReview";
import { BSMapRankingItem } from "@/interfaces/beatmap-rank";
import { usePagingBSMapScoreRank } from "@/hooks/usePagingMapScoreRank";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
function replaceWithBr(str:string) {
return str.replace(/\n/g, "<br />")
}


const ReviewItem = ({
    bsMapReview
}: {bsMapReview:BSMapReview})=> {
    return (
        <>
        <div>
            <div className="flex space-x-2">
                <Text size={"2"}>{bsMapReview.sentiment}</Text>
                <Text size={"2"}>{bsMapReview.creator!!.name}</Text>
                <Text size={"2"}>{bsMapReview.createAt}</Text>
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
            {
                reviews.map((review)=> (
                    <>
                    <ReviewItem bsMapReview={review}/>
                    </>
                ))
            }
        </div>

        </div>
    </Card>
    </>
}


const RankTable = ({rankItems,maxscore}:{rankItems:BSMapRankingItem[],maxscore:number}) => {
    return (
        <>
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
    const {rankingItems,id} = usePagingBSMapScoreRank(bsMap.versions[0].hash,currentType, currentDiff.characteristic, currentDiff.difficulty)
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
                    <Link href={link} target="_blank">
                        <RxExternalLink/>
                    </Link>
                    </Text>
                </div>

            </Tabs.List>
            <Tabs.Content className="TabsContent" value="BeatLeader">
                <RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore} />
            </Tabs.Content>
            <Tabs.Content className="TabsContent" value="ScoreSaber">
                <RankTable rankItems={rankingItems} maxscore={currentDiff.maxScore}/>
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
    const [top,setTop] = useState(0);
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
                    <Heading size={"2"} className="text-gray-500">{bsMap.metadata.songSubName}</Heading>
                    <Heading size={"2"} className="text-gray-500">{bsMap.metadata.songAuthorName}</Heading>

                    <BSUserLabel user={bsMap.uploader} size={"3"}/>
                    {bsMap.curator && <BSUserLabel user={bsMap.curator} size={"3"}/>}
                    <div className="flex items-center space-x-1">
                        <Text className="font-semibold">Duration</Text> <DurationLabel duration={bsMap.metadata.duration} size={"3"}/>
                    </div>
                    <div className="flex items-center space-x-1">
                        
                        <Text className="font-semibold">Tags</Text> {
                            
                            bsMap.tags?.map((tag)=>getMapTag(tag))?.map((tag:IBSMapTag|undefined)=>
                            <BSMapTag 
                            className='text-nowrap font-semibold my-0.5 px-2 bg-red-100 rounded-lg' size={"3"}
                            key={tag!.slug} 
                            tag={tag!}
                            />
                            )
                        }
                    </div>
                    <BSBPMLabel bpm={bsMap.metadata.bpm} size={"3"}/>
                    <DurationLabel duration={bsMap.metadata.duration} size={"3"}/>
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
  