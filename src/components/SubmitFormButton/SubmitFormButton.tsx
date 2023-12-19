import Button from "@/components/Button/Button"
import { ReactNode } from "react"

interface SubmitButtonProps {
  dirty: boolean
  isSubmitting: boolean
  children: ReactNode
}

const SubmitButton = ({ dirty, isSubmitting, children }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={!dirty || isSubmitting}
      isSubmitting={isSubmitting}
      fullWidth
      size="large"
    >
      {children}
    </Button>
  )
}
export default SubmitButton
