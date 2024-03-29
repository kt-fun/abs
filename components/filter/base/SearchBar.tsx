import {Search} from "lucide-react";
import {IconButton} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useTranslation} from "@/hooks/useTranslation";

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
  const {t} = useTranslation('components.filter')
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
            <div className="relative w-full flex items-center space-x-1 justify-between rounded-lg">
              <form
                onSubmit={handleQuery}
              >
                <input
                  type="search"
                  id="search"
                  value={queryKey}
                  onChange={handleQueryKeyChange}
                  className=" w-full block  px-1 text-gray-900 h-6 border border-gray-300 text-xs focus:outline-none dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-full"
                  placeholder={t('search.placeholder')}
                />
                <input type="submit" hidden/>
              </form>

              <IconButton onClick={handleQuery} variant={"ghost"}>
                <Search className={'h-4 w-4'}/>
              </IconButton>
            </div>
          </div>
        </>
    )
}