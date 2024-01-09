# ABS:Another BeatSaver

## What is it?

[ABS](https://github.com/ktKongTong/abs) is just another front-end web page of [BeatSaver](https://beatsaver.com) built with Next.js.
 
it give an alternative way to browse BeatSaver.

## WIP
- [ ] i18n
- [ ] ui improvement
- [ ] beatsaver user ops
- [ ] more features

## Local Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

please note that you need provide a BASE_URL for it. cause it use a proxy(maybe cloudflare worker) to fetch data from BeatSaver and bypass CORS of beatsaver.com.

you can add .env.local file to root directory and add BASE_URL in it.

you also can fork and deploy it on your own server, or other serverless platform.

