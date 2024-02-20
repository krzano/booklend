import { Theme, createTheme } from "@mui/material/styles"

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

let theme: Theme = createTheme({
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

theme = createTheme(theme, {
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: theme.palette.secondary.light,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          "&::first-letter": { textTransform: "uppercase" },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          fontSize: 15,
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          fontSize: 15,
        },
      },
    },
    MuiChartsTooltip: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontSize: 14,
        },
      },
    },
  },
})

export default theme
