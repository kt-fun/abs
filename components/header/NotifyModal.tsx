'use client'
import { usePagingNotifications } from "@/hooks/api/useNotification";


import {Dialog,DialogContent} from "@/components/ui/dialog";
import React, { useState } from "react";
import {IoCloseOutline, IoSettings} from "react-icons/io5";
import {BSNotification} from "@/interfaces/bs-notification";
import {formatTime} from "@/lib/format";
import {Loading} from "@/components/shared/load-status";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Scrollbar} from "@radix-ui/react-scroll-area";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Label} from "@/components/ui/label";
import {Button, IconButton} from "@/components/ui/button";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";
import {Switch} from "@/components/ui/switch";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";




const BSNotificationCard = ({
    notification
}:{
    notification:BSNotification
}) => {
    return (
        <div className=" space-x-2 items-center border-0">
              <div className="flex space-x-2 text-sm">
                <span>{notification.head}</span>
                <span className="m-0">{formatTime(notification.time)}</span>
              </div>
          <div className="text-sm">
            {notification.body}
          </div>
        </div>
    )
}


type Checked = DropdownMenuCheckboxItemProps["checked"]
export default function NotifyModal({
    open,setOpen
}:{
    open:boolean,setOpen(open: boolean): void
}) {
  const [notificationType, setNotificationType] = useState<"unread" | "read">("unread")
  const {notifications,isLoading} = usePagingNotifications(notificationType)

  const [filter, setFilter] = useState<Checked[]>([false,false,false])
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
                <Tabs defaultValue="unread" onValueChange={(value)=>{setNotificationType(value as any)}}>
                  <div className="flex justify-between items-center py-2">
                    <TabsList aria-label="notifications tab" className=" rounded-full px-2  h-auto">
                          <TabsTrigger value="unread" className="text-xs p-1 px-2 rounded-full">Unread</TabsTrigger>
                          <TabsTrigger value="read" className="text-xs p-1  px-2 rounded-full">Read</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center space-x-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="rounded-lg p-2">
                        <Button variant="ghost">Filter</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuCheckboxItem
                          checked={filter[0]}
                          onCheckedChange={(checked)=>setFilter([checked,filter[1], filter[2]])}
                        >Map Release</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter[1]}
                          onCheckedChange={(checked)=>setFilter([filter[0],checked, filter[2]])}
                        >Map Curation</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={filter[2]}
                          onCheckedChange={(checked)=>setFilter([filter[0],filter[1], checked])}
                        >Map Review</DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                      <Popover>
                        <PopoverTrigger asChild className="rounded-full">
                          <IconButton><IoSettings/></IconButton>
                        </PopoverTrigger>
                        <PopoverContent className="w-48">
                          <Label className="font-medium text-lg">Preference</Label>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center space-x-1">
                              <Label>Map Curation</Label>
                              <Switch/>
                            </li>
                            <li className="flex justify-between items-center">
                              <Label>Map Review</Label>
                              <Switch/>
                            </li>
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <TabsContent value="unread">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-2 divide-y">
                        {
                          notifications?.map((notification) => (
                            <BSNotificationCard notification={notification} key={notification.id}/>
                                ))
                            }
                            {
                                isLoading && (<Loading/>)
                            }
                        </div>
                        <Scrollbar orientation="vertical"/>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="read">
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2 divide-y">
                          {
                            notifications?.map((notification)=>(
                              <BSNotificationCard notification={notification} key={notification.id}/>
                            ))
                          }
                          {
                            isLoading && (<Loading/>)
                          }
                        </div>
                        <Scrollbar orientation="vertical"/>
                      </ScrollArea>
                    </TabsContent>
                </Tabs>
                </div>
            </div>
          </DialogContent>
      </Dialog>
    )
}