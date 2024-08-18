'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

export const SalonMap: React.FC = () => {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import('@/components/layout/Map').then(({ Map }) => Map), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )
  return (
    <div>
      <MapComponent />
    </div>
  )
}
