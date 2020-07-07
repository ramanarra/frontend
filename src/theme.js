import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "product-sans-regular, sans-serif",
    h1: {
      fontSize: 22,
      fontWeight: 700,
    },
    subtitle1: {
      fontFamily: "product-sans-bold, sans-serif",
      fontSize: 20,
      fontWeight: 600,
    },

    h4: {
      fontSize: 12,
    },

    h6: {
      fontSize: 11,
      color: '#d8d8d8'
    }
  },

  overrides: {
    MuiOutlinedInput: {
      root: {
        fontSize: 13,
        borderRadius: 0,
        "&$focused $notchedOutline": {
          borderColor: "#54cbff",
          borderWidth: 2,
          fontSize: '20 !important',
        },
      },
      input: { padding: "12px 14px" },
      notchedOutline: {
        borderColor: "#d8d8d8",
        "&$focused": { borderColor: "red" },
      },
    },

    MuiButton: {
      root: {
        padding: '8px 16px',
        borderRadius: 0,
      },
      containedPrimary: {
        color: '#ffffff',
        fontSize: 12,
      }
    }
  },

  palette: {
    primary: {
      main: "#0bb5ff",
    },
    secondary: {
      main: "#54cbff",
    },
  },
});

export default theme;
