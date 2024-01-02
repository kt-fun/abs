'use client'
import Image from 'next/image'
import { ClockIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, IconButton, Inset, Link, Text, Tooltip } from '@radix-ui/themes'
import { BSBeatMap, getBSMapCoverURL, getMaxNPS } from '@/interfaces/beatmap'
import MapperAvatar from '@/components/mapper-avatar'
import NPSLabel from '@/components/labels/NPSLabel'
import DurationLabel from '@/components/labels/DurationLabel'
import ThumbUpLabel from '@/components/labels/ThumbUpLabel'
import ThumbDownLabel from '@/components/labels/ThumbDownLabel'
import RatingLabel from '@/components/labels/RatingLabel'
import DateLabel from '@/components/labels/DateLabel'
import BSUserLabel from '@/components/labels/BSUserLabel'
import FeatureIcons from '@/icons/FeatureIcons'
import { getMapTag } from '@/interfaces/mapTags'
import BSMapTag from './BSMapTag'
import * as Progress from '@radix-ui/react-progress';
interface BSMapProps {
    bsMap:BSBeatMap
}
export default function BSMap(
    {bsMap}: {bsMap:BSBeatMap}
) {
  const bg = getBSMapCoverURL(bsMap)
  const className ="bg-[url('" + bg + "')]"
  return (
    <>
    <Flex gap="3" direction="column" >
      
      <Box 
      className=' rounded-md overflow-hidden'
      >
          <Flex  gap="3" align="start">
            <Image
            src={bg}
            alt="Map cover"
            width="176"
            height="176"
            className='rounded-md w-[176px]'
            />
            <Box>
              
            <Link href={`/map/${bsMap.id}`}>
              <Text
                size="4"
                className="overflow-ellipsis line-clamp-1"
                >{bsMap.name}</Text>
            </Link>
            <div className='flex space-x-2 items-center'>
            <BSUserLabel user={bsMap.uploader}/>
            <DateLabel date={bsMap.lastPublishedAt}/>
            </div>

            <div>
              <ThumbUpLabel likeCnt={bsMap.stats.upvotes}/>
              <ThumbDownLabel dislikeCnt={bsMap.stats.upvotes}/>
              <NPSLabel nps={getMaxNPS(bsMap)}/>
              <DurationLabel duration={bsMap.metadata.duration}/>
            </div>
            <div>
            <div className="flex items-center ">
                    <Progress.Root className="relative overflow-hidden rounded-full w-32 h-2 mx-2 bg-gray-100" value={bsMap.stats.score*100}>
                    <Progress.Indicator
                        className=" h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500"
                        style={{ transform: `translateX(-${100 - bsMap.stats.score*100}%)` }}
                    />
                    </Progress.Root>
                    <Text className="pl-4" size="2" weight="medium">{(bsMap.stats.score*100).toFixed(1)}%</Text>
                </div>
              {/* <RatingLabel rate={bsMap.stats.score}/> */}
            </div>
            <div>
              <FeatureIcons bsMap={bsMap}/>
            </div>
            <div className='flex flex-row gap-1'>
              {
                // if tags is longer than 3, show 3 tags and a more button
                bsMap.tags?.slice(0,3).map((tag)=>getMapTag(tag)!!).map((tag)=>(
                  <BSMapTag key={tag.slug} tag={tag}/>
                ))
              }
            </div>
            <div>
              <IconButton radius='full' variant='ghost'>
                <MagnifyingGlassIcon  radius='full' width="18" height="18" />
              </IconButton>
            </div>
            
            </Box>
        </Flex>
      </Box>
      
    </Flex>
    </>
  )
}
