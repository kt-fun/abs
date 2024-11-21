'use client'
import Chart from "@/app/tmp/lb/race";
import {useLBRankQuery} from "@/hooks/api/useLBRank";
import React, {useState} from "react";
import Image from "@/app/tmp/lb/image.client";
import {Slider} from "@/components/ui/slider";

export default function ChartClient(
  {
    initial,
    type
  }:{
    initial:Record<any, any>,
    type: 'hitcnt' | 'score',
  }
) {
  const { data} = useLBRankQuery('score', 6, initial)
  const [size, setSize] = useState<number>(20)
  const [height, setHeight] = useState<number>(960)
  const [width, setWidth] = useState<number>(1800)
  return(
    <div>
      <div className={'m-4 flex flex-col gap-2 canvas-no-export'}>
        <Slider defaultValue={[size]} max={100} min={10} step={5} onValueChange={(v)=> setSize(v[0])} />
        <Slider defaultValue={[height]} max={3000} min={800} step={200} onValueChange={(v)=> setHeight(v[0])} />
      </div>
      <div className={"relative z-10 overflow-hidden rounded-lg"}>
        <React.Fragment>
          <div
            style={{
              height: height,
              width: width,
            }}
            className={"bg-blend-darken bg-black/[.6] z-10 rounded-lg flex justify-center mx-auto "}>

            <MemorizedChart allData={data} type={type} size={size} height={height} width={width}/>
          </div>
          <Image height={height} width={width}/>
        </React.Fragment>
      </div>
    </div>
  )
}


const MemorizedChart = React.memo(Chart);