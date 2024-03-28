import {BSMapDiff} from "@/interfaces/beatmap";
import React, {useState} from "react";
import {HoverCard as HoverCardRoot, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {CharacteristicIcon} from "@/components/icons/Characteristic";
import * as MapDiffLabel from "@/components/shared/labels/BSMapDiffLabels";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";

const diffShort = {
  "Easy":"Easy",
  "Normal":"Normal",
  "Hard":"Hard",
  "Expert":"Expert",
  "ExpertPlus":"Expert+",
}

const diffShortest = {
  "Easy":"E",
  "Normal":"N",
  "Hard":"H",
  "Expert":"EX",
  "ExpertPlus":"EX+",
}

type MapCharacteristic = "Standard" | "NoArrows" | "OneSaber" | "90Degree" | "360Degree" | "Lightshow" | "Lawless" | "Legacy"
type MapDiff = "Easy" | "Normal" | "Hard" | "Expert" | "ExpertPlus"


interface DiffCardProps {
  diff:BSMapDiff,
  className?: string
}

export const DiffCard = React.forwardRef<HTMLSpanElement, DiffCardProps>((
{
  diff,
  className
}:DiffCardProps,
ref,
...props

) => {
  const [diffHoverCardOpen, setDiffHoverCardOpen] = useState(false)
  const handleDiffHoverCardClick = () => setDiffHoverCardOpen((prevOpen) => !prevOpen)
  return(
    // popover can't work properly with tooltip, see https://github.com/radix-ui/primitives/issues/2248
    // and hover card can't work properly trigger by touch event due to radix-ui team's design decision
    // see https://github.com/radix-ui/primitives/issues/955#issuecomment-960610209
    // later we need provide a custom component work as hover in desktop and popover in mobile
    //   <Popover key={diff.characteristic + diff.difficulty + bsMap.id}>
    //     <PopoverTrigger key={diff.difficulty + diff.characteristic + bsMap.id} className="w-fit">
    //       <span
    //         key={diff.difficulty + diff.characteristic + bsMap.id}
    //         className='relative w-fit text-white hover:text-red-500 font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 border-solid border flex items-center flex-shrink'
    //       >
    //         <CharacteristicIcon characteristic={diff.characteristic} className="w-4 h-4"/>
    //         <span className='ml-[2px] text-xs'>{diffShortest[diff.difficulty as MapDiff]}</span>
    //       </span>
    //     </PopoverTrigger>
    //     <PopoverContent align="center" className="shadow-md p-2 border">
    //       <div className='cursor-default'>{diff.characteristic}</div>
    //       <div className='grid grid-cols-3 gap-1'>
    //         <MapDiffLabel.BSNPSLabel nps={diff.nps}/>
    //         <MapDiffLabel.BSNJSLabel njs={diff.njs}/>
    //         <MapDiffLabel.BSLightCountLabel count={diff.events}/>
    //         <MapDiffLabel.BSNoteCountLabel count={diff.notes}/>
    //         <MapDiffLabel.BSObstacleCountLabel count={diff.obstacles}/>
    //         <MapDiffLabel.BSBombCountLabel count={diff.bombs}/>
    //       </div>
    //     </PopoverContent>
    //   </Popover>
    <HoverCardRoot open={diffHoverCardOpen} onOpenChange={setDiffHoverCardOpen}>
      <HoverCardTrigger className="w-fit" onClick={handleDiffHoverCardClick}>
          <span ref={ref} className={
            cn(
              'relative w-fit text-white hover:text-red-500 font-semibold m-0.5 px-1 rounded-full cursor-pointer border-white hover:border-red-500 border-solid border flex items-center',
              className
            )
          } {...props}>
            <CharacteristicIcon characteristic={diff.characteristic} className="w-4 h-4"/>
            <span className='ml-[2px] text-xs'>{diffShortest[diff.difficulty as MapDiff]}</span>
          </span>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="shadow-md p-2 border">
        <div className='cursor-default'>{diff.characteristic}</div>
        <div className='grid grid-cols-3 gap-1'>
          <MapDiffLabel.BSNPSLabel nps={diff.nps}/>
          <MapDiffLabel.BSNJSLabel njs={diff.njs}/>
          <MapDiffLabel.BSLightCountLabel count={diff.events}/>
          <MapDiffLabel.BSNoteCountLabel count={diff.notes}/>
          <MapDiffLabel.BSObstacleCountLabel count={diff.obstacles}/>
          <MapDiffLabel.BSBombCountLabel count={diff.bombs}/>
        </div>
      </HoverCardContent>
    </HoverCardRoot>
  )
})

DiffCard.displayName = "DiffCard"

export default motion(React.memo(DiffCard))