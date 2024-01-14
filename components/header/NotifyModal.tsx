import { useNotifyStats, usePagingNotifications } from "@/hooks/api/useNotify";
import * as Tabs from "@radix-ui/react-tabs";

import {Dialog,DialogContent,DialogTrigger} from "@/components/ui/dialog";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";




export default function NotififyModal({
    open,setOpen
}:{
    open:boolean,setOpen(open: boolean): void
}) {
    const [notificationType, setNotificationType] = useState<"unread" | "read">("unread")
    const {data} = usePagingNotifications(notificationType)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <div>
                <div className="flex justify-between">
                    <div className="">Notifications</div>
                    <div className="p-1 cursor-pointer hover:bg-gray-200 rounded-full" onClick={()=>{setOpen(false)}}>
                        <span className="sr-only">Close</span>
                        <IoCloseOutline />
                    </div>
                </div>
                <div>
                <Tabs.Root defaultValue="unread" orientation="vertical">
                    <Tabs.List aria-label="tabs example">
                    <Tabs.Trigger value="unread">Unread</Tabs.Trigger>
                    <Tabs.Trigger value="read">Read</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">Three</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="unread">Tab one content</Tabs.Content>
                    <Tabs.Content value="read">Tab two content</Tabs.Content>
                    <Tabs.Content value="tab3">Tab three content</Tabs.Content>
                </Tabs.Root>
                </div>
            </div>
          </DialogContent>
      </Dialog>
    )
}