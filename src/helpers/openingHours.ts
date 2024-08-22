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
  if (!openingHours[weekday])
    return {
      status: 'Closed',
      color: 'InactiveCaptionText',
      helper: 'opens tomorrow at 9:00'
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
    const info: OpeningHoursInfoType = {
      status: 'Closed',
      color: 'orangered',
      helper: null
    }

    if (now.isBefore(opening)) {
      info.helper = `opens at ${openingHours[weekday].opening}`
    } else {
      const nextOpenDay = getNextOpenDay(openingHours)
      if (nextOpenDay && nextOpenDay.day) {
        const diff = nextOpenDay.day - dayjs().day()
        info.helper = `opens ${
          diff === 1 ? 'tomorrow' : `on ${Weekdays[weekdays[nextOpenDay.day]]}`
        } at ${nextOpenDay.opening}`
      }
    }

    return info
  }

  return {
    status: 'Opened',
    color: 'green',
    helper: `closes at ${openingHours[weekday].closing}`
  }
}
