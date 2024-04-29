import config from "@/lib/config";
import setOauthKV from "@/lib/kv";

type SearchParam = { [key: string]: string | string[] | undefined }


const BASE_URL = config.constants.BASE_URL
console.log("BASE_URL",config.constants.BASE_URL)

interface OAuthResponse {
  code: string,
  expireAt: string
}

async function getCode(code:string) {
  const url = `${BASE_URL}/api/oauth/beatsaver/${code}`
  const res = await fetch(url).then(res=> res.json())

  const key = setOauthKV(res)
  return {
    code: await key,
    expireAt: "now",
  }
}

export default async function Home(
{
  searchParams,
}:{
  searchParams:SearchParam
}
) {
  const code = searchParams['code'] as string
  const resp = await getCode(code)

  return (
    <div className={'flex items-center justify-center'}>
      this is a tmp code for bsbot: {resp.code}
    </div>
  )
}