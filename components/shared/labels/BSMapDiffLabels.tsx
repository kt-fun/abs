import BSLabel, {LabelProps} from "@/components/shared/labels/BSLabel";
import {GiBoltBomb} from "react-icons/gi";
import {PiWall} from "react-icons/pi";
import {IoSpeedometerOutline} from "react-icons/io5";
import {FaHighlighter} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {CiWarning} from "react-icons/ci";
import {useLocaleFormat} from "@/hooks/useFormat";
import {useTranslation} from "@/hooks/useTranslation";

export const BSBombCountLabel = (
  {count,className, tooltip }:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.bomb-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <GiBoltBomb/>
      </BSLabel>
    </>
  )
}

export const BSNoteCountLabel = (
  {count,className, tooltip}:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.note-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <GiBoltBomb/>
      </BSLabel>
    </>
  )
}

export const BSObstacleCountLabel = (
  {count,className, tooltip}:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.obstacle-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <PiWall/>
      </BSLabel>
    </>
  )
}

export const BSLightCountLabel = (
  {count,className, tooltip}:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.light-event-amount')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <FaHighlighter/>
      </BSLabel>
    </>
  )
}


export const BSNJSLabel = (
  {njs,className, tooltip}:{njs:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.njs')
  return (
    <>
      <BSLabel label={njs.toFixed(2)} className={className} tooltip={tt}>
        <IoSpeedometerOutline/>
      </BSLabel>
    </>
  )
}

export const BSNPSLabel = (
  {nps,className, tooltip}:{nps:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.nps')
  return (
    <>
      <BSLabel label={nps.toFixed(2)} className={className} tooltip={tt}>
        <IoSpeedometerOutline/>
      </BSLabel>
    </>
  )
}
export const BSMapParityErrorLabel = (
  {count,className, tooltip}:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.parity-error')
  const {formatNumber} = useLocaleFormat()
    return (
      <>
        <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
          <RxCross2/>
        </BSLabel>
      </>
    )
}


export const BSMapParityWarningLabel = (
  {count,className, tooltip}:{count:number} & LabelProps
)=>{
  const {t} = useTranslation('components.label')
  const tt = tooltip ?? t('tooltip.parity-warning')
  const {formatNumber} = useLocaleFormat()
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tt}>
        <CiWarning/>
      </BSLabel>
    </>
  )
}