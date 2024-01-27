import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Box,
  Chip,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { getSingleBook } from "../booksThunk"
import Loader from "@/components/Loader/Loader"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import { BOOKS_PATH } from "@/constants/paths"
import styled from "styled-components"
import defaultBookImg from "@/assets/images/default-book.png"
import { BASE_URL } from "@/constants/api"
import truncateString from "@/utils/truncateString"
import Button from "@/components/Button/Button"
import { useTranslation } from "react-i18next"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import LendBookSection from "@/features/lendBook/components/LendBookSection/LendBookSection"

const DESCRIPTION_VISIBLE_LENGTH = 200
const Description = ({ description }: { description: string }) => {
  const { t } = useTranslation()

  const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
  return (
    <Typography>
      <StyledSpan>{t("books:description")}:</StyledSpan>
      <br />
      {description.length > DESCRIPTION_VISIBLE_LENGTH ? (
        <>
          {showFullDescription
            ? description
            : truncateString(description, DESCRIPTION_VISIBLE_LENGTH)}
          <span>
            <Button
              size="small"
              variant="text"
              color="secondary"
              onClick={() => {
                setShowFullDescription((prev) => !prev)
              }}
            >
              {showFullDescription
                ? t("common:showLess")
                : t("common:showMore")}
            </Button>
          </span>
        </>
      ) : (
        description
      )}
    </Typography>
  )
}

const SingleBook = () => {
  const { t } = useTranslation(["books", "genres"])
  const { bookId } = useParams()
  const dispatch = useAppDispatch()
  const { status, singleBook } = useAppSelector((store) => store.books)
  const [imgSrcToRender, setImgSrcToRender] = useState(defaultBookImg)

  useEffect(() => {
    if (bookId) {
      dispatch(getSingleBook(bookId))
    }
  }, [bookId, dispatch])

  useEffect(() => {
    if (singleBook && singleBook.photo)
      setImgSrcToRender(BASE_URL + singleBook.photo)
  }, [singleBook])

  if (!bookId) return <Navigate to={BOOKS_PATH} />
  return status === "loading" ? (
    <Loader />
  ) : status === "failed" ? (
    <DataFetchingError
      refreshFunction={() => {
        dispatch(getSingleBook(bookId))
      }}
    />
  ) : singleBook ? (
    <Grid container spacing={4}>
      <Grid item xs={12} md={"auto"}>
        <StyledCoverImageBox>
          <img
            src={imgSrcToRender}
            alt={singleBook.title}
            onError={() => {
              setImgSrcToRender(defaultBookImg)
            }}
          />
        </StyledCoverImageBox>
      </Grid>
      <Grid container item md spacing={1}>
        <Grid
          item
          xs={12}
          textAlign={{ xs: "center", md: "left" }}
          fontFamily={(theme) => theme.otherFonts.serif}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Typography
            fontFamily={"inherit"}
            variant="h2"
            lineHeight={1.1}
            marginBottom={1}
          >
            {singleBook.title}
          </Typography>
          <Typography
            fontFamily={"inherit"}
            variant="h4"
            textTransform={"capitalize"}
          >
            {singleBook.author}
          </Typography>
          <Stack
            direction="row"
            justifyContent={"inherit"}
            alignItems="center"
            spacing={1}
            marginTop={1}
          >
            <Rating readOnly value={singleBook.rating} precision={0.5} />
            <Typography
              fontSize={24}
              fontWeight={500}
              fontFamily={(theme) => theme.otherFonts.serif}
            >
              {singleBook.rating.toFixed(1)}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            gap={0.5}
            py={1}
            justifyContent={"inherit"}
          >
            {singleBook.genre.map((genre) => (
              <Chip key={genre} label={t(`genres:${genre}`)} />
            ))}
          </Stack>
          <Box py={1}>
            <Typography>
              <StyledSpan>{t("books:numberOfPages")}:</StyledSpan>{" "}
              {singleBook.numberOfPages}
            </Typography>
          </Box>
          <Box py={1}>
            <Description description={singleBook.description} />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <LendBookSection bookId={singleBook._id} />
      </Grid>
    </Grid>
  ) : (
    <Button
      variant="outlined"
      size="large"
      startIcon={<ArrowBackIcon />}
      {...{ component: Link, to: BOOKS_PATH }}
    >
      {t("books:backToBooks")}
    </Button>
  )
}

const StyledCoverImageBox = styled.div`
  display: grid;
  place-content: center;
  img {
    border-radius: 10px;
    display: block;
    width: 200px;
    aspect-ratio: 2/3;
    object-fit: cover;
    box-shadow: 0px 0px 70px -50px rgba(66, 68, 90, 1);
    border: 1px solid ${({ theme }) => theme.palette.primary.light};
  }
`

const StyledSpan = styled.span`
  display: inline-block;
  font-weight: 500;
  &::first-letter {
    text-transform: uppercase;
  }
`

export default SingleBook
