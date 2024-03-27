
export interface MapQueryParam {
  queryKey:string,
  sortOrder: string,
  minRating?:number,
  maxRating?:number,
  minBpm?:number,
  maxBpm?:number,
  minDuration?:number,
  maxDuration?:number,
  minNps?:number,
  maxNps?:number,
  from?: string,
  to?: string,
  tags?: string,
  mapper?: string,
  options?: {
    autoMapper?:boolean,
    chroma?:boolean,
    cinema?:boolean,
    noodle?:boolean,
    me?: boolean,
    ranked?: boolean,
    curated?: boolean,
    verified?: boolean,
    fullSpread?: boolean,
  },
}

export type SearchParam = { [key: string]: string | string[] | undefined }
const buildSearchParamFromMapQueryParam = (mapQueryPram:MapQueryParam) => {
  let param = new URLSearchParams()
  param.set('sortOrder',mapQueryPram.sortOrder)
  param.set('q',mapQueryPram.queryKey)
  if(mapQueryPram.minRating) {
    param.set('minRating',mapQueryPram.minRating.toString())
  }
  if(mapQueryPram.maxRating) {
    param.set('maxRating',mapQueryPram.maxRating.toString())
  }
  if(mapQueryPram.minNps) {
    param.set('minNps',mapQueryPram.minNps.toString())
  }
  if(mapQueryPram.maxNps) {
    param.set('maxNps',mapQueryPram.maxNps.toString())
  }
  if(mapQueryPram.minBpm) {
    param.set('minBpm',mapQueryPram.minBpm.toString())
  }
  if(mapQueryPram.maxBpm) {
    param.set('maxBpm',mapQueryPram.maxBpm.toString())
  }
  if(mapQueryPram.minDuration) {
    param.set('minDuration',mapQueryPram.minDuration.toString())
  }
  if(mapQueryPram.maxDuration) {
    param.set('maxDuration',mapQueryPram.maxDuration.toString())
  }
  if(mapQueryPram.from) {
    param.set('from',mapQueryPram.from)
  }
  if(mapQueryPram.to) {
    param.set('to',mapQueryPram.to)
  }
  if(mapQueryPram.tags) {
    param.set('tags',mapQueryPram.tags)
  }

  if(mapQueryPram.options) {
    const option = mapQueryPram.options
    if(option.autoMapper != undefined) {
      param.set('auto',option.autoMapper.toString())
    }
    if(option.curated) {
      param.set('curated', option.curated.toString())
    }
    if(option.cinema) {
      param.set('cinema', option.cinema.toString())
    }
    if(option.chroma) {
      param.set('chroma', option.chroma.toString())
    }
    if(option.noodle) {
      param.set('noodle', option.noodle.toString())
    }
    if(option.me) {
      param.set('me', option.me.toString())
    }
    if(option.fullSpread) {
      param.set('fullSpread', option.fullSpread.toString())
    }
    if(option.verified) {
      param.set('verified', option.verified.toString())
    }
    if(option.ranked) {
      param.set('ranked', option.ranked.toString())
    }
  }


  return param
}

const buildMapQueryParamFromSearchParam =  (searchParams:SearchParam) => {
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

  } as MapQueryParam

  if(toFloat(takeFirst('minRating'))) {
    param.minRating = toFloat(takeFirst('minRating'))
  }
  if(toFloat(takeFirst('minNps'))) {
    param.minNps = toFloat(takeFirst('minNps'))
  }
  if(toFloat(takeFirst('minBpm'))) {
    param.minBpm = toFloat(takeFirst('minBpm'))
  }
  if(toFloat(takeFirst('minDuration'))) {
    param.minDuration = toFloat(takeFirst('minDuration'))
  }
  if(toFloat(takeFirst('maxRating'))) {
    param.maxRating = toFloat(takeFirst('maxRating'))
  }
  if(toFloat(takeFirst('maxNps'))) {
    param.maxNps = toFloat(takeFirst('maxNps'))
  }
  if(toFloat(takeFirst('maxBpm'))) {
    param.maxBpm = toFloat(takeFirst('maxBpm'))
  }
  if(toFloat(takeFirst('maxDuration'))) {
    param.maxDuration = toFloat(takeFirst('maxDuration'))
  }
  if(takeFirst('from')) {
    param.from = takeFirst('from')
  }
  if(takeFirst('to')) {
    param.to = takeFirst('to')
  }
  if(takeFirst('tags')) {
    param.tags = takeFirst('tags')
  }
  if(takeFirst('auto')) {
    param.options = {
      ...param.options,
      autoMapper: takeFirst('auto') == 'true'
    }
  }
  if(takeFirst('curated')) {
    param.options = {
      ...param.options,
      curated: takeFirst('curated') == 'true'
    }
  }
  if(takeFirst('chroma')) {
    param.options = {
      ...param.options,
      chroma: takeFirst('chroma') == 'true'
    }
  }
  if(takeFirst('cinema')) {
    param.options = {
      ...param.options,
      cinema: takeFirst('cinema') == 'true'
    }
  }
  if(takeFirst('noodle')) {
    param.options = {
      ...param.options,
      noodle: takeFirst('noodle') == 'true'
    }
  }
  if(takeFirst('me')) {
    param.options = {
      ...param.options,
      me: takeFirst('me') == 'true'
    }
  }
  if(takeFirst('fullSpread')) {
    param.options = {
      ...param.options,
      fullSpread: takeFirst('fullSpread') == 'true'
    }
  }
  if(takeFirst('verified')) {
    param.options = {
      ...param.options,
      verified: takeFirst('verified') == 'true'
    }
  }
  if(takeFirst('ranked')) {
    param.options = {
      ...param.options,
      ranked: takeFirst('ranked') == 'true'
    }
  }
  return param
}
export interface FeatureOption {
  value:string,
  label:string,
  tooltip?:string,
}

export const BSMapQueryOptions:FeatureOption[] = [
  {
    value:"autoMapper",
    label:"AI",
    tooltip:"maybe mapped by AI",
  },
  {
    value:"curated",
    label:"Curated",
    tooltip:"Curated",
  },
  {
    value:"verified",
    label:"Verified",
    tooltip:"Verified",
  },
  {
    value:"chroma",
    label:"Chroma",
    tooltip:"Chroma",
  },
  {
    value:"cinema",
    label:"Cinema",
    tooltip:"Cinema",
  },
  {
    value:"noodle",
    label:"Noodle Extension",
    tooltip:"Noodle Extension",
  },
  {
    value:"me",
    label:"Mapping Extension",
    tooltip:"Mapping Extension",
  },
  {
    value:"ranked",
    label:"Ranked",
    tooltip:"only ranked maps",
  },
  {
    value:"fullSpread",
    label:"Full Spread",
    tooltip:"Full Spread",
  },

]
const BSMapQueryParam= {
  buildSearchParamFromMapQueryParam,
    buildMapQueryParamFromSearchParam
}
export default BSMapQueryParam