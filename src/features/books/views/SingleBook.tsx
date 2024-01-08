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
import Section from "@/components/Section/Section"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const DESCRIPTION_VISIBLE_LENGTH = 200

const SingleBook = () => {
  const { t } = useTranslation(["books", "genres"])
  const { bookId } = useParams()
  const dispatch = useAppDispatch()
  const { isBooksError, isBooksLoading, singleBook } = useAppSelector(
    (store) => store.books,
  )
  const [imgSrcToRender, setImgSrcToRender] = useState(defaultBookImg)
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false)
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
  return isBooksLoading ? (
    <Loader />
  ) : isBooksError ? (
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
            <Rating readOnly value={singleBook.rating} />
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
              <Chip label={t(`genres:${genre}`)} />
            ))}
          </Stack>
          <Box py={1}>
            <Typography>
              <StyledText>{t("books:numberOfPages")}:</StyledText>{" "}
              {singleBook.numberOfPages}
            </Typography>
          </Box>
          <Box py={1}>
            <Typography>
              <StyledText>{t("books:description")}:</StyledText>
              <br />
              {singleBook.description.length > DESCRIPTION_VISIBLE_LENGTH ? (
                <>
                  {showFullDescription
                    ? singleBook.description
                    : truncateString(
                        singleBook.description,
                        DESCRIPTION_VISIBLE_LENGTH,
                      )}
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
                singleBook.description
              )}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Section title="lend book form">
          <div></div>
        </Section>
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

const StyledText = styled.p`
  display: inline-block;
  font-weight: 500;
  &::first-letter {
    text-transform: uppercase;
  }
`

export default SingleBook
