import { AccessTime } from '@mui/icons-material'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

export const ServiceList: React.FC = () => {
  return (
    <Stack width="100%" gap={2}>
      <ServiceCardItem />
      <ServiceCardItem />
      <ServiceCardItem />
      <ServiceCardItem />
      <ServiceCardItem />
    </Stack>
  )
}

export const ServiceCardItem: React.FC = () => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack gap={1}>
            <Typography fontSize={20}>Serviço Lorem Ipsum</Typography>
            <Typography fontSize={16} color="GrayText">
              R$ 30
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <AccessTime />
              <Typography fontSize={16} color="GrayText">
                60 minutos
              </Typography>
            </Stack>
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
        </Stack>
      </CardContent>
    </Card>
  )
}
