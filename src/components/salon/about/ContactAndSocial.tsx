import { SalonProps } from '@/helpers/salon'
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { TiktokLogo } from '@phosphor-icons/react'
import { parsePhoneNumber } from 'libphonenumber-js'

export interface ContactAndSocialProps {
  salon: SalonProps
}

const links = [
  {
    name: 'phone',
    getUrl: (phone: string) =>
      `https://api.whatsapp.com/send?phone=${phone.substring(1)}`,
    getLabel: (phone: string) => {
      const phoneNumber = parsePhoneNumber(phone)

      return phoneNumber.formatInternational()
    },
    icon: <WhatsApp />
  },
  {
    name: 'instagram',
    getUrl: (instagram: string) => `https://instagram.com/${instagram}`,
    getLabel: (instagram: string) => '@' + instagram,
    icon: <Instagram />
  },
  {
    name: 'facebook',
    getUrl: (facebook: string) => `https://facebook.com/${facebook}`,
    getLabel: (facebook: string) => '@' + facebook,
    icon: <Facebook />
  },
  {
    name: 'tiktok',
    getUrl: (tiktok: string) => `https://tiktok.com/${tiktok}`,
    getLabel: (tiktok: string) => '@' + tiktok,
    icon: <TiktokLogo />
  }
]

export const ContactAndSocial: React.FC<ContactAndSocialProps> = ({
  salon
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      {links
        .filter(({ name }) => {
          const key = name as keyof typeof salon
          return typeof salon[key] === 'string'
        })
        .map(link => {
          const key = link.name as keyof typeof salon
          const value = typeof salon[key] === 'string' ? salon[key] : ''
          return (
            <Tooltip key={link.name} title={link.getLabel(value)} arrow>
              <a
                href={link.getUrl(value)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton>{link.icon}</IconButton>
              </a>
            </Tooltip>
          )
        })}
    </Stack>
  )
}

export const ContactAndSocialList: React.FC<ContactAndSocialProps> = ({
  salon
}) => {
  return (
    <Stack gap={2}>
      {links
        .filter(({ name }) => {
          const key = name as keyof typeof salon
          return typeof salon[key] === 'string'
        })
        .map(link => {
          const key = link.name as keyof typeof salon
          const value = typeof salon[key] === 'string' ? salon[key] : ''
          return (
            <a
              href={link.getUrl(value)}
              target="_blank"
              rel="noopener noreferrer"
              key={key}
            >
              <Stack direction="row" gap={1}>
                {link.icon}
                {link.getLabel(value)}
              </Stack>
            </a>
          )
        })}
    </Stack>
  )
}
