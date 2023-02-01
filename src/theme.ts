import { createTheme } from '@mui/material'
import { teal } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[700],
    },
  },
})

export default theme;