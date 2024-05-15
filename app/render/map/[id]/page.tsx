import { BSMap} from "@/interfaces/render/beatsaver";
import config from "@/lib/config";
import BSMapShare from "@/components/render/bsmap-img";
const BASE_URL = config.constants.BASE_URL

async function getMapDetail(id:string) {
  const url = `${BASE_URL}/api/render/beatsaver/${id}`
  const res = await fetch(url).then(res=> res.json())

  return res as BSMap
}
async function getMapDetailWithBLMapRankInfo(id:string) {
  const url = `${BASE_URL}/api/render/beatsaver/${id}`
  let res = (await fetch(url).then(res=> res.json())) as BSMap
  const publishedVersion = res.versions[0]
  let hash = publishedVersion.hash
  if(res.blRanked) {
    try {
      const blurl = `https://api.beatleader.xyz/map/hash/${hash}`
      const BLResponse = await fetch(blurl,{next: {revalidate: config.constants.CACHE_TIMEOUT}})
      const BLRes = await BLResponse.json()
      // mode+Diff => stars
      let BLDiffs = BLRes.difficulties?.map((it:any)=> ({
        mode: it.modeName  as string,
        diff: it.difficultyName as string,
        stars: it.stars  as number
      }))
      res.versions[0].diffs = res.versions[0].diffs.map(diff=> {
        //get diff by
        let bldiff = BLDiffs.find((it:any)=> it.mode == diff.characteristic && it.diff == diff.difficulty)
        return {
          ...diff,
          stars: bldiff?.stars
        }
      })
    }catch (e) {
      console.log('failed to get bl stars due to unexpect error')
      console.log(e)
    }
  }
  // if bl rank map
  // fetch diff stars =>
  return res as BSMap
}
export default async function BSPlayerRankPage({params}: { params: {
  id: string,
},

}) {
  const bsMap = await getMapDetailWithBLMapRankInfo(params.id)

  // if(params.steamid) {
  //   // fetch()
  // }
  return(
  <>
    <BSMapShare bsMap={bsMap}/>
  </>
  )
}