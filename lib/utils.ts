import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const diffConv = (diff:string) => {
  if(diff.includes('ExpertPlus')){
    return "EX+"
  }else if(diff.includes('Expert')) {
    return "EX"
  }else if(diff.includes("Hard")){
    return "H"
  }else if(diff.includes("Normal")){
    return "N"
  }
  return "E"
}