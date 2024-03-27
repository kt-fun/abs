import {motion} from 'framer-motion'
import {BSMapReview} from "@/interfaces/beatmap-review";
import {Avatar} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {formatTime} from "@/lib/format";
import {listItemVariants} from "@/components/variants";
import React from "react";
interface ReviewProps {
  review : BSMapReview
}
export const ReviewItem = React.forwardRef<HTMLLIElement, ReviewProps>((
{
  review
}:ReviewProps,
ref
) => {
  return (
    <motion.li
      ref={ref}
      className={cn("flex space-x-2")}
    >
      <Avatar src={review.creator?.avatar} className={'h-8 aspect-square self-end'}/>
      <div className={cn("")}>
        <div className={"flex space-x-4 px-2 py-0.5"}>
          <span>{review.creator?.name}</span>
          <span className={'opacity-30'}>{formatTime(review.createdAt)}</span>
        </div>
        <p className={"text-xs rounded-md bg-zinc-500/20 p-2"}>
          {review.text}
        </p>
      </div>
    </motion.li>
  )
})
ReviewItem.displayName = "ReviewItem"
export default motion(ReviewItem)