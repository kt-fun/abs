import { Button, Card, DropdownMenu, Slider, Switch,Text } from "@radix-ui/themes";
import SearchBar from "./SearchBar";
import { PlaylistQueryParam } from "@/hooks/api/usePagingBSPlaylist";
import NPSRangePicker from "./NPSRangePicker";
import Calendar from "./Calendar";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import SortMenu from "./SortMenu";
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
            sortKey:current
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
    return (
        <Card className={`${className} `} variant="classic">
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
            <SortMenu options={playlistSortOptions} current={sortMenuCurrent} onUpdateCurrent={handleSortMenuCurrentChange}/>
            </div>
            <div className="flex justify-between items-center">
            <Text>Verified Mapper</Text>
            <Switch size="1" defaultChecked={queryParam.verifiedMapper} 
            onCheckedChange={handleVerifiedMapperChange}
            />
            </div>
            <div className="flex justify-between items-center">
            <Text>Curated</Text>
            <Switch size="1" defaultChecked={queryParam.curated}
            onCheckedChange={handleCuratedChange}/>
            </div>
            <div className="flex w-full p-2 justify-between items-center">
                <div className="relative w-full">
                    <NPSRangePicker range={npsRange} setRange={setNpsRange}/>
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