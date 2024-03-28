import * as Dialog from "@/components/ui/dialog"
import React, {useMemo} from "react"
import { Tooltip } from "@/components/ui/tooltip"



const PreviewIFrame = React.forwardRef(({
    url,
  children
}:{
    url:string,
    children:React.ReactNode
},ref) => {
    return (
      <Dialog.Dialog>
        <Tooltip content="play preview" asChild>
          <Dialog.DialogTrigger asChild ref={ref as any}>
            {children}
          </Dialog.DialogTrigger>
        </Tooltip>
        <Dialog.DialogContent className="aspect-video max-w-[1080px] border-0  rounded-lg bg-transparent p-2 sm:p-4">
          <iframe title="ArcViewer" src={url} className="w-full h-full  rounded-lg" allowFullScreen/>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    )
})
PreviewIFrame.displayName="PreviewIFrame"

export const BLReplayPreviewIFrame = React.forwardRef(({
  id,
  children
}:{
  id:string,
  children:React.ReactNode
},ref) => {
  const url = useMemo(()=>{
    return `https://replay.beatleader.xyz/?scoreId=${id}`
  },[id])
  return (
    <PreviewIFrame url={url} ref={ref}>
      {children}
    </PreviewIFrame>
  )
})
BLReplayPreviewIFrame.displayName = "BLReplayPreviewIFrame"


export const MapPreviewIFrame = React.forwardRef(({
  id,
  children
}:{
  id:string,
  children:React.ReactNode
},ref) => {

  const url = useMemo(()=>{
    return `https://allpoland.github.io/ArcViewer/?id=${id}`
  },[id])
  return (
    <PreviewIFrame url={url} ref={ref}>
      {children}
    </PreviewIFrame>
  )
})
MapPreviewIFrame.displayName = "MapPreviewIFrame"
