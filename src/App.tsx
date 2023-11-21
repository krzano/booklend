import { RouterProvider } from "react-router-dom"
import router from "./routes/router"
import CssBaseline from "@mui/material/CssBaseline"
import { GlobalStyles } from "./styles/GlobalStyles"
import { Suspense } from "react"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { theme } from "./styles/theme"

function App() {
  return (
    <>
      <GlobalStyles />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<h2>Loading...</h2>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </>
  )
}

export default App
