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
import { SalonProps } from '@/helpers/salon'
import { publicApi } from '@/lib/axios'
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { PaymentMethodsChips } from '@/components/salon/location/PaymentMethods'
import { ProfessionalAvatar } from '@/components/professionals/ProfessionalAvatar'
import { OpeningHoursType } from '@/helpers/openingHours'
import * as SalonMedia from '@/components/salon/location/SalonMedia'
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
    <Stack gap={1}>
      <Stack gap={2} display={{ xs: 'flex', md: 'none' }}>
        <SalonMedia.MediaCarrousel salonMedia={salon.SalonMedia} height={250} />
      </Stack>
      <Container>
        <Stack py={4} gap={6}>
          <Stack gap={4} display={{ xs: 'none', md: 'flex' }}>
            <Typography
              variant="h1"
              fontSize={40}
              fontWeight="700"
              display={{ xs: 'none', md: 'block' }}
            >
              {salon.name}
            </Typography>
            <SalonMedia.MediaCarrousel salonMedia={salon.SalonMedia} />
          </Stack>
          <Stack gap={2} display={{ xs: 'flex', md: 'none' }}>
            <Typography variant="h1" fontSize={32} fontWeight="700">
              {salon.name}
            </Typography>
            <OpeningHoursStatus
              openingHours={openingHours}
              isLoading={openingHoursLoading}
            />
            <AddressDisplay salon={salon} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Stack
              width={{
                xs: '100%',
                md: '60%'
              }}
            >
              <ServiceList salon={salon} />
            </Stack>
            <Card
              className="sticky top-0 h-full w-[40%]"
              sx={{
                display: {
                  xs: 'none',
                  md: 'block'
                }
              }}
            >
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
            <Stack direction={{ xs: 'column', md: 'row' }} width="100%">
              <Stack
                width={{
                  xs: '100%',
                  md: '50%'
                }}
                height="100%"
              >
                <SalonMap salon={salon} className="h-72 w-full rounded-l-lg" />
              </Stack>
              <Card
                sx={{
                  background: '#F8F8FA',
                  width: {
                    xs: '100%',
                    md: '50%'
                  },
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: {
                    xs: 0,
                    md: undefined
                  },
                  borderBottomLeftRadius: {
                    xs: undefined,
                    md: 0
                  }
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
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            width="100%"
            gap={{
              xs: 2,
              md: 0
            }}
          >
            <Stack
              gap={2}
              width={{
                xs: '100%',
                md: '45%'
              }}
            >
              <Typography fontSize={24}>Opening Hours</Typography>
              <OpeningHours
                openingHours={openingHours}
                isLoading={openingHoursLoading}
              />
            </Stack>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                width: {
                  xs: '100%',
                  md: '5%'
                }
              }}
            />
            <Stack
              gap={2}
              width={{
                xs: '100%',
                md: '45%'
              }}
              pl={{
                xs: 0,
                md: 4
              }}
            >
              <Typography fontSize={24}>Contacts and Socials</Typography>
              <ContactAndSocialList salon={salon} />
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="sticky bottom-0 w-full bg-white border-t border-gray-300 z-[99999]"
        p={1}
        sx={{
          display: { md: 'none' }
        }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {salon.logoUrl && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/salons/media/${salon.logoUrl}`}
              className="w-8 h-8 rounded-full"
            />
          )}
          <Typography fontWeight={600}>{salon.name}</Typography>
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
          Book Now
        </Button>
      </Stack>
    </Stack>
  )
}

export default Salon
