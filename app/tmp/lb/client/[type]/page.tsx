import {getScoreInfo, season} from "@/app/tmp/lb/utils";

export const dynamic = 'force-dynamic'
import Score from "@/app/tmp/lb/score";
import Image from "@/app/tmp/lb/client/image.client";

export default async function Home({ params }: { params: { type: string } }) {
  const [data, hitData] =  await getScoreInfo()
  const type = params.type as 'hitcnt' | 'score'
  const d = type == 'hitcnt' ? hitData : data
  const label = type == 'hitcnt' ? 'Hit Count' : 'Score'
  const title = type == 'hitcnt' ? `${season} Hit Count Top 100` : `${season} Score Top 100`

  // const [size, setSize] = useState<number>(100)
  // const [height, setHeight] = useState<number>(2048)
  // const [width, setWidth] = useState<number>(1380)
  const size = 100
  const height = 2048
  const width = 1380
  return (
  <div className={' w-full flex flex-col m-auto items-center justify-center'}>
      {/*<div className={'m-4 flex flex-col gap-2'}>*/}
      {/*  <Slider defaultValue={[size]} max={100} min={10} step={5} onValueChange={(v) => setSize(v[0])}/>*/}
      {/*  <Slider defaultValue={[height]} max={3000} min={800} step={200} onValueChange={(v) => setHeight(v[0])}/>*/}
      {/*</div>*/}
      <div className={"relative z-10 overflow-hidden rounded-lg"} id={'render-result'}>
        <div
          style={{
            height: height,
            width: width,
          }}
          className={"bg-blend-darken bg-black/[.6] z-10 rounded-lg flex justify-center mx-auto"}>
          <Score scoreData={d} label={label} title={title} size={size} type={type} width={width} height={height}/>
          <Image height={height} width={width}/>
        </div>
      </div>
  </div>
  )

}
