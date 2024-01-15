import * as Dialog from "@/components/ui/dialog"
import React, {useMemo} from "react"
import { Tooltip } from "@/components/ui/tooltip"

 const MapPreviewIFrame = React.forwardRef(({
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
      <Dialog.Dialog>
        <Tooltip content="play map preview" asChild>
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

MapPreviewIFrame.displayName = "MapPreviewIFrame"

export default MapPreviewIFrame