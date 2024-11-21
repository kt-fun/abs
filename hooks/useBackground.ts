'use client'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useCallback, useEffect, useState} from "react";

async function getRandomBackground(){
  const data = await fetch(`https://www.loliapi.com/acg/pe`, {
    redirect: 'follow'
  })
  return data.url
}

const presetSource = [
  {
    name: "移动端-loliapi",
    source: "https://www.loliapi.com/acg/pe/",
  },
  {
    name: "pc端-loliapi",
    source: "https://www.loliapi.com/acg/pc/",
  },
  {
    name: "moe.anosu.top/",
    source: `https://moe.anosu.top/img?type=mp`
  }
]
export const useRandomBackground = () => {
  const {mutateAsync, ...rest} = useMutation({
    mutationKey: ["randomBackground"],
    mutationFn: ()=> {
      return getRandomBackground()
    }
  })

  const [source, setCurrentSource] = useState(presetSource[0]);
  const [background, setBackground] = useState(source.source)

  const queryClient = useQueryClient()
  const switchOne = useCallback((custom?: string)=> {
    if(custom) {
      setBackground(custom)
    }else {
      mutateAsync()
        .then(result => {
          result && setBackground(result)
        }).catch(error => {})
    }
  }, [mutateAsync])
  const changeSource = (name: string)=> {
    const s = presetSource.find(it=>it.name === name)
    if(s){
      setCurrentSource(s)
      setBackground(s.source)
    }
  }
  return {
    // ...rest,
    background,
    switchOne,
    presetSource,
    source,
    changeSource,
  }
}