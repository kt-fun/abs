import {BSBeatMap} from "@/interfaces/beatmap";
import {useBSMapSongPreview} from "@/hooks/useSongPreview";
import BSUserLabel from "@/components/labels/BSUserLabel";
import * as MapMetaLabel from "@/components/labels/BSMapMetaLabels";
import FeatureIcons, {checkIfHasFeature} from "@/components/icons/FeatureIcons";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {DiffCard} from "@/components/bsmap/diffcard";
import React from "react";
import {HTMLMotionProps, motion} from "framer-motion";
import {cn} from "@/lib/utils";

const BSMapOverviewHiddenInfo = React.forwardRef((
{
  bsMap,
  isDetailMode,
  className
}:{
  bsMap:BSBeatMap,
  isDetailMode: boolean
} & HTMLMotionProps<'div'>,
ref
) => {
  const {current} = useBSMapSongPreview(bsMap)
  const handleCopyMapId = () => {
    navigator.clipboard.writeText(bsMap.id);
  }
  return (
    <div
      ref={ref as any}
      className={
      cn(
        `bg-black/[.6] h-full ${!isDetailMode && `group-hover:visible`} ${current && !isDetailMode ? '' : 'invisible'}  bg-blend-darken  rounded-lg z-10`,
        className
      )
    }
    >
      <div
        className="flex flex-col justify-between pt-auto px-1 bg-transparent h-full  rounded-lg"
      >
        {
          bsMap.curator &&
            <div className="flex space-x-1 items-center mx-1 text-white">
                <span className="text-xs font-medium hidden sm:inline">Curator:</span>
                <BSUserLabel user={bsMap.curator} className="font-light text-white" linkClassName="text-white"/>
            </div>
        }
        <div onClick={handleCopyMapId} className='text-white flex'>
          <MapMetaLabel.BSIDLabel id={bsMap.id} className="cursor-pointer" tooltip="copy map id"/>
          {
            checkIfHasFeature(bsMap) &&
              <div className="flex space-x-1 items-center mx-1 text-white">
                  <FeatureIcons bsMap={bsMap} className="*:h-4 *:w-4 *:items-center *:flex "/>
              </div>
          }
        </div>
        <p
          className="text-ellipsis overflow-hidden  line-clamp-1 sm:line-clamp-4 text-xs dark text-gray-200 mx-1"
        >
          {bsMap.description == "" ? "No description" : bsMap.description}
        </p>
        <ScrollArea>
          <div className='grid  grid-rows-1 sm:grid-rows-2 grid-flow-col'>
            {
              bsMap.versions[0]
                .diffs
                .map((diff) =>
                  <DiffCard
                    diff={diff}
                    key={diff.characteristic + diff.difficulty + bsMap.id}
                  />
                )
            }
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
      </div>
    </div>
  )
})
BSMapOverviewHiddenInfo.displayName = 'BSMapOverviewHiddenInfo'
export default motion(React.memo(BSMapOverviewHiddenInfo), { forwardMotionProps: true })