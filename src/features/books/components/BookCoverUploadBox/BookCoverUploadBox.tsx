import { Box, Typography } from "@mui/material"
import defaultBookImg from "@/assets/images/default-book.png"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

interface BookCoverUploadBoxProps {
  bookCoverImage: File | undefined
}
const BookCoverUploadBox = ({ bookCoverImage }: BookCoverUploadBoxProps) => {
  const { t } = useTranslation()
  return (
    <StyledBookCoverUploadBox>
      <Box
        component="img"
        src={
          bookCoverImage ? URL.createObjectURL(bookCoverImage) : defaultBookImg
        }
        sx={{
          width: 1,
          height: 1,
          objectFit: "cover",
        }}
      />
      <StyledTypography
        fontFamily={(theme) => theme.otherFonts.serif}
        fontSize={18}
        color="primary"
      >
        {t("books:bookCover")}
      </StyledTypography>
    </StyledBookCoverUploadBox>
  )
}

const StyledBookCoverUploadBox = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  text-align: center;
`

const StyledTypography = styled(Typography)`
  position: absolute;
  left: 50%;
  top: 10%;
  translate: -50% -50%;
`

export default BookCoverUploadBox
