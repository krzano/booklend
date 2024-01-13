import { ThemeProvider, createTheme, useTheme } from "@mui/material"
import { enUS as coreEnUS, plPL as corePlPL } from "@mui/material/locale"
import { useTranslation } from "react-i18next"
import {
  enUS as datePickerEnUS,
  plPL as datePickerPlPL,
} from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
interface MaterialUiLocalizationProviderProps {
  children: React.ReactNode
}

const MaterialUiLocalizationProvider = ({
  children,
}: MaterialUiLocalizationProviderProps) => {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const translatedTheme = createTheme(
    theme,
    i18n.language === "pl" ? corePlPL : coreEnUS,
    i18n.language === "pl" ? datePickerPlPL : datePickerEnUS,
  )
  return (
    <ThemeProvider theme={translatedTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={i18n.language === "pl" ? "pl" : undefined}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}
export default MaterialUiLocalizationProvider
