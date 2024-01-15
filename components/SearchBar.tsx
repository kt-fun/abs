import {Search} from "lucide-react";
import {IconButton} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export default function SearchBar(
    {
        queryKey,
        onQueryKeyChange,
        onQuery,
      className
    }:{
        queryKey:string,
        onQueryKeyChange:(queryKey:string)=>void,
        onQuery:()=>void,
      className?:string
    }
) {
    const handleQueryKeyChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        onQueryKeyChange(e.target.value)
    } 
    const handleQuery = (e:any)=>{
        e.preventDefault()
        onQuery()
    }
    return (
        <>
                <div className={cn("flex",className)}>
                    <div className="relative w-full flex items-center space-x-1 justify-between">
                        <input type="search" id="search" value={queryKey} onChange={handleQueryKeyChange} className=" w-full block  p-2.5 z-20 text-sm text-gray-900 bg-gray-50  rounded-lg border border-gray-300  dark:bg-gray-700 focus:outline-none dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required/>
                        <IconButton onClick={handleQuery}>
                            <Search />
                        </IconButton>
                    </div>
                </div>

        </>
    )
}