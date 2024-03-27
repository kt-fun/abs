import {Tooltip} from "@/components/ui/tooltip";
import {Card} from "@/components/ui/card";
import SearchBar from "@/components/filter/base/SearchBar";
import NPSRangePicker from "@/components/filter/base/NPSRangePicker";
import {useCallback, useMemo, useState} from "react";
import {FeatureOption, MapQueryParam, options} from "@/hooks/api/usePagingBSMap";
import DurationRangePicker from "@/components/filter/base/DurationRangePicker";
import RatingRangePicker from "@/components/filter/base/RatingRangePicker";
import SortMenu from "@/components/filter/base/SortMenu";
import dayjs from "dayjs";
import DateRangePicker from "@/components/filter/base/DateRangePicker";
import {BSGenreTags, BSStyleTags} from "@/interfaces/mapTags";
import BSMapTag from "@/components/BSMapTag";
import {cn} from "@/lib/utils";
const mapSortOptions = [
    "Relevance",
    "Latest",
    "Curated",
    "Rating",
]

export default function BSMapQueryCard(
    {queryParam,className, updateQuery, query}:{
        className?:string, 
        queryParam:MapQueryParam, 
        updateQuery:(query:MapQueryParam)=>void, 
        query:()=>void
    }
) {
    const [sortMenuCurrent, setSortMenuCurrent] = useState("Relevance");
    const handleSortMenuCurrentChange = (current:string)=>{
        setSortMenuCurrent(current);
        updateQuery({
            ...queryParam,
            sortOrder:current
        })
    }
    const npsRange = useMemo(()=>{
        return [queryParam.minNps,queryParam.maxNps] as [number|undefined, number|undefined]
    },[queryParam])
    const durationRange = useMemo(()=>{
        return [queryParam.minDuration,queryParam.maxDuration] as [number|undefined, number|undefined]
    },[queryParam])
    const ratingRange = useMemo(()=>{
        return [queryParam.minRating,queryParam.maxRating] as [number|undefined, number|undefined]
    },[queryParam])
    const setNpsRange = (range:[number|undefined,number|undefined])=>{
        updateQuery({
            ...queryParam,
            minNps:range[0],
            maxNps:range[1]
        })
    }
    const setDurationRange = (range:[number|undefined,number|undefined])=>{
        updateQuery({
            ...queryParam,
            minDuration:range[0],
            maxDuration:range[1]
        })
    }
    const setRatingRange = (range:[number|undefined,number|undefined])=>{
        updateQuery({
            ...queryParam,
            minRating:range[0],
            maxRating:range[1]
        })
    }

  const checkIfOptionChecked = useCallback((option:FeatureOption)=>{
    if (!queryParam.options) return false
    return queryParam.options[option.label as keyof typeof queryParam.options] == true
  },[queryParam])
    const handleOptionChange = (option:FeatureOption)=>{
      const checked = checkIfOptionChecked(option)
        updateQuery({
            ...queryParam,
            options: {
                ...queryParam.options,
                [option.label]: !checked
            }
        })
    }
  const dateRange = useMemo(()=>{
    let range = [undefined,undefined] as [Date?,Date?]
    if (queryParam.from) range[0] = dayjs(queryParam.from).toDate()
    if (queryParam.to) range[1] = dayjs(queryParam.to).toDate()
    return range
  },[queryParam])

  const handleDateRangeChange = (range:[Date?,Date?])=>{
    updateQuery({
      ...queryParam,
      from:range[0]? dayjs(range[0]).format("YYYY-MM-DD"):undefined,
      to:range[1]? dayjs(range[1]).format("YYYY-MM-DD"):undefined
    })
  }

  const [selectedStyleTags, setSelectedStyleTags] = useState<string[]>([])
  const [selectedGenreTags, setSelectedGenreTags] = useState<string[]>([])

  const handleStyleTagChange = (tag:string)=>{
    if (selectedStyleTags.includes(tag)){
      setSelectedStyleTags(selectedStyleTags.filter((t)=>t!=tag))
    }else{
      setSelectedStyleTags([...selectedStyleTags,tag])
    }
  }
  const handleGenreTagChange = (tag:string)=>{
    if (selectedGenreTags.includes(tag)){
      setSelectedGenreTags(selectedGenreTags.filter((t)=>t!=tag))
    }else{
      setSelectedGenreTags([...selectedGenreTags,tag])
    }
  }
    return (
        <Card className={cn('h-full space-y-3 max-w-full p-2',className)}>
          <SearchBar
            queryKey={queryParam.queryKey}
            onQuery={query}
            className={"sticky top-0 z-50"}
            onQueryKeyChange={
              (queryKey: string) => {
                updateQuery({
                  ...queryParam,
                  queryKey: queryKey
                })
              }}
          />
          <div className="flex justify-between items-center">
            <div className="font-medium">Sorted By</div>
            <SortMenu
              className={"max-w-28"}
              options={mapSortOptions}
              current={sortMenuCurrent}
              onUpdateCurrent={handleSortMenuCurrentChange}/>
          </div>

          <div className="flex  w-full p-2 justify-between items-center">
            <div className="relative w-full">
              <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
            </div>
          </div>
          <div className="flex w-full p-2 justify-between items-center">
            <div className="relative w-full">
              <DurationRangePicker range={durationRange} setRange={setDurationRange}/>
            </div>
          </div>
          <div className="flex w-full p-2 justify-between items-center">
            <div className="relative w-full">
              <RatingRangePicker range={ratingRange} setRange={setRatingRange}/>
            </div>
          </div>

          <div className="font-medium">Date Selector</div>
          <div className="flex flex-col">
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={handleDateRangeChange}
            />
          </div>
          <div className="font-medium">Feature Selector</div>
          <div className="flex-wrap flex  gap-1">
            {
              options.map((option) => {
                return (
                  <Tooltip content={option.tooltip!} key={option.label}>
                    <span
                      onClick={() => {
                        handleOptionChange(option)
                      }}
                      className={`${checkIfOptionChecked(option) ? '' : 'opacity-40'}  text-xs px-1 text-white rounded-md p-0.5 bg-green-600 inline-flex items-center justify-center space-x-1 cursor-pointer`}>
                      {option.label}
                    </span>
                  </Tooltip>
                )
              })
            }
          </div>

          <div className="font-medium">Style Tag Selector</div>
          <div className="flex flex-wrap gap-1">
            {
              BSStyleTags.map((tag) =>
                (<span
                  key={tag.slug}
                  onClick={() => {
                    handleStyleTagChange(tag.slug)
                  }}>
                <BSMapTag className={`${selectedStyleTags.includes(tag.slug) ? '' : 'opacity-40'} px-1  text-xs`}
                          tag={tag}/>
                </span>)
              )
            }
          </div>
          <div className="font-medium">Genre Tag Selector</div>
          <div className="flex flex-wrap gap-1">
            {
              BSGenreTags.map((tag) =>
                <span
                  key={tag.slug}
                  onClick={() => {
                    handleGenreTagChange(tag.slug)
                  }}>
                <BSMapTag
                  className={`${selectedGenreTags.includes(tag.slug) ? '' : 'opacity-40'}  px-1 text-xs `}
                  key={tag.slug}
                  tag={tag}/>
                </span>
              )
            }
          </div>
        </Card>
    )
}