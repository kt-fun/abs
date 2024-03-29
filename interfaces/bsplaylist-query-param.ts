import {MapQueryParam, SearchParam} from "@/interfaces/bsmap-query-param";

export interface PlaylistQueryParam {
  queryKey:string,
  curated?:boolean,
  verifiedMapper?: boolean,
  sortOrder: string,
  minNps?:number,
  maxNps?:number,
  from?: string,
  to?: string,
}



const buildPlaylistQueryParamFromSearchParam =  (searchParams:SearchParam) => {
  const takeFirst = (key: string):string|undefined => {
    const v = searchParams[key]
    if (v && v instanceof Array) {
      return v[0]
    }
    return v
  }
  const toFloat = (v: string | undefined)=> {
    if(v == undefined) return v
    const res = parseFloat(v)
    return Number.isNaN(res) ? undefined : res
  }
  const param = {
    queryKey: takeFirst('q') ?? '',
    sortOrder: takeFirst('order') ?? 'Relevance',
  } as PlaylistQueryParam
  if(toFloat(takeFirst('minNps'))) {
    param.minNps = toFloat(takeFirst('minNps'))
  }
  if(toFloat(takeFirst('maxNps'))) {
    param.maxNps = toFloat(takeFirst('maxNps'))
  }
  if(takeFirst('from')) {
    param.from = takeFirst('from')
  }
  if(takeFirst('to')) {
    param.to = takeFirst('to')
  }
  if(takeFirst('verifiedMapper')) {
    param.verifiedMapper = takeFirst('verifiedMapper') == 'true'
  }
  if(takeFirst('curated')) {
    param.curated = takeFirst('curated') == 'true'
  }
  return param
}
const buildSearchParamFromPlaylistQueryParam = (playlistQueryParam:PlaylistQueryParam) => {
  let param = new URLSearchParams()
  param.set('sortOrder',playlistQueryParam.sortOrder)
  param.set('q',playlistQueryParam.queryKey)
  if(playlistQueryParam.minNps) {
    param.set('minNps',playlistQueryParam.minNps.toString())
  }
  if(playlistQueryParam.maxNps) {
    param.set('maxNps',playlistQueryParam.maxNps.toString())
  }
  if(playlistQueryParam.from) {
    param.set('from',playlistQueryParam.from)
  }
  if(playlistQueryParam.to) {
    param.set('to',playlistQueryParam.to)
  }

  if(playlistQueryParam.verifiedMapper != undefined) {
    param.set('verifiedMapper',playlistQueryParam.verifiedMapper.toString())
  }
  if(playlistQueryParam.curated != undefined) {
    param.set('curated',playlistQueryParam.curated.toString())
  }
  return param
}
const BSPlaylistQueryParam= {
  buildSearchParamFromPlaylistQueryParam,
  buildPlaylistQueryParamFromSearchParam
}

export default BSPlaylistQueryParam