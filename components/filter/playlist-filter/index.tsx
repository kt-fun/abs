import {AnimatePresence, motion} from "framer-motion"
import React, {useEffect, useMemo, useState} from 'react'
import {cn} from "@/lib/utils";
import SearchBar from "@/components/filter/base/SearchBar";
import {useTranslation} from "@/hooks/useTranslation";
import SortOrder from "@/components/filter/base/order";
import DateFilter from "@/components/filter/base/date-filter";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {Award, BadgeCheck} from "lucide-react";
import NPSRangePicker from "@/components/filter/base/NPSRangePicker";
import {PlaylistQueryParam} from "@/interfaces/bsplaylist-query-param";

interface PlaylistFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  queryParam: PlaylistQueryParam,
  onUpdateQueryParam: (searchParam:PlaylistQueryParam) => void,
  isQuerying: boolean,
  onQuery: ()=>void
}
const PlaylistFilter = React.forwardRef<HTMLDivElement, PlaylistFilterProps>(
  (
    {
      queryParam,
      onUpdateQueryParam,
      isQuerying,
      onQuery,
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
          "md:flex items-center justify-between flex-wrap gap-1 grid grid-rows-2 grid-cols-12 align-middle justify-items-center text-xs",
        )}
      >
        <div className={"col-span-3 col-start-10"}>
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
          className={"row-start-1 col-span-9 justify-self-start"}
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
          order={queryParam.sortOrder}
          className={"row-start-2 col-span-3 justify-self-start"}
          onUpdateOrder={(order)=>{
            onUpdateQueryParam({...queryParam,sortOrder:order})
          }}
        />
        <div className={"row-start-2 col-start-4 col-span-5 justify-self-center text-xs"}>
          <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
        </div>

        <SearchBar
          className={'h-6 row-start-2 col-start-9 col-span-4 justify-self-end'}
          queryKey={queryParam.queryKey}
          onQueryKeyChange={(k) => {
            onUpdateQueryParam({
              ...queryParam,
              queryKey: k
            })
          }}
          onQuery={onQuery}
        />
      </div>
    )
  })

PlaylistFilter.displayName = 'PlaylistFilter'

export default motion(PlaylistFilter)