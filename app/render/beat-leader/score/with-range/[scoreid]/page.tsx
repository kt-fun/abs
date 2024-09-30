import { Avatar } from "@/components/ui/avatar";
import config from "@/lib/config";
import { Datum } from "@/interfaces/render/beatleaderreq";
import { BarChart, Check, Key, Star, Clock, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";
import QRCode from "@/components/render/qrcode";
import {cn, diffConv} from "@/lib/utils";
import ScoreGraph from "@/components/render/scoregraph";
import { BSMap } from "@/interfaces/render/beatsaver";
import { formatDuration, formatTime } from "@/lib/render/format";
import Progress from "@/components/render/progress";
import {ScoreItem} from "@/app/render/beat-leader/score/with-range/[scoreid]/ScoreItem";
import {GiHeartBeats} from "react-icons/gi";

const BASE_URL = config.constants.BASE_URL

async function getScoreInfo(scoreid:string) {
    const url = `${BASE_URL}/api/render/beatleader/score/${scoreid}`
    const res =  await fetch(url)
    if (!res.ok) {
      throw new Error('Failed to fetch scoreInfo:'+ scoreid)
    }
    return (await res.json()) as Datum
}

async function getBeatMapInfo(hashId:string) {
    // const url = `${BASE_URL}/api/render/beatsaver/hash/${hashId}`
    const url = `https://beatsaver.com/api/maps/hash/${hashId}`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch mapInfo:' + hashId)
    }
    return (await res.json()) as BSMap
}

// https://api.beatleader.xyz/leaderboard/f91e71?leaderboardContext=general&page=1&sortBy=rank&order=desc
// https://api.beatleader.xyz/leaderboard/?leaderboardContext=general&page=289&sortBy=rank&order=desc
const getLeaderboard = async (leaderboardId:string,page: number) => {
    const url = `https://api.beatleader.xyz/leaderboard/${leaderboardId}?leaderboardContext=general&page=${page}&sortBy=rank&order=desc`
    const res =  await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch mapInfo:'+ leaderboardId)
    }
    return (await res.json()) as any
}

// https://api.beatleader.xyz/leaderboard/CommercialPumping91?leaderboardContext=general&page=1&countries=HK&sortBy=rank&order=deschttps://api.beatleader.xyz/leaderboard/CommercialPumping91?leaderboardContext=general&page=1&countries=HK&sortBy=rank&order=desc

async function getLeaderboardAround(leaderboardId:string,rank: number) {
    let page = Math.ceil(rank / 10)
    // 19
    const rest = rank % 10
    // 8
    if(rest > 5) {
        page--
    }
    const res = await Promise.all([
        getLeaderboard(leaderboardId, page),
        getLeaderboard(leaderboardId, page+1),
    ])

    return res
}

const getRegionLeaderboard = async (leaderboardId:string,page: number, regionCode: string) => {
    const url = `https://api.beatleader.xyz/leaderboard/${leaderboardId}?leaderboardContext=general&page=${page}&sortBy=rank&order=desc&countries=${regionCode}`
    const res =  await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch mapInfo:'+ leaderboardId)
    }
    return (await res.json()) as any
}
async function getLeaderboardRegion(leaderboardId:string,regionCode: string) {
    return getRegionLeaderboard(leaderboardId, 1, regionCode)
}

export default async function BSPlayerRankPage({params,searchParams}: { params: { scoreid: string },searchParams: { [key: string]: string | string[] | undefined };}) {

    const [score] = await Promise.all([
        getScoreInfo(params.scoreid),
    ])

    //
    const  [res, regionTopScores] = await Promise.all([
        getLeaderboardAround(score.leaderboardId, score.rank),
        getLeaderboardRegion(score.leaderboardId, score.player.country)
    ])
    const aroundScores = res.flatMap(it=>it.scores)
    const beatmap = await getBeatMapInfo(score.song.hash)
    const aroundScore = aroundScores[0]
    // console.log("fetch scoreInfo", score)

    const bg = "https://www.loliapi.com/acg/pc/"

    return (
        <>

        <div
          className={"flex flex-col justify-center items-center relative h-[720px] w-[1165px] my-auto rounded-none"}
          id="render-result"
        >
            <div
              className={"bg-blend-darken h-full w-full left-auto absolute right-auto bg-black/[.6] p-4 text-white flex flex-col justify-between z-10"}
            >
                <div className={'flex justify-between items-start gap-2 grow'}>
                    <div className="flex flex-col  items-start justify-between text-xl font-bold grow h-full">
                        <div className="flex space-x-4 items-center justify-between text-2xl font-bold">
                            <Avatar className={"h-16 w-16 rounded-full"} src={score.player.avatar}
                                    fallback={score.player.name.slice(0, 1)}/>
                            <div>{score.player.name}</div>
                        </div>
                        <div className="text-xl text-ellipsis line-clamp-2">{score.song.name}</div>
                        <div className="flex space-x-4 h-52">
                            <Avatar
                              className={"h-52 w-52 rounded-md"}
                              src={score.song.cover}
                              fallback={score.song.name.slice(0, 1)}
                            />
                            <div className="text-xs font-bold flex flex-col items-start justify-between grow w-full">
                                <div className="flex space-x-2 items-center text-sm">
                                    <Avatar
                                      className={"h-4 w-4 rounded-full"}
                                      src={beatmap.uploader.avatar}
                                      fallback={score.song.mapper.slice(0, 1)}
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="text-ellipsis line-clamp-1">
                                            {score.song.mapper}
                                        </div>
                                    </div>
                                </div>
                                <div
                                  className="text-xs flex gap-2 items-center *:space-x-1 *:flex *:items-center font-normal">

                                    <div className="flex items-center">
                                        <GiHeartBeats className="h-3 w-3"/>
                                        <span>{beatmap.metadata.bpm.toFixed(0)}</span>
                                    </div>
                                    <div>
                                        <span><Key className={"w-3 h-3"}/></span>
                                        <span>{score.song.id.toLowerCase().replaceAll('x', '')}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <Clock className="h-3 w-3"/>
                                        <span>{formatDuration(beatmap.metadata.duration)}</span>
                                    </div>
                                    <div className="flex items-center text-ellipsis col-span-2 line-clamp-1">
                                        <Calendar className="h-3 w-3"/>
                                        <span>{formatTime(beatmap.lastPublishedAt)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 justify-between font-normal">
                                    <Progress value={beatmap.stats.score * 100} className="h-1.5"
                                              containerClassName="h-1.5"/>
                                    <span>{(beatmap.stats.score * 100).toFixed(2)} %</span>
                                    <div className="flex items-center">
                                        <ThumbsUp className="h-3 w-3"/>
                                        <span>{beatmap.stats.upvotes}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ThumbsDown className="h-3 w-3"/>
                                        <span>{beatmap.stats.downvotes}</span>
                                    </div>
                                </div>
                                <div className={'text-lg min-w-60 flex flex-col leading-6'}>

                                    <div className="flex justify-between items-center">
                                        <span> # {score.pp.toFixed(2)} PP</span>
                                        <span> # {score.rank}</span>
                                    </div>
                                    {
                                        <div className="flex items-center justify-between">
                                            <span>Accuracy</span>
                                            <span>{(score.accuracy * 100).toFixed(2)} %</span>
                                        </div>
                                    }
                                    {
                                      score.fullCombo &&
                                      <div className="flex items-center justify-between">
                                          <span>Full Combo</span>
                                          <Check/>
                                      </div>
                                    }
                                    {
                                      score.maxCombo &&
                                      <div className="flex items-center justify-between">
                                          <span>Max Combo</span>
                                          <span>{score.maxCombo}</span>
                                      </div>
                                    }

                                    {
                                        <div className="flex items-center justify-between">
                                            <span>Missed Notes</span>
                                            <span>{score.missedNotes}</span>
                                        </div>
                                    }
                                    {
                                        <div className="flex items-center justify-between">
                                            <span>Total Mistakes</span>
                                            <span>{score.missedNotes}</span>
                                        </div>
                                    }
                                    {
                                      score.modifiers && <div className="flex items-center justify-between">
                                          <span>Modifiers</span>
                                          <span>{score.modifiers}</span>
                                      </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*diff code */}
                        <div
                          className="text-xl font-bold h-24 w-[500px] rounded-lg  mt-auto flex items-center justify-evenly gap-2 ">
                        {
                            res[0].song.difficulties.filter((it:any)=>it.mode === 1).map((diff:any)=> (
                                  <Difficulty difficulty={diff.difficultyName} stars={diff.stars} current={score.difficulty.id === diff.id} key={diff.difficultyName}/>
                                ))
                            }
                        </div>

                        {/*acc graph*/}
                        <div className="align-end mt-2 mb-2">
                            <span className="text-xl font-bold">
                                AccGraph
                            </span>
                            <ScoreGraph scoreId={score.id} scoreInfo={score}/>
                        </div>
                    </div>
                    <div className={'flex justify-between gap-2 items-center mt-auto'}>

                        <div className={'flex flex-col items-center gap-2'}>
                            <div className={'text-white font-bold text-3xl mr-auto'}>Global Rank</div>
                            {
                                aroundScores.slice(0, 7).map((aroundScore: any) =>
                                  <ScoreItem key={aroundScore.id} name={aroundScore.player.name}
                                             date={aroundScore.timepost}
                                             countryCode={aroundScore.player.country ?? "CN"}
                                             avatar={aroundScore.player.avatar} globalRank={aroundScore.rank}
                                             score={aroundScore.modifiedScore}
                                             modifiers={aroundScore.modifiers}
                                             isRegionRank={false} acc={aroundScore.accuracy}
                                             pp={aroundScore.pp} self={aroundScore.player.id === score.playerId}/>
                                )
                            }
                        </div>
                        <div className={'flex flex-col items-center gap-2'}>
                            <div className={'text-white font-bold text-3xl mr-auto'}>Region Top Rank</div>
                            {
                                regionTopScores.scores.slice(0, 7).map((aroundScore: any) =>
                                  <ScoreItem key={aroundScore.id} name={aroundScore.player.name}
                                             date={aroundScore.timepost}
                                             countryCode={aroundScore.player.country ?? "CN"}
                                             avatar={aroundScore.player.avatar} globalRank={aroundScore.rank}
                                             score={aroundScore.modifiedScore}
                                             modifiers={aroundScore.modifiers}
                                             isRegionRank acc={aroundScore.accuracy}
                                             pp={aroundScore.pp} self={aroundScore.player.id === score.playerId}/>
                                )
                            }
                        </div>
                    </div>
                </div>


            </div>
            <img src={bg} className={'inset-0 rounded-lg absolute h-full object-cover w-full'} loading={'eager'}/>
        </div>
        </>
    )
}



function Difficulty({
    difficulty,
  stars,
  current
}:{
    difficulty: string,
    stars: number,
    current: boolean
}) {
    return (
      <div className={cn('p-2 rounded-lg bs-bg-gradient opacity-60', current && `gradient-border opacity-100`)}>
          <div className={'flex items-center gap-2'}>
              <span><BarChart className={"w-4 h-4"}/></span>
              <span>{diffConv(difficulty)}</span>
          </div>
          <div className={'flex items-center gap-2'}>
              <span><Star className={"w-4 h-4"}/></span>
              <span>{stars?.toFixed(2) ?? "none"} </span>
          </div>
      </div>
    )
}