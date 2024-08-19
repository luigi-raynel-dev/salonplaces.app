import { Circle } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
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

const weekdays: WeekdayNameType[] = Object.keys(Weekdays) as WeekdayNameType[]

export type WeekdayOpeningHoursType = {
  opening: string
  closing: string
}

export type OpeningHoursType = Record<
  WeekdayNameType,
  WeekdayOpeningHoursType | null
>

export interface OpeningHoursProps {
  openingHours?: OpeningHoursType | null
  isLoading?: boolean
}

export const OpeningHours: React.FC<OpeningHoursProps> = ({ openingHours }) => {
  return (
    <Stack gap={1}>
      {openingHours ? (
        <Stack gap={1}>
          {weekdays.map((weekday, index) => (
            <Stack
              key={weekday}
              direction="row"
              alignItems="center"
              gap={1}
              color={openingHours[weekday] ? undefined : 'InactiveCaptionText'}
              sx={{
                '> p': {
                  fontWeight: index === dayjs().day() ? 'bold' : undefined
                }
              }}
            >
              <Circle
                sx={{ fontSize: 12 }}
                color={openingHours[weekday] ? 'success' : 'disabled'}
              />
              <Typography>{Weekdays[weekday]}: </Typography>
              {openingHours[weekday] ? (
                <Typography>
                  {openingHours[weekday].opening} -{' '}
                  {openingHours[weekday].closing}
                </Typography>
              ) : (
                <Typography>Closed</Typography>
              )}
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography color="GrayText">Undefined Opening Hours</Typography>
      )}
    </Stack>
  )
}
