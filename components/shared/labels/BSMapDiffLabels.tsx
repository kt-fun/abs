import BSLabel, {LabelProps} from "@/components/shared/labels/BSLabel";
import {formatNumber} from "@/lib/format";
import {GiBoltBomb} from "react-icons/gi";
import {PiWall} from "react-icons/pi";
import {IoSpeedometerOutline} from "react-icons/io5";
import {FaHighlighter} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {CiWarning} from "react-icons/ci";

export const BSBombCountLabel = (
  {count,className, tooltip = "bomb count"}:{count:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <GiBoltBomb/>
      </BSLabel>
    </>
  )
}

export const BSNoteCountLabel = (
  {count,className, tooltip = "note count"}:{count:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <GiBoltBomb/>
      </BSLabel>
    </>
  )
}

export const BSObstacleCountLabel = (
  {count,className, tooltip = "obstacle count"}:{count:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <PiWall/>
      </BSLabel>
    </>
  )
}

export const BSLightCountLabel = (
  {count,className, tooltip = "light event count"}:{count:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <FaHighlighter/>
      </BSLabel>
    </>
  )
}


export const BSNJSLabel = (
  {njs,className, tooltip = "map note jump speed"}:{njs:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={njs.toFixed(2)} className={className} tooltip={tooltip}>
        <IoSpeedometerOutline/>
      </BSLabel>
    </>
  )
}

export const BSNPSLabel = (
  {nps,className, tooltip = "map note per second"}:{nps:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={nps.toFixed(2)} className={className} tooltip={tooltip}>
        <IoSpeedometerOutline/>
      </BSLabel>
    </>
  )
}
export const BSMapParityErrorLabel = (
  {count,className, tooltip = "map parity error count"}:{count:number} & LabelProps
)=>{
    return (
      <>
        <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
          <RxCross2/>
        </BSLabel>
      </>
    )
}


export const BSMapParityWarningLabel = (
  {count,className, tooltip = "map parity warning count"}:{count:number} & LabelProps
)=>{
  return (
    <>
      <BSLabel label={formatNumber(count)} className={className} tooltip={tooltip}>
        <CiWarning/>
      </BSLabel>
    </>
  )
}