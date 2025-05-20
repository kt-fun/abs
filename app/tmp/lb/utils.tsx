const seasonCode = 'summer'
const year = '2025'

export const season = 'Summer'
export async function getScoreInfo() {
  const url = `http://gateway.lightband.cn:3005/activity/api/activity/playInfo?code=${seasonCode}${year}`
  const res =  await fetch(url, { cache: 'no-store' })
  console.log('load score')
  if (!res.ok) {
    throw new Error('Failed to fetch scoreInfo:')
  }
  console.log('load score success')
  const data = await res.json()
  const scoreList = data.data.scoreRankList.map((it:any) => ({
    name: it.player.nickname,
    score: it.score,
  }))
  const hitCountList = data.data.hitCountRankList.map((it:any) => ({
    name: it.player.nickname,
    score: it.score,
  }))
  return [scoreList, hitCountList]
}