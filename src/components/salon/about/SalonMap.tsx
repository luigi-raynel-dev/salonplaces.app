'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { SalonProps } from '@/helpers/salon'

export interface SalonMapProps {
  salon: SalonProps
  className?: string
}

export const SalonMap: React.FC<SalonMapProps> = ({ salon, className }) => {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import('@/components/layout/Map').then(({ Map }) => Map), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    [salon]
  )

  return (
    <div>
      {salon.Location.length > 0 && (
        <MapComponent
          position={[
            Number(salon.Location[0].latitude),
            Number(salon.Location[0].longitude)
          ]}
          popup={salon.name}
          className={className}
        />
      )}
    </div>
  )
}
