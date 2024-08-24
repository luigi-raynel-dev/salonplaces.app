import { Button, Card, CardContent, Stack, Typography } from '@mui/material'

export const ServiceList: React.FC = () => {
  return (
    <Stack width="100%" gap={2}>
      <ServiceCardItem key={1} />
      <ServiceCardItem key={2} />
      <ServiceCardItem key={3} />
      <ServiceCardItem key={4} />
      <ServiceCardItem key={5} />
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
            <Typography fontSize={14} color="GrayText">
              60 minutos
            </Typography>
            <Typography fontSize={16} fontWeight={600}>
              R$ 30
            </Typography>
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
            Book
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}
