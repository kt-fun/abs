"use client"
import React, {createContext, useContext, useRef} from "react";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {exportAsImage} from "@/app/tmp/lb/exportimg";
import {useRandomBackground} from "@/hooks/useBackground";
import { Button } from "@/components/ui/button";
import {useMatchPath} from "@/hooks/useMatchPath";
import CustomLink from "@/components/shared/custom-link";
import {cn} from "@/lib/utils";
export default function Ops() {
    const { background, switchOne, source, presetSource, changeSource } = useRandomBackground()
  const [input, setInput] = React.useState<string>()
  const updateInput = (e: any)=>{
    setInput(e?.target.value)
  }
  const data = {
    background,
    size: 20,
  }
  const ref = useRef(null)
  const exportImage = ()=> {
    if(ref) {
      exportAsImage(ref.current as any, "image.png")
    }

  }
  return (
    <>
    <div className="w-full flex-none md:w-64 p-2 divide-x-2">
        <SideNav/>
      </div>
      <div className={'flex flex-row items-center justify-center mb-4 gap-2'}>
        <Input value={input ?? ""} onInput={(e) => updateInput(e)}/>
        <Button onClick={() =>  setInput(undefined)}>Clear</Button>
        <Button onClick={() => switchOne(input)}>Switch BackGround</Button>
        <Button onClick={exportImage}>Export</Button>
        <Select  defaultValue={source.name} onValueChange={(e) => changeSource(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {
              presetSource.map(it=><SelectItem key={it.name} value={it.name}>{it.name}</SelectItem>)
            }
          </SelectContent>
        </Select>
      </div>
    </>
  )
}


function SideNav() {
  return (
    <div>
      <ul className={'flex gap-2'}>
        <li><RouteItem name={"砍方块榜"} path={"/tmp/lb/hitcnt"}/></li>
        <li><RouteItem name={"比分榜"} path={"/tmp/lb/score"}/></li>
        <li><RouteItem name={"动态砍方块榜"} path={"/tmp/lb/hitcnt/race"}/></li>
        <li><RouteItem name={"动态比分榜"} path={"/tmp/lb/score/race"}/></li>
      </ul>
    </div>
  )
}


function RouteItem(
  {name, path}: {name: string, path: string},
) {
  const isActive = useMatchPath(path);
  const activeClass = isActive ? 'bg-zinc-100/90 text-zinc-900' : '';
  return (
    <CustomLink href={path}>
      <Button variant={'ghost'} className={cn('w-full text-xl font-bold', activeClass)}>
        {name}
      </Button>
    </CustomLink>
  )
}
