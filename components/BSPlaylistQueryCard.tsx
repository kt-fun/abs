import { Button, Card, DropdownMenu, Slider, Switch,Text } from "@radix-ui/themes";
import SearchBar from "./SearchBar";
import { PlaylistQueryParam } from "@/hooks/usePagingBSPlaylist";
import NPSRangePicker from "./NPSRangePicker";
import Calendar from "./Calendar";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
interface SortMenuProps {
    options: string[];
    current: string;
    onUpdateCurrent: (current: string) => void;
}
const playlistOptions = [
    "Relevance",
    "Latest",
    "Curated",
]
const SortMenu = (
    {options,current,onUpdateCurrent}:SortMenuProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft">
                {current}
                <CaretDownIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {
                    options.map((option:string)=>{
                        return (
                            <DropdownMenu.CheckboxItem key={option} onClick={()=>{onUpdateCurrent(option)}}>{option}</DropdownMenu.CheckboxItem>
                        )
                    })
                }
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

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
            <SortMenu options={playlistOptions} current={sortMenuCurrent} onUpdateCurrent={handleSortMenuCurrentChange}/>
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
                    <NPSRangePicker/>
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