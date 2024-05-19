'use client'
import {Button} from "@/components/ui/button";
import {useTranslation} from "@/hooks/useTranslation";

export default function Home() {

  const {t} = useTranslation('page.oauth')
  return (
    <div className={'flex items-center justify-center'}>
      <div className={'flex flex-col gap-2 items-center'}>
        <a
          href={"https://beatsaver.com/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Faiobs.ktlab.io/oauth/beatsaver/callback&client_id=x3jTqSK932ZRn3kYvgJd&scope=identity alerts"}>
          <Button variant={'default'} className={'text-xl'}>
            {t("button.beatsaver")}
          </Button>
        </a>
        <a
          href={"https://api.beatleader.xyz/oauth2/authorize?client_id=rkekosbggg8hhybiejg6&scope=profile%20clan%20offline_access&response_type=code&redirect_uri=https%3A%2F%2Faiobs.ktlab.io%2Foauth%2Fbeatleader"}>
          <Button variant={'default'} className={'text-xl'}>
            {t("button.beatleader")}
          </Button>
        </a>
      </div>
    </div>
  )
}