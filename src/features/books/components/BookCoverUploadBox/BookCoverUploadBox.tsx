import { Box, Divider, Typography } from "@mui/material"
import defaultBookImg from "@/assets/images/default-book.png"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

interface BookCoverUploadBoxProps {
  bookCoverImage: File | undefined
  coverImgSrc?: string
}
const BookCoverUploadBox = ({
  bookCoverImage,
  coverImgSrc,
}: BookCoverUploadBoxProps) => {
  const { t } = useTranslation(["books"])
  const [imgSrcToRender, setImgSrcToRender] = useState<string>(
    coverImgSrc ? coverImgSrc : defaultBookImg,
  )
  useEffect(() => {
    if (coverImgSrc) {
      setImgSrcToRender(coverImgSrc)
    } else {
      setImgSrcToRender(defaultBookImg)
    }
  }, [coverImgSrc])
  return (
    <StyledBookCoverUploadBox>
      <Box
        component="img"
        src={
          bookCoverImage ? URL.createObjectURL(bookCoverImage) : imgSrcToRender
        }
        onError={() => {
          setImgSrcToRender(defaultBookImg)
        }}
        sx={{
          width: 1,
          height: 1,
          objectFit: "cover",
        }}
      />
      {!bookCoverImage && !coverImgSrc && imgSrcToRender === defaultBookImg && (
        <StyledTextBox>
          <Typography
            fontSize={20}
            fontWeight={500}
            textTransform={"capitalize"}
          >
            {t("books:cover")}
          </Typography>
          <Divider />
          <Typography
            textTransform={"uppercase"}
            fontWeight={500}
            fontSize={12}
          >
            {t("common:chooseFile")}
          </Typography>
        </StyledTextBox>
      )}
    </StyledBookCoverUploadBox>
  )
}

const StyledBookCoverUploadBox = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  text-align: center;
  color: ${({ theme }) => theme.palette.grey[700]};
`
const StyledTextBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-content: center;
  gap: 0.8rem;
  padding: 2rem;
`

export default BookCoverUploadBox
