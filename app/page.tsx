
import BSMap from '@/components/bs-map'
import {Header} from '@/components/Header'
import { bsmap } from '@/mock'
import { Button } from '@radix-ui/themes'
export default function Home() {
  return (
    <>
    
   <BSMap bsMap={bsmap}/>
    </>

  )
}
