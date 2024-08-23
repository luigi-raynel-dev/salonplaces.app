import {
  OpeningHoursType,
  getStatus,
  Weekdays,
  weekdays,
  getFormatTime
} from '@/helpers/openingHours'
import { AccessTime, Circle } from '@mui/icons-material'
import { Skeleton, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

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
                  {getFormatTime(openingHours[weekday].opening)} -{' '}
                  {getFormatTime(openingHours[weekday].closing)}
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

export const OpeningHoursStatus: React.FC<OpeningHoursProps> = ({
  openingHours,
  isLoading
}) => {
  const weekday = weekdays[dayjs().day()]
  const { status, helper, color } = getStatus(openingHours)

  return (
    <Stack key={weekday} direction="row" alignItems="center" gap={1}>
      <AccessTime />
      {isLoading ? (
        <Skeleton width="250px" variant="text" sx={{ fontSize: '1rem' }} />
      ) : (
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography fontWeight="bold" color={color}>
            {status}
          </Typography>
          <Typography>{helper}</Typography>
        </Stack>
      )}
    </Stack>
  )
}
