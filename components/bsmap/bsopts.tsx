import {BSBeatMap} from "@/interfaces/beatmap";
import {useBSMapSongPreview} from "@/hooks/useSongPreview";
import {cn} from "@/lib/utils";
import {Tooltip} from "@/components/ui/tooltip";
import {IconButton} from "@/components/ui/button";
import {AiOutlineLoading} from "react-icons/ai";
import {PiHeartbeat} from "react-icons/pi";
import {CiMusicNote1, CiPlay1} from "react-icons/ci";
import {MapPreviewIFrame} from "@/components/shared/MapPreviewIFrame";
import CopyIcon from "@/components/shared/CopyIcon";
import {FaTwitch} from "react-icons/fa";
import Link from "@/components/ui/link";
import {IoCloudDownloadOutline} from "react-icons/io5";
import {HiCursorClick} from "react-icons/hi";
import React from "react";

const BSOpts = (
  {
    bsMap,
    className,
    itemClassName
  }:{
    bsMap: BSBeatMap,
    className?: string,
    itemClassName?: string
  }
)=> {
  const {play, current, loading} = useBSMapSongPreview(bsMap)
  const handleBookmark = () => {

  }
  const handleAddToPlaylist = () => {

  }
  return (
    <div className={
      cn("grid grid-cols-4 gap-1 sm:flex items-center mx-auto justify-center pb-0.5", className)
    }>
      {/*<Tooltip content="add to playlist" asChild>*/}
      {/*  <IconButton onClick={handleAddToPlaylist}*/}
      {/*              className="w-6 h-6 bg-transparent text-white hover:text-red-400 rounded-full cursor-pointer"*/}
      {/*              variant="ghost">*/}
      {/*    <IoAddOutline/>*/}
      {/*  </IconButton>*/}
      {/*</Tooltip>*/}
      {/*<Tooltip content="bookmark song" asChild>*/}
      {/*  <IconButton onClick={handleBookmark}*/}
      {/*              className="w-6 h-6 bg-transparent text-white hover:text-red-400 rounded-full cursor-pointer"*/}
      {/*              variant="ghost">*/}
      {/*    <CiBookmark/>*/}
      {/*  </IconButton>*/}
      {/*</Tooltip>*/}
      <Tooltip content="play song preview" asChild>
        <IconButton onClick={play}
            className={
            cn(
            `w-6 h-6 bg-transparent hover:text-red-400`,
            ` rounded-full cursor-pointer hover:dark:bg-zinc-300/70 dark:text-zinc-50`,
            `${current && loading ? 'animate-spin' : ''}`,
            ` ${current && !loading ? '' : ' '}`,
            itemClassName,
            )
          }
            variant="ghost">
          {current ? loading ? <AiOutlineLoading/> : <PiHeartbeat/> : <CiMusicNote1/>}
        </IconButton>
      </Tooltip>
      <MapPreviewIFrame id={bsMap.id}>
        <IconButton
          className={
            cn(
              "w-6 h-6 bg-transparent hover:text-red-400 rounded-full cursor-pointer hover:dark:bg-zinc-300/70 dark:text-zinc-50",
              itemClassName
            )
          }
          variant="ghost">
          <CiPlay1/>
        </IconButton>
      </MapPreviewIFrame>

      <Tooltip content="copy twitch request" asChild>
        <div>
          <CopyIcon
            className={
              cn("w-6 h-6 bg-transparent hover:text-red-400 rounded-full cursor-pointer hover:dark:bg-zinc-300/70 dark:text-zinc-50", itemClassName)
            }
            content={`!bsr ${bsMap.id}`}>
            <FaTwitch/>
          </CopyIcon>
        </div>
      </Tooltip>
      <Tooltip content="download zip" asChild>
        <div>
          <IconButton
            className={
              cn("w-6 h-6 bg-transparent  hover:text-red-400 rounded-full hover:dark:bg-zinc-300/70 dark:text-zinc-50", itemClassName)
            }
            variant="ghost">
            <Link href={bsMap.versions[0].downloadURL} className="text-inherit">
              <IoCloudDownloadOutline/>
            </Link>
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip content="one click download" asChild>
        <div>
          <IconButton
            className={
              cn("w-6 h-6 bg-transparent hover:text-red-400 rounded-full cursor-pointer hover:dark:bg-zinc-300/70 dark:text-zinc-50", itemClassName)
            }
            variant="ghost">
            <Link href={`beatsaver://${bsMap.id}`} className="text-inherit">
              <HiCursorClick/>
            </Link>
          </IconButton>
        </div>
      </Tooltip>
    </div>

  )
}


export default React.memo(BSOpts)