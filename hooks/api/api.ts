export async function getLBScoreInfo(type: 'hitcnt'|'score', segmentSize:number = 1) {
  const url = `https://cf-lbrank.ktlab.io/am-history/${type}?slice=${segmentSize}`
  const res =  await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch scoreInfo:')
  }
  const data = await res.json()

  const d = data.mappedData
  let result: Record<any, any> = {}

  for (const item of d) {
    result[item.time] = item.groupedScore
  }
  return result
}