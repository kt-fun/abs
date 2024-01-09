'useClient'
import { Dialog,Text, HoverCard, Separator,AlertDialog } from "@radix-ui/themes";
import { LoginForm } from "./LoginForm";
import { UserInfo, useUserSessionStore } from "@/hooks/state/useSession";
import Image from "next/image";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useDebounce } from "@uidotdev/usehooks";
import NotififyModal from "./NotifyModal";
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

            <HoverCard.Root>
                <HoverCard.Trigger>
                    <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>
                        <Image src= {user!.avatar}
                        alt="avatar"
                        width={24}
                        height={24}
                        className="rounded-full"
                        />
                        <Text size={"4"}>{user!.username}</Text>
                    </div>
                </HoverCard.Trigger>

            <HoverCard.Content>
            <div>
                <ul>
                    <li className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5  cursor-pointer' onClick={handleDialogOpen}>
                        <Text  className="flex space-x-2 items-center text-sm font-semibold">
                            <span><IoIosNotificationsOutline/></span>
                            <span>message</span>
                        </Text>
                    </li>
                    <li  className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5  cursor-pointer'>
                        <Text>
                            <Link className="flex space-x-2 items-center text-sm font-semibold" href={"/profile"}>
                                <span><CgProfile/></span>
                                <span>profile</span>
                            </Link>
                        </Text>
                    </li>

                    <Separator className="w-full my-2"/>
                    <li  className='hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 cursor-pointer' onClick={logout}>
                        <Text className="flex space-x-2 items-center text-sm font-semibold">
                                <span><IoLogOutOutline/></span>
                                <span>logout</span>
                        </Text>
                    </li>
                </ul>
            </div>
            </HoverCard.Content>
            </HoverCard.Root> 
            <NotififyModal open={messageDialogOpen} setOpen={setMessageDialogOpen}/>
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
            <AlertDialog.Root  open={open} onOpenChange={setOpen}>
                <AlertDialog.Trigger>
                {
                    isLoggedIn ? (
                        <LoggedinUserNav user={user!}/>
                    ):(
                        <div className='cursor-default hidden md:flex hover:bg-gradient-to-r from-red-500 to-blue-500 hover:text-white rounded-full px-2 py-0.5 space-x-2 items-center font-semibold'>
                            <Text size={"4"}> Sign in </Text>
                        </div>
                    )
                }
                </AlertDialog.Trigger>
                <AlertDialog.Content className="focus:outline-none">
                    <LoginForm onClose={()=>setOpen(false)}/>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    )
}