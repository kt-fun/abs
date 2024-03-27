import {usePagingBSMapReview} from "@/hooks/api/usePagingBSMapReview";
import {AnimatePresence, motion} from "framer-motion";
import {containerVariants, listItemVariants} from "@/components/variants";
import Loading from "@/components/load-status/Loading";
import React, {useEffect} from "react";
import {usePagingBSMapScoreRank} from "@/hooks/api/usePagingMapScoreRank";
import LeaderBoardItem from "@/components/bsmap/leaderboardItem";
import {usePagingBLScores} from "@/hooks/api/usePagingBLScores";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import EmptyContent from "@/components/load-status/EmptyContent";

const LeaderBoardList = (
{
  hash,
  difficulty,
  mode,
  onContentUpdate
}:{
  hash: string,
  difficulty: string,
  mode: string,
  onContentUpdate?: ()=>void,
}) => {
  const { scores,isLoadingMore,isEmpty } = usePagingBLScores(hash,mode,difficulty)
  useEffect(()=>{
    onContentUpdate?.()
    // console.log('update content')
  },[isLoadingMore, onContentUpdate])
  return (
    <motion.ul
      variants={containerVariants}
      layout
      initial={'hidden'}
      animate={'show'}
      exit={'hidden'}
    >
      <Table className="overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="hidden  sm:table-cell">Mods</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead className="hidden sm:table-cell">PP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isLoadingMore && <Loading/>
          }
          {
            !isLoadingMore && isEmpty && <EmptyContent/>
          }
          {
            scores.map((item,i)=> (
              <AnimatePresence
                presenceAffectsLayout
                key={item.id}>
                <LeaderBoardItem
                  layout
                  score={item}
                  custom={i}
                  variants={listItemVariants}
                />
              </AnimatePresence>
            ))
          }
        </TableBody>
      </Table>
    </motion.ul>
  )
}

export default React.memo(LeaderBoardList)