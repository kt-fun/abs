
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const formatTime = (time: string) => {
    dayjs.extend(relativeTime)
    return dayjs(time).fromNow()
}

export const formatDate = (time: Date | undefined, template?: string) => {
    if (!time) return undefined
    return dayjs(time).format(template ?? 'YYYY-MM-DD')
}
export const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export const formatNumber = (number: number) => {
    // 1.11w
    try {
        if (number > 10000) {
            return `${(number/1000.0).toFixed(1)}k`
        }
        // 1.11k
        if (number > 1000) {
            return `${(number/1000.0).toFixed(2)}k`
        }
        return number.toString()
    }catch(e) {
        return "0"
    }

}


export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}