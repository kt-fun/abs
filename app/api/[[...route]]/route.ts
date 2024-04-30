import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import {getOauthKV} from "@/lib/kv";
import {BSMap} from "@/interfaces/render/beatsaver";

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

interface QueryMapByHashResponse {
  [hash: string]: BSMap
}

app.get('/beatleader/*', async (c)=> {
  //   /v3/scores/{hash}/{diff}/{mode}/{context}/{scope}/{method}
  const req = c.req.raw.clone()
  const url = new URL(c.req.url.replace('/api/beatleader',''))
  const afterUrl= c.req.url
    .replace('/api/beatleader','')
    .replace(url.origin, "https://api.beatleader.xyz")
  const res = await fetch(afterUrl, {
    ...req,
    headers: {
      "User-Agent": "ABS/0.0.3 (https://aiobs.ktlab.io)"
    }
  })
  return res

})

app.get('/render/player/:uid', async (c)=> {
  const {uid} = c.req.param()

  const items = [
    fetch(`https://scoresaber.com/api/player/${uid}/scores?page=1&sort=top`).then(res=>res.json()),
    fetch(`https://scoresaber.com/api/player/${uid}/scores?page=2&sort=top`).then(res=>res.json()),
    fetch(`https://scoresaber.com/api/player/${uid}/scores?page=3&sort=top`).then(res=>res.json()),
  ]

  const res = (await Promise.all(items)).map(item=>item["playerScores"]).flatMap(item=>item)
  const scoreHashes = res.map(item=>item.leaderboard.songHash)
  const maps = (await fetch(`https://api.beatsaver.com/maps/hash/${scoreHashes.join(",")}`).then(res=>res.json())) as QueryMapByHashResponse
  console.log("maps")
  const result = res.map(item=> ({
    score: item.score,
    leaderboard: item.leaderboard,
    mapId: maps[item.leaderboard.songHash.toLowerCase()]?.id,
  }))
  return c.json(result)
})

app.get('/render/player/:uid/full', async (c)=> {
  const {uid} = c.req.param()
  const platform = c.req.query('platform')
  // let url =

  const res = await fetch(`https://scoresaber.com/api/player/${uid}/full`)
  return res
})

app.get('/render/beatsaver/:id', async (c)=> {
  const {id} = c.req.param()
  const res = await fetch(`https://beatsaver.com/api/maps/id/${id}`)
  return res
})

app.get('/render/beatsaver/hash/:id', async (c)=> {
  const {id} = c.req.param()
  const res = await fetch(`https://beatsaver.com/api/maps/hash/${id}`)
  return res
})

app.get('/render/beatleader/:uid', async (c)=> {
  const {uid} = c.req.param()

  const res = await fetch(`https://api.beatleader.xyz/player/${uid}`)
  return res
})

app.get('/render/beatleader/score/:scoreid', async (c)=> {
  const {scoreid} = c.req.param()

  const res = await fetch(`https://api.beatleader.xyz/score/${scoreid}`)
  return res
})

app.get('/render/beatleader/:uid/scores', async (c)=> {
  const {uid} = c.req.param()
  const query = c.req.queries()
  if(!query['count']) {
    query['count'] = ["32"]
  }
  if(!query['sortBy']) {
    query['sortBy'] = ["pp"]
  }
  if(!query['order']) {
    query['order'] = ["desc"]
  }
  const q = Object.keys(query).map(item=> (query[item].map(it=>`${item}=${it}`).join("&"))).join("&")
  console.log('q',query)
  const url = `https://api.beatleader.xyz/player/${uid}/scores?` + q
  console.log(url)
  const res = await fetch(url)
  return res
})

app.get('/render/beatleader/:uid/pinnedScores', async (c)=> {
  const {uid} = c.req.param()
  const res = await fetch(`https://api.beatleader.xyz/player/${uid}/pinnedScores`)
  return res
})
app.get('/oauth/beatsaver/token/:code', async (c)=> {
  const {code} = c.req.param()
  const res = await getOauthKV(code)
  return c.json(res)
})

app.get('/oauth/beatsaver/:code', async (c)=> {
  const {code} = c.req.param()
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "AioSaber/0.0.2 (https://aiobs.ktlab.io)");
  const form = new FormData()
  form.append('client_id',process.env.BEATSAVER_CLIENT_ID as string)
  form.append('client_secret',process.env.BEATSAVER_CLIENT_SECRET as string)
  form.append('redirect_uri',process.env.BEATSAVER_REDIRECT_URL as string)
  form.append('code',code)
  form.append('grant_type','authorization_code')
  const res = await fetch('https://beatsaver.com/api/oauth2/token', {
    method: 'POST',
    headers: myHeaders,
    body: form,
    redirect: 'follow'
  })
  const json = await res.json()
  return c.json(json)
})

app.get('/*', async (c) => {
  const req = c.req.raw.clone()
  const url = new URL(c.req.url)
  const afterUrl= c.req.url.replace(url.origin, "https://beatsaver.com")
  const header = {
    ...c.req.header(),
    host: 'beatsaver.com',
    origin: "https://beatsaver.com",
  }

  req.headers.set('Host', 'beatsaver.com')
  req.headers.set('Origin', 'https://beatsaver.com')
  const res = await fetch(afterUrl, {
    ...req,
    headers: header
  })

  return res
})

export const GET = handle(app)
export const POST = handle(app)