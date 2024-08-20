import { LocationProps } from '@/helpers/salon'
import {
  Accessible,
  ChildCare,
  LocalParking,
  Tv,
  Wifi
} from '@mui/icons-material'
import { Chip, Stack } from '@mui/material'

export interface LocationResourcesProps {
  location: LocationProps
}

export const LocationResourcesChips: React.FC<LocationResourcesProps> = ({
  location
}) => {
  const resources = [
    {
      name: 'accessibility',
      label: 'Accessible',
      icon: <Accessible fontSize="small" />
    },
    {
      name: 'kid',
      label: 'Kid',
      icon: <ChildCare fontSize="small" />
    },
    {
      name: 'parking',
      label: 'Parking',
      icon: <LocalParking fontSize="small" />
    },
    {
      name: 'wifi',
      label: 'Wi-fi',
      icon: <Wifi fontSize="small" />
    },
    {
      name: 'tv',
      label: 'TV',
      icon: <Tv fontSize="small" />
    }
  ]

  return (
    <Stack direction="row" gap={2}>
      {resources
        .filter(({ name }) => {
          const key = name as keyof typeof location
          return location[key]
        })
        .map(resource => (
          <Chip key={resource.name} size="small" {...resource} />
        ))}
    </Stack>
  )
}
