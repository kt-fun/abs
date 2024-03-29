import BSLabel, {LabelProps} from "@/components/shared/labels/BSLabel";
import {CiCalendarDate, CiStar, CiTimer} from "react-icons/ci";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {PiHeartbeat} from "react-icons/pi";
import {IoKeyOutline} from "react-icons/io5";
import {useLocaleFormat} from "@/hooks/useFormat";
import {useTranslation} from "@/hooks/useTranslation";

export const DateLabel = (
  {date,className,tooltip}:{date:string}& LabelProps
)=> {
  const {formatTime} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatTime(date)} className={className}  tooltip={tooltip}>
        <CiCalendarDate/>
      </BSLabel>
    </>
  )
}

export const DurationLabel = (
  {duration,className,tooltip}:{duration:number}& LabelProps
)=> {
  const {formatDuration} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatDuration(duration)} className={className}  tooltip={tooltip}>
        <CiTimer/>
      </BSLabel>
    </>
  )
}

export const BSRatingLabel = (
  {rate,className,tooltip}:{rate:number}& LabelProps
) => {
  const {t} = useTranslation('components.label')
  const tt =tooltip?? t('tooltip.score')
  return (
    <>
      <BSLabel label={`${(100*rate).toFixed(1)} %`} className={className} tooltip={tt}>
        <CiStar/>
      </BSLabel>
    </>
  )
}

export const ThumbUpCountLabel = (
  {count,className,tooltip}:{count:number}& LabelProps
) => {
  const {t} = useTranslation('components.label')
  const tt =tooltip?? t('tooltip.like')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <AiOutlineLike/>
      </BSLabel>
    </>
  )
}

export const ThumbDownCountLabel = (
  {count,className,tooltip}:{count:number}& LabelProps
) => {
  const {t} = useTranslation('components.label')
  const tt =tooltip?? t('tooltip.dislike')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <AiOutlineDislike/>
      </BSLabel>
    </>
  )
}


export const BSBPMLabel =(
  {bpm,className, tooltip}:{bpm:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt =tooltip?? t('tooltip.bpm')
  return (
    <>
      <BSLabel label={bpm.toFixed(0)}  className={className} tooltip={tt}>
        <PiHeartbeat/>
      </BSLabel>
    </>
  )
}

export const BSIDLabel = ({
  id,
  className,
  tooltip
}:{
  id:string
} & LabelProps) => {
  const {t} = useTranslation('components.label')
  const tt =tooltip?? t('tooltip.id')
  return (
    <>
      <BSLabel label={id}  className={className} tooltip={tt}>
        <IoKeyOutline/>
      </BSLabel>
    </>
  )
}