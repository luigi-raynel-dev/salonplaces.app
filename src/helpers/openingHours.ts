import { getSystemLanguage } from '@/translations/language'
import dayjs from 'dayjs'

export const Weekdays = {
  sunday: 'Sunday',
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday'
} as const

export type WeekdayNameType = keyof typeof Weekdays

export const weekdays: WeekdayNameType[] = Object.keys(
  Weekdays
) as WeekdayNameType[]

export type WeekdayOpeningHoursType = {
  opening: string
  closing: string
  day?: number
}

export type OpeningHoursType = Record<
  WeekdayNameType,
  WeekdayOpeningHoursType | null
>

export type OpeningHoursStatusType = undefined | 'Closed' | 'Opened'

export type OpeningHoursInfoType = {
  status: OpeningHoursStatusType
  color: string
  helper: string | null
}

export const getNextOpenDay = (
  openingHours: OpeningHoursType,
  add = 1
): WeekdayOpeningHoursType | null => {
  const addedDays = add > 6 ? 0 : add
  const day = dayjs().day() + addedDays
  const weekday = weekdays[day]

  if (!openingHours[weekday])
    return addedDays === 0 ? null : getNextOpenDay(openingHours, day + 1)

  return {
    ...openingHours[weekday],
    day
  }
}

export const getHelperNextOpenDay = (
  weekdayOpeningHours: WeekdayOpeningHoursType | null
) => {
  let helper: string | null = null
  if (weekdayOpeningHours && weekdayOpeningHours.day) {
    const diff = weekdayOpeningHours.day - dayjs().day()
    helper = `opens ${
      diff === 1
        ? 'tomorrow'
        : `on ${Weekdays[weekdays[weekdayOpeningHours.day]]}`
    } at ${getFormatTime(weekdayOpeningHours.opening)}`
  }

  return helper
}

export const getStatus = (
  openingHours?: OpeningHoursType | null
): OpeningHoursInfoType => {
  if (!openingHours)
    return {
      status: undefined,
      color: 'red',
      helper: 'Undefined opening hours'
    }

  const weekday = weekdays[dayjs().day()]
  const now = dayjs()
  const day = now.format('YYYY-MM-DD')

  const nextOpenDay = getNextOpenDay(openingHours)
  const helper = getHelperNextOpenDay(nextOpenDay)

  if (!openingHours[weekday]) {
    return {
      status: 'Closed',
      color: 'orangered',
      helper
    }
  }

  const opening = dayjs(
    `${day} ${openingHours[weekday].opening}`,
    'YYYY-MM-DD HH:mm'
  )
  const closing = dayjs(
    `${day} ${openingHours[weekday].closing}`,
    'YYYY-MM-DD HH:mm'
  )

  if (now.isBefore(opening) || now.isAfter(closing)) {
    return {
      status: 'Closed',
      color: 'orangered',
      helper: now.isBefore(opening)
        ? `opens at ${getFormatTime(openingHours[weekday].opening)}`
        : helper
    }
  }

  return {
    status: 'Opened',
    color: 'green',
    helper: `closes at ${getFormatTime(openingHours[weekday].closing)}`
  }
}

export const getFormatTime = (time: string, format: 12 | 24 | null = null) => {
  const language = getSystemLanguage()

  if (language !== 'en' && format !== 12) return time

  let [hours, seconds] = time.split(':')
  let convertedHours = Number(hours)
  let shift: 'AM' | 'PM' =
    convertedHours >= 12 && convertedHours < 24 ? 'PM' : 'AM'

  if (convertedHours > 12) convertedHours -= 12

  return `${convertedHours}:${seconds} ${shift}`
}
