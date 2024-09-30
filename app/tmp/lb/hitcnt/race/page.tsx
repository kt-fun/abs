import Chart from "@/app/tmp/lb/race";

export const dynamic = 'force-dynamic'

const season = 'Autumn'
async function getScoreInfo(type: 'hitcnt'|'score') {
  const url = `https://cf-lb-rank.kt-f63.workers.dev/am-history/${type}`
  const res =  await fetch(url, { cache: 'no-store' })
  console.log('loading score')
  if (!res.ok) {
    throw new Error('Failed to fetch scoreInfo:')
  }
  console.log('load score success')
  const data = await res.json()

  const d = data.mappedData
  let result: Record<any, any> = {}

  for (const item of d) {
    // let r:Record<any, any> = {}
    // Object.keys(item.groupedScore).forEach(key => {
    //   const newKey = key.slice(0,8)
    //   r[newKey] = item.groupedScore[key]
    // })
    result[item.time] = item.groupedScore
  }

  return result
}
export default async function Home() {
  const type = 'hitcnt'
  const result = await getScoreInfo(type)
  return (
    <div>
      <div className={"relative z-10 overflow-hidden rounded-lg"} id={'render-result'}>
        <div className={"bg-blend-darken bg-black/[.6] z-10 rounded-lg w-[1800px] h-[3000px] flex justify-center mx-auto"}>
          <Chart allData={result} type={type}/>
        </div>
        <img src={"https://www.loliapi.com/acg/pe/"}
             className={'inset-0 w-[1800px] h-[3000px] absolute -z-10 object-cover'}
             loading={'eager'}/>
      </div>
    </div>
  )

}