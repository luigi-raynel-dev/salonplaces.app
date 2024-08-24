import { SalonProps } from '@/helpers/salon'
import { Directions, Place } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

export interface AddressDisplayProps {
  salon: SalonProps
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({ salon }) => {
  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center">
        <Place />
        <Typography fontSize={16}>{salon.Location[0].address}</Typography>
      </Stack>
      <Stack alignItems="start">
        <a
          href={`http://maps.google.com?daddr=${salon.Location[0].address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button sx={{ gap: 1 }}>
            <Directions />
            Get directions
          </Button>
        </a>
      </Stack>
    </Stack>
  )
}
