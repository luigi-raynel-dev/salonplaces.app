import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const TopBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'transparent',
          color: 'black',
          boxShadow: 0,
          borderBottom: '1px solid #ddd'
        }}
      >
        <Toolbar sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h2"
            fontSize={20}
            flexGrow={1}
            fontWeight={600}
            sx={{
              backgroundImage: 'linear-gradient(blueviolet, black)',
              backgroundClip: 'text',
              color: 'black',
              '-webkit-text-fill-color': 'transparent'
            }}
          >
            SalonPlaces
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
