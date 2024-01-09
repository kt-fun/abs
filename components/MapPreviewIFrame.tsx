
import { Dialog } from "@radix-ui/themes"
import { use, useMemo } from "react"

export default function MapPreviewIFrame({
    id,children
}:{id:string, children?:React.ReactNode}) {
    const url = useMemo(()=>{
        return `https://allpoland.github.io/ArcViewer/?id=${id}`
    },[id])
    return (
        <>
        <Dialog.Root>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content className="h-[640px] max-w-[1080px] p-0">
            <iframe title="ArcViewer" src={url} className="w-full h-full" />
            </Dialog.Content>
        </Dialog.Root>

        </>
    )
}