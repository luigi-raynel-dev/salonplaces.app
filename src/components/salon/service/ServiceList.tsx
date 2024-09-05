import { useEffect, useState } from 'react'
import { SalonProps, SalonServiceProps } from '@/helpers/salon'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { publicApi } from '@/lib/axios'
export interface ServiceListProps {
  salon: SalonProps
}

export interface ServiceCardItemProps {
  service: SalonServiceProps
}

export const ServiceList: React.FC<ServiceListProps> = ({ salon }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState<SalonServiceProps[]>([])

  const getServices = async () => {
    try {
      setIsLoading(true)
      const response = await publicApi.get(`/salons/${salon.slug}/services`)
      if (response.data.services) setServices(response.data.services)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  return (
    <Stack gap={3} width="100%">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography fontSize={24}>Services</Typography>
        {!isLoading && <Chip label={services.length} size="small" />}
      </Stack>
      <Stack width="100%" gap={2}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ServiceCardItemSkeleton key={index} />
            ))
          : services.map(service => (
              <ServiceCardItem key={service.id} service={service} />
            ))}
      </Stack>
      {services.length > 10 && (
        <Stack alignItems="start">
          <Button
            variant="contained"
            sx={{
              color: 'black',
              background: 'white',
              fontWeight: '600',
              ':hover': {
                background: '#eee'
              }
            }}
          >
            See all services
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

export const ServiceCardItem: React.FC<ServiceCardItemProps> = ({
  service
}) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={1}>
            <Typography fontSize={20}>{service.title}</Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography fontSize={16} fontWeight={600}>
                € {service.price}
              </Typography>
              <Typography fontSize={14} color="GrayText">
                •
              </Typography>
              <Typography fontSize={14} color="GrayText">
                {service.minutes} minutes
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{
              background: 'black',
              ':hover': {
                background: '#141414'
              }
            }}
          >
            Book
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export const ServiceCardItemSkeleton: React.FC = () => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={1}>
            <Skeleton variant="text" sx={{ fontSize: 20 }} width={150} />
            <Stack direction="row" alignItems="center" gap={1}>
              <Skeleton variant="text" sx={{ fontSize: 16 }} width={50} />
              <Typography fontSize={14} color="GrayText">
                •
              </Typography>
              <Skeleton variant="text" sx={{ fontSize: 14 }} width={80} />
            </Stack>
          </Stack>
          <Button variant="contained" disabled>
            Book
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
