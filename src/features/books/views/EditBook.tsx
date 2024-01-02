import { BOOKS_PATH } from "@/constants/paths"
import Typography from "@mui/material/Typography/Typography"
import { Navigate, useParams } from "react-router-dom"

const EditBook = () => {
  const { bookId } = useParams()
  console.log(bookId)
  if (!bookId) return <Navigate to={BOOKS_PATH} />
  return (
    <Typography variant="h2" sx={{ overflowWrap: "break-word" }}>
      EditBook: {bookId}
    </Typography>
  )
}
export default EditBook
