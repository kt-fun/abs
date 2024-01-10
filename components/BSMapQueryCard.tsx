import { Button, Card, DropdownMenu, Select, Slider, Switch,Text, Tooltip } from "@radix-ui/themes";
import SearchBar from "./SearchBar";
import NPSRangePicker from "./NPSRangePicker";
import Calendar from "./Calendar";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MapQueryParam, options } from "@/hooks/api/usePagingBSMap";
import DurationRangePicker from "./DurationRangePicker";
import RatingRangePicker from "./RatingRangePicker";
import SortMenu from "./SortMenu";
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
    const handleOptionChange = (option:string,checked:boolean)=>{
        updateQuery({
            ...queryParam,
            options: {
                ...queryParam.options,
                [option]:checked
            }
        })
    }
    return (
        <Card className={`${className}`} variant="classic">
            <div className="flex flex-col h-full space-y-3">
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
            <div>
            </div>
            <div className="flex justify-between items-center">
                <Text>Sorted By</Text>
                <SortMenu options={mapSortOptions} current={sortMenuCurrent} onUpdateCurrent={handleSortMenuCurrentChange}/>
            </div>
            <div className="">
                {
                    options.map((option)=>{
                        return (
                            <div key={option.value} className="flex justify-between items-center">
                                {option?.tooltip ? 
                                (
                                    <Tooltip content={option.tooltip}>
                                        <Text className="cursor-default">{option.label}</Text>
                                    </Tooltip>
                                ): (
                                    <Text>{option.label}</Text>
                                )}
                                <Switch
                                size="1"
                                defaultChecked={queryParam.options ? true:false}
                                onCheckedChange={(checked:boolean)=>{handleOptionChange(option.value,checked)}}
                                />
                            </div>
                        )
                    })
                }
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
            <div className="flex flex-col">
            <Calendar
                value={""}
                defaultValue={""}
                onSelectDate={(date:any) => {
                }}
            />
            </div>
            </div>
        </Card> 
    )
}