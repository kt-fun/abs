export const dynamic = 'force-dynamic'
import Score from "@/app/tmp/lb/score";
async function getScoreInfo() {
  const url = `http://gateway.lightband.cn:3005/activity/api/activity/playInfo?code=autumn2024`
  const res =  await fetch(url, { cache: 'no-store' })
  console.log('loading score')
  if (!res.ok) {
    throw new Error('Failed to fetch scoreInfo:')
  }
  console.log('load score success')
  const data = await res.json()
  const scoreList = data.data.scoreRankList.map((it:any) => ({
    name: it.player.nickname,
    score: it.score,
  }))
  const hitCountList = data.data.hitCountRankList.map((it:any) => ({
    name: it.player.nickname,
    score: it.score,
  }))

  return [scoreList, hitCountList]
}
export default async function Home() {
  const [data, hitData] = await getScoreInfo()

  return (
    <div className={' w-full flex m-auto items-center justify-center'}>
      <div className={"text-3xl text-white"}>
        <Score scoreData={data} label={"Score"} title={"Summer Score Top 100"} type={'score'}/>
      </div>
    </div>
  )

}