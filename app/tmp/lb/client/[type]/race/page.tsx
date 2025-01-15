import ChartClient from "./chart.client";
import {getLBScoreInfo} from "@/hooks/api/api";

export const dynamic = 'force-dynamic'


export default async function Home({ params }: { params: { type: string } }) {
  const type = params.type as 'score' | 'hitcnt'
  const result = await getLBScoreInfo(type,6)
  return (
    <div>
      <div className={"relative z-10 overflow-hidden rounded-lg"} id={'render-result'}>
        <ChartClient initial={result} type={type}/>
      </div>
    </div>
  )
}