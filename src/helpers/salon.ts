export interface SalonProps {
  id: string
  countryPlanId: string | null
  cardIdForRecurrence: string | null
  name: string
  slug: string
  companyIdentifier: string | null
  holderIdentifier: string | null
  holder: string | null
  quotaProfessionals: number | null
  description: string
  cancellationPolicy: string | null
  active: boolean
  percentageDiscount: number
  logoUrl: string
  phone: string
  instagram: string | null
  tiktok: string | null
  facebook: string | null
  block: boolean
  blockReason: string | null
  recurrence: boolean
  planExpirationDate: string | null
  createdAt: string
  updatedAt: string
  Location: LocationProps[]
  SalonHasProfessional: SalonHasProfessionalProps[]
  SalonMedia: SalonMediaProps[]
}

export interface LocationProps {
  id: number
  salonId: string
  name: string | null
  active: boolean
  phone: string | null
  logoUrl: string | null
  zipCode: string
  latitude: string
  longitude: string
  address: string
  number: string
  complement: string | null
  referencePoint: string | null
  wifi: boolean
  kid: boolean
  accessibility: boolean
  parking: boolean
  tv: boolean
  debitCard: boolean
  creditCard: boolean
  cash: boolean
  pix: string | null
  otherPaymentTypes: string | null
  createdAt: string
  updatedAt: string
  LocationHasProfessional: LocationHasProfessionalProps[]
}

export interface LocationHasProfessionalProps {
  locationId: number
  professionalId: string
  commissionPercentage: number | null
  professional: ProfessionalProps
}

export interface ProfessionalProps {
  id: string
  userId: number
  bio: string | null
  online: boolean
  createdAt: string
  updatedAt: string
  user: UserProps
}

export interface UserProps {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  avatarUrl: string | null
  birthday: string | null
  phone: string
  genderId: number
  createdAt: string
  updatedAt: string
  gender: GenderProps
}

export interface GenderProps {
  id: number
  name: string
}

export interface SalonHasProfessionalProps {
  salonId: string
  professionalId: string
  isAdmin: boolean
  active: boolean
  createdAt: string
  updatedAt: string
  professional: ProfessionalProps
}

export interface SalonMediaProps {
  id: number
  url: string
  filename: string
  salonId: string
  order: number
  createdAt: string
}
