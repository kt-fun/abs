'use client'
import {createContext, useContext} from "react";

export const OpsPanelContext = createContext<OpsPanelProps>({
  background: 'https://www.loliapi.com/acg/pe',
  // "https://moe.anosu.top/img?type=mp"
  size: 20,
})
interface OpsPanelProps {
  background: string,
  size: number
}
export const useOpsPanel = () => {
  const data = useContext(OpsPanelContext)
  return data
}