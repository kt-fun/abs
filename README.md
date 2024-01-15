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


> [!IMPORTANT]
>You need provide a NEXT_PUBLIC_BASE_URL env for this. you can create an `.env.local` file to store it. it used to fetch data from BeatSaver and bypass CORS of beatsaver.com. you can create a proxy with cloudflare worker([example](docs/cf-worker.js))

you can add .env.local file to root directory and add NEXT_PUBLIC_BASE_URL in it.

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

