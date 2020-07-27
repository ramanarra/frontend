import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'product-sans-regular, sans-serif',
    h1: {
      fontSize: 22,
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: 'product-sans-bold, sans-serif',
      fontSize: 20,
      fontWeight: 600,
    },

    h3: {
      fontSize: 18,
    },

    h4: {
      fontSize: 12,
    },

    h5: {
      fontFamily : 'product-sans-medium, sans-serif',
      fontSize: 13,
    },

    h6: {
      fontSize: 11.6,
      color: '#d6d6d6',
    },
  },

  overrides: {
    MuiOutlinedInput: {
      root: {
        fontSize: 13,
        borderRadius: 0,
        color: '#9c9292',
        '&$focused $notchedOutline': {
          borderColor: '#54cbff',
          borderWidth: 2,
          fontSize: '20 !important',
        },
      },
      input: { padding: '12px 14px' },
      notchedOutline: {
        border: '1.2px solid',
        borderColor: '#f0f0f0',
        '&$focused': { borderColor: 'red' },
      },
      inputMarginDense : {
        paddingTop: 8.5,
        paddingBottom: 8.5,
      },
      inputAdornedEnd: {
        paddingRight: 14
      }
    },

    MuiButton: {
      root: {
        padding: '8px 16px',
        borderRadius: 0,
      },
      containedPrimary: {
        color: '#ffffff',
        fontSize: 12,
      },
    },
  },

  palette: {
    primary: {
      main: '#0bb5ff',
    },
    secondary: {
      main: '#54cbff',
    },
  },
})

export default theme
