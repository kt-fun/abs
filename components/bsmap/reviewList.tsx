import React, {useEffect} from "react";
import {motion} from 'framer-motion';
import ReviewItem from "@/components/bsmap/reviewItem";
import {usePagingBSMapReview} from "@/hooks/api/usePagingBSMapReview";
import Loading from "@/components/load-status/Loading";
import {containerVariants, listItemVariants} from "@/components/variants";


const ReviewList = (
{
  mapId,
  onContentUpdate
}:{
  mapId: string,
  onContentUpdate?:()=>void
})=> {

  const {reviews,isLoadingMore } = usePagingBSMapReview(mapId)
  // useEffect(()=>{
  //   onContentUpdate?.()
  // },[isLoadingMore, onContentUpdate])
  return (
    <motion.ul
      variants={containerVariants}
      initial={'hidden'}
      animate={'show'}
      exit={'hidden'}
    >
      {
        reviews.map((review,i) =>
          <ReviewItem
            custom={i}
            variants={listItemVariants}
            review={review}
            key={review.id}
          />
        )
      }
      {
        isLoadingMore && <Loading/>
      }
    </motion.ul>
  )
}



export default React.memo(ReviewList)