import {Avatar} from "@/components/ui/avatar";
import ScoreItem from "@/components/render/scoreItem";
import {ScoreSaberItem, ScoreSaberUser} from "@/interfaces/render/scoresaber";
import config from "@/lib/config";
import Flags, {EarchIcon} from "@/components/render/flag";
import {cn} from "@/lib/utils";

const BASE_URL = config.constants.BASE_URL
console.log("BASE_URL",config.constants.BASE_URL)
async function getScoreItem(uid:string) {
  const url = `${BASE_URL}/api/render/player/${uid}`
  const res = await fetch(url).then(res=> res.json())
  return res as ScoreSaberItem[][]
}

async function getUserInfo(uid:string) {
  const url = `${BASE_URL}/api/render/player/${uid}/full`
  const res =  await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch userInfo:'+uid)
  }
  return (await res.json()) as ScoreSaberUser
}


export default async function BSPlayerRankPage({params}: { params: { uid: string } }) {
  const [leaderItem, scoreUser] = await Promise.all([ getScoreItem(params.uid), getUserInfo(params.uid)])
  const leaderItems = leaderItem.flatMap(item=>item)
  // const bg = scoreUser.profilePicture
  const bg = "https://www.loliapi.com/acg/pc/"
  return(
  <>
    <div className={"flex flex-col bg-slate-100 justify-center items-center min-h-screen"}>
      <div
         className={"h-[680px] w-[960px] rounded-md"}
         id="render-result"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundSize: 'cover',
      }}
      >
        <div className={"bg-blend-darken bg-black/[.6] p-4 text-white h-full rounded-lg"}>
          <div className={"flex space-x-4 pb-2"}>
            <Avatar
              className={"h-32 w-32 rounded-md"}
              src={scoreUser.profilePicture}
              fallback={scoreUser.name.slice(0, 1)}
            />
            <div className={"flex flex-col justify-between"}>
              <span className={"text-3xl font-bold"}>{scoreUser.name}</span>
              <div className={"flex space-x-2 text-md font-bold items-center"}>
                <span className="flex items-center space-x-1">
                  <EarchIcon/>
                  <span># {scoreUser.rank}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Flags flagNationCode={scoreUser.country}/>
                  <span># {scoreUser.countryRank}</span>
                </span>
              </div>
              <div
                className={cn(
                  "text-4xl font-bold ",
                  " bg-gradient-to-r bg-clip-text text-transparent from-blue-300 to-red-300",
                  "text-orange-100"
                )}
              >
                {scoreUser.pp} PP
              </div>
            </div>
            <div className={"text-4xl pl-40 items-center flex text-gray-100 opacity-70"}>
              <span>coming soon 👷</span>
            </div>
          </div>
          <div className={"grid grid-cols-4 gap-2"}>
            {
              leaderItems.map(((item, idx) => (
                <ScoreItem scoreItem={item} key={idx}/>
              )))
            }
          </div>

        </div>
      </div>
    </div>
  </>
  )
}