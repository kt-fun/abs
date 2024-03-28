import {AnimatePresence, motion} from "framer-motion";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import {Loading,EmptyContent} from "@/components/shared/load-status";
import React, {useEffect} from "react";
import LeaderBoardItem from "@/components/bsmap/leaderboardItem";
import {usePagingBLScores} from "@/hooks/api/usePagingBLScores";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {BSMapDiff} from "@/interfaces/beatmap";
import {useTranslation} from "@/hooks/useTranslation";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const LeaderBoardList = (
{
  // diffs,
  hash,
  difficulty,
  mode,
  onContentUpdate
}:{
  // diffs:BSMapDiff[],
  hash: string,
  difficulty: string,
  mode: string,
  onContentUpdate?: ()=>void,
}) => {
  const { scores,isLoadingMore,isEmpty } = usePagingBLScores(hash,mode,difficulty)
  const {t} = useTranslation('components.bsmap')
  useEffect(()=>{
    onContentUpdate?.()
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
            <TableHead>{t('table-column.rank')}</TableHead>
            <TableHead>{t('table-column.player')}</TableHead>
            <TableHead>{t('table-column.score')}</TableHead>
            <TableHead className="hidden  sm:table-cell">{t('table-column.mod')}</TableHead>
            <TableHead>{t('table-column.accuracy')}</TableHead>
            <TableHead className="hidden sm:table-cell">{t('table-column.pp')}</TableHead>
            <TableHead className="">{t('table-column.replay')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={"text-xs"}>
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
      {/*<Pagination>*/}
      {/*  <PaginationContent>*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationPrevious href="#"  text={"Previous"}/>*/}
      {/*    </PaginationItem>*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationLink href="#">1</PaginationLink>*/}
      {/*    </PaginationItem>*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationEllipsis />*/}
      {/*    </PaginationItem>*/}
      {/*    <PaginationItem>*/}
      {/*      <PaginationNext href="#" text={"Next"}/>*/}
      {/*    </PaginationItem>*/}
      {/*  </PaginationContent>*/}
      {/*</Pagination>*/}
    </motion.ul>
  )
}

export default React.memo(LeaderBoardList)