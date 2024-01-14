'use client'
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { UserInfo, useUserSessionStore } from "@/hooks/state/useSession";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NotifyModal from "./NotifyModal";
import {Avatar} from "@/components/ui/avatar";
import Link from "@/components/ui/link";
export const LoggedinUserNav = ({
    user
}:{user:UserInfo}) => {
  const logout = useUserSessionStore((state) => state.logout)
  const [messageDialogOpen, setMessageDialogOpen] = useState(false)
  const handleDialogOpen = ()=> {
    setMessageDialogOpen(true)
  }
    return (
        <>

            <HoverCard>
                <HoverCardTrigger>
                    <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>
                        <Avatar src= {user!.avatar}
                        className="rounded-full w-6 h-6"
                        fallback={user!.username[0]}
                        />
                        <span className="text-xl">{user!.username}</span>
                    </div>
                </HoverCardTrigger>

            <HoverCardContent>
            <div>
                <ul>
                    <li className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5  cursor-pointer' onClick={handleDialogOpen}>
                        <div  className="flex space-x-2 items-center text-sm font-semibold">
                            <span><IoIosNotificationsOutline/></span>
                            <span>message</span>
                        </div>
                    </li>
                    <li  className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5  cursor-pointer'>
                      <Link className="flex space-x-2 items-center text-sm font-semibold" href={"/profile"}>
                          <span><CgProfile/></span>
                          <span>profile</span>
                      </Link>
                    </li>

                    {/*<Separator className="w-full my-2"/>*/}
                    <li  className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 cursor-pointer' onClick={logout}>
                        <div className="flex space-x-2 items-center text-sm font-semibold">
                                <span><IoLogOutOutline/></span>
                                <span>logout</span>
                        </div>
                    </li>
                </ul>
            </div>
            </HoverCardContent>
            </HoverCard>
            <NotifyModal open={messageDialogOpen} setOpen={setMessageDialogOpen}/>
         </>
    )
}

export default function UserNav() {
    // if logged in

  const user = useUserSessionStore((state) => state.user)
  const isLoading = useUserSessionStore((state) => state.isLoading)
  const isLoggedIn = useUserSessionStore((state) => state.isLoggedIn)
  const [open, setOpen] = useState(false);
    return (
        <div>
            {/*<AlertDialog.Root  open={open} onOpenChange={setOpen}>*/}
            {/*    <AlertDialog.Trigger>*/}
            {/*    {*/}
            {/*        isLoggedIn ? (*/}
            {/*            <LoggedinUserNav user={user!}/>*/}
            {/*        ):(*/}
            {/*            <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>*/}
            {/*                <div > Sign in </div>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*    </AlertDialog.Trigger>*/}
            {/*    <AlertDialog.Content className="focus:outline-none">*/}
            {/*        <LoginForm onClose={()=>setOpen(false)}/>*/}
            {/*    </AlertDialog.Content>*/}
            {/*</AlertDialog.Root>*/}
        </div>
    )
}