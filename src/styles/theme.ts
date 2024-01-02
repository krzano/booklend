import { ThemeOptions, createTheme } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Theme {
    otherFonts: {
      serif: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    otherFonts: {
      serif: string
    }
  }
}

const theme: ThemeOptions = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#311d13",
    },
    secondary: {
      main: "#99592a",
    },
    background: {
      default: "#ffffff",
      paper: "#fffaf6",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "'Source Sans 3', sans-serif",
    allVariants: {
      fontFamily: "'Source Sans 3', sans-serif",
    },
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    body1: { fontFamily: "'Source Sans 3', sans-serif" },
    body2: { fontFamily: "'Vollkorn', serif" },
    button: {
      fontWeight: 500,
    },
  },
  otherFonts: {
    serif: "'Vollkorn', serif",
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme
