import { BSBeatMap, checkIfAI, checkIfChroma, checkIfCinema, checkIfME, checkIfNE } from "@/interfaces/beatmap";
import { Box, Flex } from "@radix-ui/themes";
import { Tooltip } from "@radix-ui/themes";
import { CiLight } from "react-icons/ci";
import { BiCameraMovie } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";
import { GiRank3 } from "react-icons/gi";
export default function FeatureIcons(
    {bsMap,className}:{bsMap:BSBeatMap,className?:string}
) {
    return (
        <Box className={className}>
            <Flex gap="3">
                {
                    bsMap.ranked && (
                        <Tooltip content="Ranked Map">
                            <span className="p-0.5"><GiRank3/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfAI(bsMap) && (
                        <Tooltip content="Auto Mapper, notice, not all AI map has such tag">
                            <span className="p-0.5"><RiRobot2Line/></span>
                        </Tooltip>
                        )
                }
                {
                    checkIfCinema(bsMap) && (
                        <Tooltip content="Cinema Map">
                            <span className="p-0.5"><BiCameraMovie/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfChroma(bsMap) && (
                        <Tooltip content="Chroma Map">
                            <span className="p-0.5"><CiLight/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfME(bsMap) && (
                        <Tooltip content="Mapping Extensions Map">
                        <span className="p-0.5"><CiLight/></span>
                        </Tooltip>
                    )
                }
                {
                    checkIfNE(bsMap) && (
                        <Tooltip content="Noodle Extensions Map">
                        <span className="p-0.5"><CiLight/></span>
                        </Tooltip>
                    )
                }
            </Flex>
        </Box>
    )
}