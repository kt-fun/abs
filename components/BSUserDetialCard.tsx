import { BSUser } from "@/interfaces/beatsaver-user";
import { useBSUser } from "@/hooks/api/useBSUser";
import BSMapper from "./BSMapper";
import { MdOutlineErrorOutline } from "react-icons/md";
import Loading from "@/components/load-status/Loading";


const Error = ({error}:{error:string})=> 
<div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
    <span  className={`hover:bg-white  p-1 rounded-full`}>
        <MdOutlineErrorOutline/>
    </span>
    <span className="text-xs sm:text-xl">Error:{error}...</span>
</div>

export default function BSUserDetailCard(
    {user}:{user:BSUser}
) {
    const {bsUserWithStats, isLoading, error} = useBSUser(user.id)
    return (
            <>
            {
                isLoading ? <Loading /> :
                bsUserWithStats ? <BSMapper bsUserWithStats={bsUserWithStats} className="shadow-none"/> :
                <Error error={error.toString()}/>
            }
            </>
    )
}