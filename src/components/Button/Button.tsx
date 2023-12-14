import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material"
import { useState } from "react"

// Fake async function
// await new Promise((resolve) => setTimeout(resolve, 2000))

interface ButtonProps extends MuiButtonProps {
  onClick?: () => void
  onAsyncClick?: () => Promise<void>
  isSubmitting?: boolean
}

const Button = ({
  onClick,
  onAsyncClick,
  isSubmitting,
  children,
  ...restProps
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
    if (onAsyncClick) {
      const handleAsyncClick = async () => {
        setIsLoading(true)
        try {
          await onAsyncClick()
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
      return handleAsyncClick()
    }
  }

  return (
    <MuiButton
      disabled={isLoading || isSubmitting}
      onClick={handleClick}
      {...restProps}
    >
      {children}
      {(isLoading || isSubmitting) && (
        <CircularProgress
          size={16}
          thickness={6}
          sx={{
            position: "absolute",
            // color: "inherit",
          }}
        />
      )}
    </MuiButton>
  )
}
export default Button
