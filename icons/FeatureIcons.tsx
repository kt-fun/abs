import { BSBeatMap, checkIfAI, checkIfChroma, checkIfCinema, checkIfME, checkIfNE } from "@/interfaces/beatmap";
import { Box, Flex } from "@radix-ui/themes";
import { Tooltip } from "@radix-ui/themes";
import { CiLight } from "react-icons/ci";
import { BiCameraMovie } from "react-icons/bi";
import { RiRobot2Line } from "react-icons/ri";
import { GiRank3 } from "react-icons/gi";
export default function FeatureIcons(
    {bsMap}:{bsMap:BSBeatMap}
) {
    return (
        <Box className="">
            <Flex gap="3">
                {
                    bsMap.ranked && (
                        <Tooltip content="Ranked Map">
                            <GiRank3/>
                        </Tooltip>
                    )
                }
                {
                    checkIfAI(bsMap) && (
                        <Tooltip content="Auto Mapper, notice, not all AI map has such tag">
                            <RiRobot2Line/>
                        </Tooltip>
                        )
                }
                {
                    checkIfCinema(bsMap) && (
                        <Tooltip content="Cinema Map">
                            <BiCameraMovie/>
                        </Tooltip>
                    )
                }
                {
                    checkIfChroma(bsMap) && (
                        <Tooltip content="Chroma Map">
                            <CiLight/>
                        </Tooltip>
                    )
                }
                {
                    checkIfME(bsMap) && (
                        <Tooltip content="Mapping Extensions Map">
                            <CiLight/>
                        </Tooltip>
                    )
                }
                {
                    checkIfNE(bsMap) && (
                        <Tooltip content="Noodle Extensions Map">
                            <CiLight/>
                        </Tooltip>
                    )
                }
            </Flex>
        </Box>
    )
}