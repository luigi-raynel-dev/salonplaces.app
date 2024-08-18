import { AccessTime } from '@mui/icons-material'
import { Stack } from '@mui/material'

export type WeekdayNameType =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'

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
    <Stack direction="row" gap={1}>
      <AccessTime />
      <Stack gap={1}>
        <Stack direction="row">{openingHours?.sunday?.opening}</Stack>
      </Stack>
    </Stack>
  )
}
