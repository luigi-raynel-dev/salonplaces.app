import { ImageCarousel } from '@/components/layout/ImageCarousel'
import { AddressDisplay } from '@/components/salon/about/AddressDisplay'
import {
  ContactAndSocial,
  ContactAndSocialList
} from '@/components/salon/about/ContactAndSocial'
import { SalonMap } from '@/components/salon/about/SalonMap'
import {
  OpeningHours,
  OpeningHoursStatus
} from '@/components/salon/location/OpeningHours'
import { LocationResourcesChips } from '@/components/salon/location/LocationResources'
import { ServiceList } from '@/components/salon/service/ServiceList'
import { stringAvatar } from '@/helpers/letterAvatar'
import { SalonProps } from '@/helpers/salon'
import { publicApi } from '@/lib/axios'
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { PaymentMethodsChips } from '@/components/salon/location/PaymentMethods'
import { ProfessionalAvatar } from '@/components/professionals/ProfessionalAvatar'
import { OpeningHoursType } from '@/helpers/openingHours'
export interface SalonResponseProps {
  salon?: SalonProps
}

export const getServerSideProps = (async context => {
  const { slug } = context.params!
  const response = await publicApi.get<SalonResponseProps>(`/salons/${slug}`)

  return { props: { salon: response.data.salon } }
}) satisfies GetServerSideProps<{ salon: SalonProps | undefined }>

export interface OpeningHoursResponse {
  openingHours?: OpeningHoursType | null
}

const Salon: NextPage<SalonResponseProps> = ({ salon }) => {
  const [openingHoursLoading, setOpeningHoursLoading] = useState(true)
  const [openingHours, setOpeningHours] = useState<OpeningHoursType | null>()

  const getOpeningHours = async () => {
    try {
      setOpeningHoursLoading(true)
      if (salon && salon.Location.length) {
        const response = await publicApi.get<OpeningHoursResponse>(
          `/salons/${salon.slug}/locations/${salon.Location[0].id}/openingHours`
        )

        if (response.data.openingHours !== undefined)
          setOpeningHours(response.data.openingHours)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setOpeningHoursLoading(false)
    }
  }

  useEffect(() => {
    getOpeningHours()
  }, [salon])

  return !salon || salon.Location.length === 0 ? (
    <div></div>
  ) : (
    <Container>
      <Stack py={4} gap={6}>
        <Stack gap={4}>
          <Typography variant="h1" fontSize={32} fontWeight="500">
            {salon.name}
          </Typography>
          <ImageCarousel>
            {salon.SalonMedia.map(media => (
              <Card
                key={media.id}
                sx={{
                  width: '100%',
                  height: '400px',
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/salons/media/${media.url})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              >
                <CardActionArea>
                  <Stack height={'400px'}></Stack>
                </CardActionArea>
              </Card>
            ))}
          </ImageCarousel>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Stack width="60%">
            <Stack gap={3} width="100%">
              <Typography fontSize={24}>Services</Typography>
              <ServiceList />
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
            </Stack>
          </Stack>
          <Card className="sticky top-0 h-full w-[40%]">
            <CardContent>
              <Stack gap={2}>
                <Stack direction="row" alignItems="center" gap={1}>
                  {salon.logoUrl && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/salons/media/${salon.logoUrl}`}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <Typography fontSize={24}>{salon.name}</Typography>
                </Stack>
                <AddressDisplay salon={salon} />
                <Button
                  variant="contained"
                  sx={{
                    background: 'black',
                    ':hover': {
                      background: '#141414'
                    }
                  }}
                >
                  Book Now
                </Button>
                <Divider />
                <OpeningHoursStatus
                  openingHours={openingHours}
                  isLoading={openingHoursLoading}
                />
                <ContactAndSocial salon={salon} />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>Team</Typography>
          <Stack direction="row" gap={2}>
            {salon.Location[0].LocationHasProfessional.map(
              ({ professional }) => (
                <ProfessionalAvatar
                  key={professional.id}
                  professional={professional}
                />
              )
            )}
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>About</Typography>
          <Typography whiteSpace="pre-line">{salon.description}</Typography>
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>Location</Typography>
          <Stack direction="row" width="100%">
            <div style={{ width: '50%', height: '100%' }}>
              <SalonMap salon={salon} className="h-72 w-full rounded-l-lg" />
            </div>
            <Card
              sx={{
                background: '#F8F8FA',
                width: '50%',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
            >
              <CardContent>
                <Stack width="100%" gap={1.5}>
                  <AddressDisplay salon={salon} />
                  <Divider>Payment methods</Divider>
                  <PaymentMethodsChips location={salon.Location[0]} />
                  <Divider>Informations</Divider>
                  <LocationResourcesChips location={salon.Location[0]} />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Stack>
        <Stack direction="row" width="100%">
          <Stack gap={2} width="45%">
            <Typography fontSize={24}>Opening Hours</Typography>
            <OpeningHours
              openingHours={openingHours}
              isLoading={openingHoursLoading}
            />
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ width: '5%' }} />
          <Stack gap={2} width="45%" pl={4}>
            <Typography fontSize={24}>Contacts and Socials</Typography>
            <ContactAndSocialList salon={salon} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Salon
