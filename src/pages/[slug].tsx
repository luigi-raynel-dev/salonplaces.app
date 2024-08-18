import { ImageCarousel } from '@/components/layout/ImageCarousel'
import { SalonMap } from '@/components/salon/about/SalonMap'
import { ServiceList } from '@/components/salon/service/ServiceList'
import { stringAvatar } from '@/helpers/letterAvatar'
import { SalonProps } from '@/helpers/salon'
import { publicApi } from '@/lib/axios'
import {
  Directions,
  Facebook,
  Instagram,
  Place,
  WhatsApp
} from '@mui/icons-material'
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
import { TiktokLogo } from '@phosphor-icons/react/dist/ssr'
import { GetServerSideProps, NextPage } from 'next'
export interface SalonResponseProps {
  salon?: SalonProps
}

export const getServerSideProps = (async context => {
  const { slug } = context.params!
  const response = await publicApi.get<SalonResponseProps>(`/salons/${slug}`)

  return { props: { salon: response.data.salon } }
}) satisfies GetServerSideProps<{ salon: SalonProps | undefined }>

const Salon: NextPage<SalonResponseProps> = ({ salon }) => {
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
              <Typography fontSize={24}>Os Serviços Mais Populares</Typography>
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
                <Stack direction="row" alignItems="center">
                  <Place />
                  <Typography fontSize={16}>
                    {salon.Location[0].address}
                  </Typography>
                </Stack>
                <Stack alignItems="start">
                  <Button sx={{ gap: 1 }}>
                    <Directions />
                    Como chegar
                  </Button>
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
                  Agendar
                </Button>
                <Divider>Contatos e Sociais</Divider>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  {salon.phone && (
                    <IconButton>
                      <WhatsApp />
                    </IconButton>
                  )}
                  {salon.instagram && (
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  )}
                  {salon.tiktok && (
                    <IconButton>
                      <TiktokLogo />
                    </IconButton>
                  )}
                  {salon.facebook && (
                    <IconButton>
                      <Facebook />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>Profissionais</Typography>
          <Stack direction="row" gap={3}>
            {salon.Location[0].LocationHasProfessional.map(
              ({ professional }) => (
                <Tooltip
                  title={`${professional.user.firstName} ${professional.user.lastName}`}
                >
                  <IconButton>
                    <Avatar
                      {...stringAvatar(
                        `${professional.user.firstName} ${professional.user.lastName}`
                      )}
                      sx={{ width: 100, height: 100 }}
                      src={
                        professional.user.avatarUrl
                          ? `${process.env.NEXT_PUBLIC_API_URL}/salons/media/${professional.user.avatarUrl}`
                          : undefined
                      }
                    />
                  </IconButton>
                </Tooltip>
              )
            )}
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>Sobre</Typography>
          {salon.description}
        </Stack>
        <Stack gap={2}>
          <Typography fontSize={24}>Endereço</Typography>
          <SalonMap />
        </Stack>
      </Stack>
    </Container>
  )
}

export default Salon
