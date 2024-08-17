import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'

export const TopBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: 'transparent', color: 'black' }}
      >
        <Toolbar>
          <Typography
            variant="h2"
            fontSize={30}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            SalonPlaces
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
