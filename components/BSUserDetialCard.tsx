import { BSUser } from "@/interfaces/beatsaver-user";
import { useBSUser } from "@/hooks/api/useBSUser";
import BSMapper from "./BSMapper";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Text } from "@radix-ui/themes";
const Loading = ()=> 
<div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
    <motion.span 
        animate={{rotate:360}}
        transition={{duration:1,repeat:Infinity}}
        className={`hover:bg-white p-1 rounded-full`}
    >
        <AiOutlineLoading/>
    </motion.span>
    <Text size="2">Loading...</Text>
</div>


const Error = ({error}:{error:string})=> 
<div className="flex space-x-2 min-h-[64px] min-w-[64px] items-center px-2">
<motion.span 
        className={`hover:bg-white  p-1 rounded-full`}
    >
        <MdOutlineErrorOutline/>
    </motion.span>
    <Text size="2">Error:{error}...</Text>
</div>

export default function BSUserDetailCard(
    {user}:{user:BSUser}
) {
    const {bsUserWithStats, isLoading, error} = useBSUser(user.id)
    return (
            <>
            {
                isLoading ? <Loading/> :
                bsUserWithStats ? <BSMapper bsUserWithStats={bsUserWithStats}/> : 
                <Error error={error.toString()}/>
            }
            </>
    )
}