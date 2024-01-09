import { BSUser } from "@/interfaces/beatsaver-user";
import { useBSUser } from "@/hooks/api/useBSUser";
import { useCallback, useEffect, useMemo } from "react";
import { error } from "console";
import BSMapper from "./BSMapper";

const loader = ()=> <div>loading</div>

export default function BSUserDetailCard(
    {user}:{user:BSUser}
) {
    const {bsUserWithStats, isLoading, error} = useBSUser(user.id)
    return (
            <>

            {
                isLoading && loader()
            }

            {
                bsUserWithStats && <>
                <BSMapper bsUserWithStats={bsUserWithStats}/>
                </>
            }
            {
                error && 
                <div>
                    error
                </div>
            }
            </>
    )
}