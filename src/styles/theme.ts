import { ThemeOptions, createTheme } from "@mui/material/styles"

// declare module "@mui/material/styles" {
//   interface Theme {
//     typography: {
//       fontFamilySerif: string
//     }
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     typography: {
//       fontFamilySerif: string
//     }
//   }
// }

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
    // fontFamilySerif: "'Neuton', serif",
    button: {
      fontWeight: 500,
      // textTransform: "capitalize",
    },
  },
  shape: {
    borderRadius: 12,
  },
})
