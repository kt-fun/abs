import { useNotifyStats, usePagingNotifications } from "@/hooks/api/useNotify";
import * as Tabs from "@radix-ui/react-tabs";
import { Button, Dialog, Separator, Text } from "@radix-ui/themes";
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
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Content>
            <div>
                <div className="flex justify-between">
                    <Text size={"4"}>Notifications</Text>
                    <Text className="p-1 cursor-pointer hover:bg-gray-200 rounded-full" size={"4"} onClick={()=>{setOpen(false)}}>
                        <span className="sr-only">Close</span>
                        <IoCloseOutline />
                    </Text>
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
          </Dialog.Content>
      </Dialog.Root>
    )
}