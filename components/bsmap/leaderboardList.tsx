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
import {cn} from "@/lib/utils";

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
  const { scores,isLoadingMore,isEmpty,loadMore,
    totalPage,
    currentPage,
    hasPreviousPage,
    previousPage,
    nextPage,
    hasNextPage } = usePagingBLScores(hash,mode,difficulty)
  const {t} = useTranslation('components.bsmap')
  useEffect(()=>{
    onContentUpdate?.()
  },[isLoadingMore, onContentUpdate])
  return (
    <motion.ul
      variants={containerVariants}
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
                  score={item}
                  custom={i}
                  variants={listItemVariants}
                />
              </AnimatePresence>
            ))
          }
        </TableBody>
      </Table>
      {
        totalPage !=undefined && totalPage > 1 && <Pagination>
          <PaginationContent>
            {
              <PaginationItem className={cn(!hasPreviousPage && 'opacity-50')}>
                    <PaginationPrevious href="#"  text={"Previous"} onClick={()=>{hasPreviousPage && previousPage()}}/>
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            {/*{*/}
            {/*   totalPage - currentPage > 2 && <PaginationItem>*/}
            {/*    <PaginationEllipsis />*/}
            {/*  </PaginationItem>*/}
            {/*}*/}
            {/*{*/}
            {/*  totalPage - currentPage > 3 && <PaginationItem>*/}
            {/*        <PaginationLink href="#" onClick={()=>{}} className={"opacity-70"}>{totalPage}</PaginationLink>*/}
            {/*    </PaginationItem>*/}
            {/*}*/}
            {
              <PaginationItem className={cn(!hasNextPage && 'opacity-50')}>
                  <PaginationNext href="#" text={"Next"} onClick={()=>{hasNextPage && nextPage()}}/>
              </PaginationItem>
            }
          </PaginationContent>
        </Pagination>
      }
    </motion.ul>
  )
}

export default React.memo(LeaderBoardList)