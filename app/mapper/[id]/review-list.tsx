import React from "react";
import {motion} from 'framer-motion';
import {Loading} from "@/components/shared/load-status";
import {containerVariants, listItemVariants} from "@/components/shared/variants";
import {usePagingBSUserReview} from "@/hooks/api/usePagingBSUserReview";
import {BSUserWithStats} from "@/interfaces/beatsaver-user";
import ReviewItem from "@/app/mapper/[id]/review-item";


const ReviewList = (
  {

    user,
  }:{
    user: BSUserWithStats,
  })=> {

  const { reviews,isLoadingMore,isEmpty,hasMore,loadMore} = usePagingBSUserReview(user.id.toString());
  return (
    <motion.ul
      variants={containerVariants}
      initial={'hidden'}
      animate={'show'}
      exit={'hidden'}
      className={'space-y-2'}
    >
      {
        reviews.map((review,i) =>
          <ReviewItem
            custom={i}
            variants={listItemVariants}
            user={user}
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