import Button from "@/components/Button/Button"
import { ReactNode } from "react"

interface ResetFormButtonProps {
  dirty: boolean
  isSubmitting: boolean
  resetForm: () => void
  children: ReactNode
}

const ResetFormButton = ({
  dirty,
  isSubmitting,
  resetForm,
  children,
}: ResetFormButtonProps) => {
  return (
    <Button
      color="error"
      variant="outlined"
      disabled={!dirty || isSubmitting}
      onClick={resetForm}
      fullWidth
      size="large"
    >
      {children}
    </Button>
  )
}
export default ResetFormButton
