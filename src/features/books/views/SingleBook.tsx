import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const SingleBook = () => {
  const { bookId } = useParams()
  return (
    <Typography variant="h2" sx={{ overflowWrap: "break-word" }}>
      SingleBook: {bookId}
    </Typography>
  )
}
export default SingleBook
