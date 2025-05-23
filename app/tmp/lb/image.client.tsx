"use client"
// import {useOpsPanel} from "@/app/tmp/lb/optsPanel";

export default function Image({
  width, height
}:{
  width: number;
  height: number;
}) {
  // const {background, size} = useOpsPanel()
  const background = "https://moe.anosu.top/img?type=mp"
  return <img src={background}
              style={{
                height: height,
                width: width,
              }}
              className={'inset-0 absolute -z-10 object-cover'}
              loading={'eager'}/>
}