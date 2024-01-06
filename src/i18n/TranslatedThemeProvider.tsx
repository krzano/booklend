import { ThemeProvider, createTheme, useTheme } from "@mui/material"
import { enUS, plPL } from "@mui/material/locale"
import { useTranslation } from "react-i18next"

interface TranslatedThemeProviderProps {
  children: React.ReactNode
}
const TranslatedThemeProvider = ({
  children,
}: TranslatedThemeProviderProps) => {
  const { i18n } = useTranslation()
  const theme = useTheme()
  const translatedTheme = createTheme(
    theme,
    i18n.language === "pl" ? plPL : enUS,
  )
  return <ThemeProvider theme={translatedTheme}>{children}</ThemeProvider>
}
export default TranslatedThemeProvider
