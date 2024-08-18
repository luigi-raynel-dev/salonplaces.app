'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

export interface MapProps {
  position: LatLngExpression
  popup?: React.ReactNode
  className?: string
  zoom?: number
}

export const Map: React.FC<MapProps> = ({
  position,
  popup,
  className,
  zoom = 13
}) => {
  return (
    <MapContainer center={position} zoom={zoom} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {popup && (
        <Marker position={position}>
          <Popup>{popup}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
