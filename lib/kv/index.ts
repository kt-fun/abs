import {Redis} from "@upstash/redis";
import {customAlphabet} from "nanoid";
const nanoid = customAlphabet('ABCDEF1234567890', 12);
const redis = new Redis({
  url: process.env.UPSTASH_KV_URL as string,
  token: process.env.UPSTASH_KV_TOKEN as string,
})

export enum OAuthPlatform {
  BeatLeader="beatleader",
  BeatSaver = 'beatsaver'
}

export type OAuthPlatformField = 'beatleader'|'beatsaver'

export default async function setOauthKV(OauthInfo: any,platform:OAuthPlatform) {
  let id = nanoid()
  let res =  await redis.get(`aiobs:oauth:${platform}:${id}`)
  if(!res) {
    id = nanoid()
  }
  redis.set(`aiobs:oauth:${platform}:${id}`, OauthInfo, {
    ex:  3600 * 24,
  })
  return id
}

export function getOauthKV(key: string,platform:OAuthPlatform) {
  return redis.get(`aiobs:oauth:${platform}:${key}`)
}