import { BSUser } from "@/interfaces/beatsaver-user";
import { useBSUser } from "@/hooks/useBSUser";
import { useCallback, useEffect, useMemo } from "react";
import { error } from "console";

const loader = ()=> <div>loading</div>

export default function BSUserDetailCard(
    {user}:{user:BSUser}
) {
    const {data, isLoading, error} = useBSUser(user.id)
    const userWithStats:any = data
    return (
        <>
        {
            isLoading && loader()
        }
        {
            data && <div>
            <div>
                <img src={userWithStats.avatar} alt={userWithStats.name}/>
            </div>
            <div>
                <div>{userWithStats.name}</div>
                <div>{userWithStats.id}</div>
            </div>
        </div>
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