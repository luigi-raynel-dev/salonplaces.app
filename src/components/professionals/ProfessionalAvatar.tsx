import { stringAvatar } from '@/helpers/letterAvatar'
import { ProfessionalProps } from '@/helpers/salon'
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material'

export interface ProfessionalAvatarProps {
  professional: ProfessionalProps
}

export const ProfessionalAvatar: React.FC<ProfessionalAvatarProps> = ({
  professional
}) => {
  return (
    <Stack gap={1} alignItems="center">
      <Tooltip
        title={`${professional.user.firstName} ${professional.user.lastName}`}
        arrow
      >
        <IconButton>
          <Avatar
            {...stringAvatar(
              `${professional.user.firstName} ${professional.user.lastName}`
            )}
            sx={{ width: 60, height: 60 }}
            src={
              professional.user.avatarUrl
                ? `${process.env.NEXT_PUBLIC_API_URL}/salons/media/${professional.user.avatarUrl}`
                : undefined
            }
          />
        </IconButton>
      </Tooltip>
      <Typography>{`${professional.user.firstName}`}</Typography>
    </Stack>
  )
}
