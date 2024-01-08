import { useEffect, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import styled from "styled-components"
import { BASE_URL } from "@/constants/api"
import { BOOKS_PATH } from "@/constants/paths"
import { Book } from "@/types/api"
import {
  IconButton,
  Paper,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import defaultBookCoverImg from "@/assets/images/default-book.png"
import BookMenuButton from "../BookMenuButton/BookMenuButton"
import { useTranslation } from "react-i18next"
import truncateString from "@/utils/truncateString"

const ListViewBook = ({
  _id,
  title,
  author,
  rating,
  numberOfPages,
  photo,
}: Book) => {
  const { t } = useTranslation(["books"])
  const [imgSrcToRender, setImgSrcToRender] = useState(
    photo ? BASE_URL + photo : defaultBookCoverImg,
  )
  useEffect(() => {
    if (photo) {
      setImgSrcToRender(BASE_URL + photo)
    }
  }, [photo])
  return (
    <StyledListViewBook component="li" variant="outlined">
      <img
        src={imgSrcToRender}
        alt={title}
        onError={() => {
          setImgSrcToRender(defaultBookCoverImg)
        }}
      />
      <Stack justifyContent={"space-between"} spacing={2} flexGrow={1}>
        <Stack
          lineHeight={1.1}
          gap={1}
          fontFamily={(theme) => theme.otherFonts.serif}
        >
          <Typography
            component="h3"
            fontFamily="inherit"
            fontWeight={500}
            fontSize={24}
            lineHeight="inherit"
          >
            {truncateString(title, 40)}
          </Typography>
          <Typography
            component="h4"
            fontFamily="inherit"
            fontSize={20}
            lineHeight="inherit"
            textTransform="capitalize"
          >
            {author}
          </Typography>
        </Stack>
        <div>
          <Rating value={rating} precision={0.5} readOnly />
          <Typography>
            {t("books:pages")}: {numberOfPages}
          </Typography>
        </div>
      </Stack>
      <Stack justifyContent={"space-between"}>
        <BookMenuButton bookId={_id} />
        <Tooltip title={t("books:goToBook")} placement="left">
          <IconButton
            color="secondary"
            component={RouterLink}
            to={`${BOOKS_PATH}/${_id}`}
          >
            <ReadMoreIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </StyledListViewBook>
  )
}

const StyledListViewBook = styled(Paper)`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  height: 100%;
  overflow-x: auto;
  img {
    align-self: center;
    width: 7rem;
    aspect-ratio: 2/3;
    border-radius: 5px;
    object-fit: cover;
  }
`
export default ListViewBook
