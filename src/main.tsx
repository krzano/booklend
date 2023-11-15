import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
// import "normalize.css"
import CssBaseline from "@mui/material/CssBaseline"
import { store } from "./app/store"
import App from "./App"
import { GlobalStyles } from "./styles/GlobalStyles"
import "./i18n/config"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
)
