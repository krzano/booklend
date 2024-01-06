import { RouterProvider } from "react-router-dom"
import router from "./routes/router"
import CssBaseline from "@mui/material/CssBaseline"
import { GlobalStyles } from "./styles/GlobalStyles"
import { Suspense } from "react"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import theme from "./styles/theme"
import CustomToastContainer from "./components/CustomToastContainer/CustomToastContainer"
import Loader from "./components/Loader/Loader"
import Box from "@mui/material/Box/Box"
import TranslatedThemeProvider from "./i18n/TranslatedThemeProvider"

function App() {
  return (
    <>
      <GlobalStyles />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <CustomToastContainer />
        <Suspense
          fallback={
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
                minHeight: "90vh",
              }}
            >
              <Loader showLogo />
            </Box>
          }
        >
          <TranslatedThemeProvider>
            <RouterProvider router={router} />
          </TranslatedThemeProvider>
        </Suspense>
      </ThemeProvider>
    </>
  )
}

export default App
