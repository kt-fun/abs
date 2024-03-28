import {motion} from 'framer-motion'
import {BSMapReview} from "@/interfaces/beatmap-review";
import {Avatar} from "@/components/ui/avatar";
import {cn} from "@/lib/utils";
import {formatTime} from "@/lib/format";
import React from "react";
import {BSUserWithStats} from "@/interfaces/beatsaver-user";
interface ReviewProps {
  review : BSMapReview,
  user: BSUserWithStats,
}
export const ReviewItem = React.forwardRef<HTMLLIElement, ReviewProps>((
  {
    review,
    user
  }:ReviewProps,
  ref
) => {
  return (
    <motion.li
      ref={ref}
      className={cn("flex space-x-2")}
    >
      <Avatar src={user?.avatar} className={'h-8 aspect-square self-end'}/>
      <div className={cn("")}>

        <div className={"flex px-2 flex-row text-center text-xs items-center"}>
          <span className={'order-0 opacity-70 text-xs'}>{formatTime(review.createdAt)}</span>
          <div className={'text-xs opacity-30'}> at </div>
          <div className={'flex space-x-1 items-center px-1'}>
            <Avatar src={review.map?.versions?.[0]?.coverURL} className={'h-3 w-3'}/>
            <span className={'opacity-60 text-ellipsis line-clamp-1 break-all'}>{review.map?.name}</span>
          </div>

          <div className={'text-xs opacity-30'}>from</div>
          <div className={'flex space-x-1 items-center px-1'}>
            <Avatar src={review.map?.uploader?.avatar} className={'h-3 w-3'}/>
            <span className={'opacity-60 text-ellipsis line-clamp-1 break-all'}>{review.map?.uploader?.name}</span>
          </div>
        </div>
        <div className={'opacity-30 text-xs p-0'}>
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