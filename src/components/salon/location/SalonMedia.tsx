import React from 'react'
import { ImageCarousel } from '@/components/layout/ImageCarousel'
import { SalonMediaProps } from '@/helpers/salon'
import { Card, CardProps, Chip, Stack, StackProps } from '@mui/material'

export interface SalonMediaCard {
  height?: number | string | Record<string, string | number>
  media: SalonMediaProps
  slots?: {
    card?: CardProps
    stack?: StackProps
  }
  children?: React.ReactNode
}

export interface SalonMediaCarrousel {
  height?: number | string
  salonMedia: SalonMediaProps[]
}

export const MediaCard: React.FC<SalonMediaCard> = ({
  media,
  height = '400px',
  slots,
  children
}) => {
  return (
    <Card
      sx={{
        height,
        width: '100%',
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/salons/media/${media.url})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        ...slots?.card?.sx
      }}
      {...slots?.card}
    >
      <Stack height={height} width="100%" {...slots?.stack}>
        {children}
      </Stack>
    </Card>
  )
}

export const MediaCarrousel: React.FC<SalonMediaCarrousel> = ({
  salonMedia,
  height = '400px'
}) => {
  return (
    <ImageCarousel
      slots={{
        stack: {
          height,
          overflow: 'hidden'
        }
      }}
    >
      {salonMedia.map((media, index) => (
        <MediaCard
          key={media.id}
          media={media}
          height={height}
          slots={{
            stack: {
              direction: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 6,
              paddingBottom: 2
            }
          }}
        >
          {salonMedia.length > 1 && (
            <Chip
              label={`${index + 1}/${salonMedia.length}`}
              sx={{ background: 'white' }}
            />
          )}
        </MediaCard>
      ))}
    </ImageCarousel>
  )
}
