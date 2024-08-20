import { LocationProps } from '@/helpers/salon'
import { CreditCard, LocalAtm, Payment, Pix } from '@mui/icons-material'
import { Chip, Stack } from '@mui/material'

export interface PaymentMethodsProps {
  location: LocationProps
}

export const PaymentMethodsChips: React.FC<PaymentMethodsProps> = ({
  location
}) => {
  const paymentMethods = [
    {
      name: 'creditCard',
      label: 'Credit card',
      icon: <CreditCard fontSize="small" />
    },
    {
      name: 'debitCard',
      label: 'Debit card',
      icon: <Payment fontSize="small" />
    },
    {
      name: 'cash',
      label: 'Cash',
      icon: <LocalAtm fontSize="small" />
    },
    {
      name: 'pix',
      label: 'Pix',
      icon: <Pix fontSize="small" />
    }
  ]

  return (
    <Stack direction="row" gap={2}>
      {paymentMethods
        .filter(({ name }) => {
          const key = name as keyof typeof location
          return location[key]
        })
        .map(paymentMethod => (
          <Chip key={paymentMethod.name} size="small" {...paymentMethod} />
        ))}
    </Stack>
  )
}
