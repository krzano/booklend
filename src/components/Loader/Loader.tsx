import {
  CircularProgress,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material"
import styled from "styled-components"

interface LoaderProps {
  showLogo?: boolean
}

const Loader = ({ showLogo }: LoaderProps) => {
  const theme = useTheme()

  return (
    <StyledLoader>
      {showLogo ? (
        <>
          <Typography
            component="h1"
            fontSize="5rem"
            fontWeight="500"
            fontFamily={theme.otherFonts.serif}
            color="primary"
          >
            BookLend
          </Typography>
          <LinearProgress
            sx={{ width: "10rem", height: 10, borderRadius: 10 }}
          />
        </>
      ) : (
        <CircularProgress size="6rem" thickness={5} sx={{ opacity: 0.5 }} />
      )}
    </StyledLoader>
  )
}

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
`

export default Loader
