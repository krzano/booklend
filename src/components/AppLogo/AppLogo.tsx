import logo from "@/assets/images/logo.svg"
import { Box, BoxProps } from "@mui/material"

const AppLogo = (props: Omit<BoxProps, "component">) => {
  return <Box {...props} component="img" src={logo} alt="BookLend logo" />
}
export default AppLogo
