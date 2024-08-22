import {
  OpeningHoursType,
  getStatus,
  Weekdays,
  weekdays
} from '@/helpers/openingHours'
import { AccessTime, Circle } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
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

export const OpeningHoursStatus: React.FC<OpeningHoursProps> = ({
  openingHours
}) => {
  const weekday = weekdays[dayjs().day()]
  const { status, helper, color } = getStatus(openingHours)

  return openingHours ? (
    <Stack
      key={weekday}
      direction="row"
      alignItems="center"
      gap={0.5}
      color={openingHours[weekday] ? undefined : 'InactiveCaptionText'}
    >
      <AccessTime />
      <Typography fontWeight="bold" color={color}>
        {status}
      </Typography>
      <Typography>{helper}</Typography>
    </Stack>
  ) : (
    <Typography color="GrayText">Undefined Opening Hours</Typography>
  )
}
