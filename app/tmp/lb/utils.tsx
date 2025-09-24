const seasonCode = 'autumn'
const year = '2025'
const code = ''
export const season = 'Autumn'
export async function getScoreInfo() {
  const url = `http://gateway.lightband.cn:3005/activity/api/activity/playInfo?code=${seasonCode}${year}${code}`
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
