import {Redis} from "@upstash/redis";
import {customAlphabet} from "nanoid";
const nanoid = customAlphabet('ABCDEF1234567890', 12);
const redis = new Redis({
  url: process.env.UPSTASH_KV_URL as string,
  token: process.env.UPSTASH_KV_TOKEN as string,
})

export default async function setOauthKV(OauthInfo: any) {
  let id = nanoid()
  let res =  await redis.get(`aiobs:oauth:beatsaver:${id}`)
  if(!res) {
    id = nanoid()
  }
  redis.set(`aiobs:oauth:beatsaver:${id}`, OauthInfo, {
    ex:  3600 * 24,
  })
  return id
}

export function getOauthKV(key: string) {
  return redis.get(`aiobs:oauth:beatsaver:${key}`)
}