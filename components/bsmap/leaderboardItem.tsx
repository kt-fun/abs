import {motion} from 'framer-motion'
import {BSMapReview} from "@/interfaces/beatmap-review";
import {Avatar} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import React from "react";
import {BeatLeaderScore} from "@/interfaces/beatmap-rank";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const MotionTableRow= motion(TableRow)

interface LeaderBoardItemProps {
  score : BeatLeaderScore
}
const LeaderBoardItem = React.forwardRef<HTMLLIElement, LeaderBoardItemProps>((
{
  score
}:LeaderBoardItemProps,
ref
) => {
  return (
      <MotionTableRow
        ref={ref} key={score.id}>
        <TableCell>
          <span>{score.rank}</span>
        </TableCell>
        <TableCell>
          <div className={"flex space-x-1 items-center"}>
            <Avatar src={score.player.avatar} className={"h-4 w-4"}/>
            <div>{score.player.name}</div>
          </div>
        </TableCell>
        <TableCell>{score.modifiedScore}</TableCell>
        <TableCell className="hidden sm:table-cell">{score.modifiers}</TableCell>
        <TableCell>{(score.accuracy * 100).toFixed(2)} %</TableCell>
        <TableCell  className="hidden sm:table-cell">{score.pp}</TableCell>
      </MotionTableRow>
  )
})
LeaderBoardItem.displayName = "LeaderBoardItem"
export default motion(LeaderBoardItem)