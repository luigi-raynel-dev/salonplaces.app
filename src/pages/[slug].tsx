import { SalonProps } from '@/helpers/salon'
import { publicApi } from '@/lib/axios'
import { Container, Stack, Typography } from '@mui/material'
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
      <Stack>
        <Stack>
          <Typography variant="h2">{salon.name}</Typography>
          <Stack direction="row" gap={4} maxHeight={500}>
            <Stack gap={2} width="60%" height={'100%'}>
              {salon.SalonMedia.filter((_, index) => index === 0).map(media => (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/salons/media/${media.url}`}
                  alt={media.filename}
                  className="w-full h-full rounded-lg"
                />
              ))}
            </Stack>
            <Stack width="40%" height={500} gap={2}>
              {salon.SalonMedia.filter((_, index) => index > 0).map(media => (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/salons/media/${media.url}`}
                  alt={media.filename}
                  className="w-full rounded-lg object-cover h-[215px]"
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Salon
