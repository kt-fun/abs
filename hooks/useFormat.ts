import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useLocale} from "@/components/providers/i18nProvider";
import {formatNumber} from "@/lib/format";
import { zhCN, enUS } from 'date-fns/locale';
require('dayjs/locale/zh-cn')
require('dayjs/locale/en')
dayjs.extend(relativeTime)
const getFNSLocale = (locale:string) => {
  let l = locale.toLowerCase()
  if (l == 'zh-cn') {
    return zhCN
  }
  return enUS
}



export const formatTime = (locale:string)=>{
  return (time: string) => {
    return dayjs(time).locale(locale.toLowerCase()).fromNow()
  }
}

export const formatDate = (locale:string) => (time: Date | undefined) => {
  if (!time) return undefined
  return dayjs(time)
    .locale(locale)
    .format('YYYY-MM-DD')
}
export const formatDuration = ()=>(duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}m${seconds < 10 ? '0' : ''}${seconds}s`
}

export const useLocaleFormat = (locale:string|undefined = undefined) => {
  const currentLocale = locale??useLocale()
  const FNSLocale = getFNSLocale(currentLocale)
  return {
    formatTime: formatTime(currentLocale),
    formatDate: formatDate(currentLocale),
    formatDuration: formatDuration(),
    formatNumber: formatNumber,
    FNSLocale
  }
}