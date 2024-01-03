import { Book } from "@/types/api"
import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import CardMedia from "@mui/material/CardMedia/CardMedia"
import Card from "@mui/material/Card/Card"
import Typography from "@mui/material/Typography/Typography"
import CardContent from "@mui/material/CardContent/CardContent"
import defaultBookCoverImg from "@/assets/images/default-book.png"
import { BASE_URL } from "@/constants/api"
import { Chip, Rating, Stack } from "@mui/material"
import BookMenuButton from "../BookMenuButton/BookMenuButton"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"
import { BOOKS_PATH } from "@/constants/paths"
import Button from "@/components/Button/Button"
import firstLetterToUppercase from "@/utils/firstLetterToUppercase"
import truncateString from "@/utils/truncateString"

const GridViewBook = ({
  _id,
  title,
  author,
  description,
  genre,
  numberOfPages,
  rating,
  photo,
}: Book) => {
  const { t } = useTranslation(["genres", "books"])
  const [imgSrcToRender, setImgSrcToRender] = useState(
    photo ? BASE_URL + photo : defaultBookCoverImg,
  )
  useEffect(() => {
    if (photo) {
      setImgSrcToRender(BASE_URL + photo)
    }
  }, [photo])
  return (
    <StyledGridViewBookCard component="li" variant="outlined">
      <StyledBookMenuButtonBox>
        <BookMenuButton bookId={_id} />
      </StyledBookMenuButtonBox>
      <CardMedia
        component="img"
        src={imgSrcToRender}
        alt={title}
        onError={() => {
          setImgSrcToRender(defaultBookCoverImg)
        }}
        height={200}
      />
      <StyledCardContent>
        <Stack
          spacing={1}
          fontFamily={(theme) => theme.otherFonts.serif}
          lineHeight={1.1}
        >
          <Typography
            component="h3"
            variant="h4"
            fontFamily="inherit"
            lineHeight="inherit"
          >
            {truncateString(title, 40)}
          </Typography>
          <Typography
            component="h4"
            variant="h5"
            fontFamily="inherit"
            lineHeight="inherit"
            textTransform="capitalize"
          >
            {author}
          </Typography>
        </Stack>
        <Stack spacing={1.5}>
          <Rating value={rating} readOnly precision={0.5} />
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {genre.map((genre) => (
              <Chip key={genre} label={t(`genres:${genre}`)} />
            ))}
          </Stack>
          <Typography>
            {firstLetterToUppercase(t(`books:pages`))}: {numberOfPages}
          </Typography>
          <Typography>
            {firstLetterToUppercase(t(`books:description`))}:
            <br />
            {truncateString(description, 100)}
          </Typography>
        </Stack>
      </StyledCardContent>
      <StyledBottomButtonBox>
        <Button
          color="secondary"
          variant="text"
          {...{ component: RouterLink, to: `${BOOKS_PATH}/${_id}` }}
        >
          {t(`books:goToBook`)}
        </Button>
      </StyledBottomButtonBox>
    </StyledGridViewBookCard>
  )
}

const StyledGridViewBookCard = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 30rem;
  .MuiChip-label::first-letter {
    text-transform: uppercase;
  }
`

const StyledBookMenuButtonBox = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    border-radius: 50%;
    background-color: ${theme.palette.background.paper};
    border: 1px solid ${theme.palette.grey[400]};
  `}
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const StyledBottomButtonBox = styled.div`
  margin-top: auto;
  display: grid;
  place-content: center;
  padding-bottom: 1rem;
`

export default GridViewBook
