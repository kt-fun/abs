import { BSMap} from "@/interfaces/render/beatsaver";
import config from "@/lib/config";
import BSMapShare from "@/components/render/bsmap-img";
const BASE_URL = config.constants.BASE_URL

async function getMapDetail(id:string) {
  const url = `${BASE_URL}/api/render/beatsaver/${id}`
  const res = await fetch(url).then(res=> res.json())

  return res as BSMap
}

export default async function BSPlayerRankPage({params}: { params: { id: string } }) {
  const bsMap = await getMapDetail(params.id)
  return(
  <>
    <BSMapShare bsMap={bsMap}/>
  </>
  )
}