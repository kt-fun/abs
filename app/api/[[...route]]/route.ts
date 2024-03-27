import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

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
      "User-Agent": "ABS/0.0.3 (https://abs.ktlab.io)"
    }
  })
  return res

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