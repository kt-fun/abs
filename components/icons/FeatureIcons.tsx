import { BSBeatMap, checkIfAI, checkIfChroma, checkIfCinema, checkIfME, checkIfNE } from "@/interfaces/beatmap";
import {Tooltip} from "@/components/ui/tooltip";
import { CiLight } from "react-icons/ci";
import { BiCameraMovie } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";
import { GiRank3 } from "react-icons/gi";
import {cn} from "@/lib/utils";
import MEIcon from "@/components/icons/MEIcon";
import NEIcon from "@/components/icons/NEIcon";
import ChromaIcon from "@/components/icons/ChromaIcon";


export function checkIfHasFeature(bsMap:BSBeatMap):boolean {
  return bsMap.ranked || checkIfAI(bsMap) || checkIfCinema(bsMap) || checkIfChroma(bsMap) || checkIfME(bsMap) || checkIfNE(bsMap)
}

export default function FeatureIcons(
    {bsMap,className}:{bsMap:BSBeatMap,className?:string}
) {
    return (
            <div className={cn("flex gap-1",className)}>
                {
                    bsMap.ranked && (
                        <Tooltip content="Ranked Map" asChild>
                            <span className="flex justify-center items-center"><GiRank3/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfAI(bsMap) && (
                        <Tooltip content="Auto Mapper, notice, not all AI map has such tag" asChild>
                            <span className="flex justify-center items-center"><RiRobot2Line/></span>
                        </Tooltip>
                        )
                }
                {
                    checkIfCinema(bsMap) && (
                        <Tooltip content="Cinema Map" asChild>
                            <span className="flex justify-center items-center"><BiCameraMovie/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfChroma(bsMap) && (
                        <Tooltip content="Chroma Map" asChild>
                            <span className="flex justify-center items-center"><ChromaIcon/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfME(bsMap) && (
                        <Tooltip content="Mapping Extensions Map" asChild>
                        <span className="flex justify-center items-center"><MEIcon/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfNE(bsMap) && (
                        <Tooltip content="Noodle Extensions Map" asChild>
                        <span className="flex justify-center items-center"><NEIcon/></span>
                        </Tooltip>
                    )
                }
              </div>

    )
}