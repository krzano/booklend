import Button from "@/components/Button/Button"
import Typography from "@mui/material/Typography/Typography"
import { toast } from "react-toastify"

const Overview = () => {
  return (
    <>
      <Typography variant="h4" component="h2">
        Welcome Nicola Tesla
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          toast.success("toast success message")
          toast.error("toast error message")
        }}
      >
        toast
      </Button>
    </>
  )
}
export default Overview
