import { ImageCarousel } from '@/components/layout/ImageCarousel'
import { ServiceList } from '@/components/salon/service/ServiceList'
import { SalonProps } from '@/helpers/salon'
import { publicApi } from '@/lib/axios'
import { AccessTime } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography
} from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'

export interface SalonResponseProps {
  salon?: SalonProps
}

export const getServerSideProps = (async context => {
  const { slug } = context.params!
  const response = await publicApi.get<SalonResponseProps>(`/salons/${slug}`)

  return { props: { salon: response.data.salon } }
}) satisfies GetServerSideProps<{ salon: SalonProps | undefined }>

const Salon: NextPage<SalonResponseProps> = ({ salon }) => {
  return !salon ? (
    <div></div>
  ) : (
    <Container>
      <Stack py={4} gap={6}>
        <Stack gap={2}>
          <Typography variant="h1" fontSize={32} fontWeight="500">
            {salon.name}
          </Typography>
          <ImageCarousel>
            {salon.SalonMedia.map(media => (
              <Card
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
              <Typography fontSize={24}>Serviços populares</Typography>
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
                  Ver todos os serviços
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Card className="sticky top-0 h-full w-[40%]">
            <CardContent>
              <Stack>
                <Typography fontSize={24}>{salon.name}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    background: 'black',
                    ':hover': {
                      background: '#141414'
                    }
                  }}
                >
                  Agendar
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Salon
