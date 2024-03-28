import {AnimatePresence, motion, useAnimationControls, Variants} from "framer-motion"
import React, {useEffect, useMemo, useState} from 'react'
import {cn} from "@/lib/utils";
import SearchBar from "@/components/filter/base/SearchBar";
import {useTranslation} from "@/hooks/useTranslation";
import SortOrder from "@/components/filter/map-filter/order";
import DateFilter from "@/components/filter/map-filter/date-filter";
import {PlaylistQueryParam} from "@/hooks/api/usePagingBSPlaylist";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Award, BadgeCheck} from "lucide-react";
import NPSRangePicker from "@/components/filter/base/NPSRangePicker";

interface PlaylistFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  queryParam: PlaylistQueryParam,
  onUpdateQueryParam: (searchParam:PlaylistQueryParam) => void,
  isQuerying: boolean
}
const PlaylistFilter = React.forwardRef<HTMLDivElement, PlaylistFilterProps>(
  (
    {
      queryParam,
      onUpdateQueryParam,
      isQuerying,
      ...rest
    } : PlaylistFilterProps,
    ref,
  )=> {

    const {t} = useTranslation('components.filter')

    const npsRange = useMemo(()=>{
      return [queryParam.minNps,queryParam.maxNps] as [number|undefined, number|undefined]
    },[queryParam])
    const setNpsRange = (range:[number|undefined,number|undefined])=>{
      onUpdateQueryParam({
        ...queryParam,
        minNps:range[0],
        maxNps:range[1]
      })
    }

    return (
      <div
        ref={ref}
        {...rest}
        className={cn(
          rest.className,
          "md:flex items-center justify-between flex-wrap gap-1 grid grid-rows-2 grid-cols-5 align-middle justify-items-center text-xs",
        )}
      >
        <div>

          <ToggleGroup type="multiple">
            <ToggleGroupItem value="verified" aria-label={t('toggle.verified')} size={'sm'}>
              <BadgeCheck className="h-4 w-4"  />
            </ToggleGroupItem>
            <ToggleGroupItem value="curated" aria-label={t('toggle.curated')} size={'sm'}>
              <Award className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <DateFilter
          value={{
            from: queryParam.from? new Date(queryParam.from): undefined,
            to: queryParam.to? new Date(queryParam.to):undefined
          }}
          className={"row-start-1 col-span-3 justify-self-end"}
          onUpdateValue={
            (v)=>{
              onUpdateQueryParam({
                ...queryParam,
                from: v?.from?.toISOString(),
                to:v?.to?.toISOString()
              })
            }
          }
        />
        <SortOrder
          order={queryParam.sortKey}
          className={"row-start-2 justify-self-start"}
          onUpdateOrder={(order)=>{
            onUpdateQueryParam({...queryParam,sortKey:order})
          }}
        />
        <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
        <SearchBar
          className={'h-6  row-start-2 col-start-4 col-span-2 justify-self-end'}
          queryKey={queryParam.queryKey}
          onQueryKeyChange={(k) => {
            onUpdateQueryParam({
              ...queryParam,
              queryKey: k
            })
          }}
          onQuery={() => {

          }}
        />
      </div>
    )
  })

PlaylistFilter.displayName = 'PlaylistFilter'

export default motion(PlaylistFilter)