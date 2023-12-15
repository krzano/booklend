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

export const theme: ThemeOptions = createTheme({
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
    fontFamily: "'Source Sans 3', sans-serif",
    allVariants: {
      fontFamily: "'Source Sans 3', sans-serif",
    },
    body1: { fontFamily: "'Source Sans 3', sans-serif" },
    body2: { fontFamily: "'Neuton', serif" },
    button: {
      fontWeight: 500,
      // textTransform: "capitalize",
    },
  },
  otherFonts: {
    serif: "'Neuton', serif",
  },
  shape: {
    borderRadius: 12,
  },
})
