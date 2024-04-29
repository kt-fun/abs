'use client'
import {Button} from "@/components/ui/button";
import {useTranslation} from "@/hooks/useTranslation";

export default function Home() {

  const {t} = useTranslation('page.oauth')

  return (
    <div className={'flex items-center justify-center'}>
      <a
        href={"https://beatsaver.com/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Faiobs.ktlab.io/oauth/beatsaver/callback&client_id=x3jTqSK932ZRn3kYvgJd&scope=identity alerts"}>
        <Button variant={'link'} className={'text-xl'}>
          {t("button")}
        </Button>
      </a>
    </div>
  )
}