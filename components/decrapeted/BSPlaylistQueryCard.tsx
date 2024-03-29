import { Card } from "@/components/ui/card";
import {Switch } from "@/components/ui/switch";
import SearchBar from "@/components/filter/base/SearchBar";
import NPSRangePicker from "@/components/filter/base/NPSRangePicker";
import DateRangePicker from "@/components/decrapeted/DateRangePicker";
import { useMemo, useState } from "react";
import SortMenu from "@/components/decrapeted/SortMenu";
import dayjs from "dayjs";
import {cn} from "@/lib/utils";
import {PlaylistQueryParam} from "@/interfaces/bsplaylist-query-param";
const playlistSortOptions = [
    "Relevance",
    "Latest",
    "Curated",
]
export default function BSPlaylistQueryCard(
    {queryParam,className, updateQuery, query}:{
        className?:string, 
        queryParam:PlaylistQueryParam, 
        updateQuery:(query:PlaylistQueryParam)=>void, 
        query:()=>void
    }
) {
    const handleVerifiedMapperChange = (checked:boolean)=>{
        updateQuery({
          ...queryParam,
          verifiedMapper:checked
        })
      }
      const handleCuratedChange = (checked:boolean)=>{
        updateQuery({
          ...queryParam,
          curated:checked
        })
      }

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
    const setNpsRange = (range:[number|undefined,number|undefined])=>{
        updateQuery({
            ...queryParam,
            minNps:range[0],
            maxNps:range[1]
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
    return (
        <Card className={cn(className)} >
            <div className=" h-fit w-full space-y-3">
            <SearchBar
                queryKey={queryParam.queryKey}
                onQuery={query}
                onQueryKeyChange={
                    (queryKey:string)=>{
                        updateQuery({
                            ...queryParam,
                            queryKey:queryKey
                        })
                    }}
            />
            <div className="flex justify-between items-center">
            <div className="font-semibold text-xs">Sorted By</div>
            <SortMenu className="max-w-28"  options={playlistSortOptions} current={sortMenuCurrent} onUpdateCurrent={handleSortMenuCurrentChange}/>
            </div>
              <div className="flex justify-between items-center">
              <div className="font-semibold text-xs">Verified Mapper</div>
                <Switch defaultChecked={queryParam.verifiedMapper}
                        onCheckedChange={handleVerifiedMapperChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="font-semibold text-xs">Curated</div>
                <Switch defaultChecked={queryParam.curated}
                        onCheckedChange={handleCuratedChange}/>
              </div>
              <div className="flex w-full p-2 justify-between items-center">
                <div className="relative w-full">
                    <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
                </div>
            </div>
            
            <div className="flex flex-col">
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={handleDateRangeChange}
            />
            </div>
          </div>
        </Card> 
    )
}