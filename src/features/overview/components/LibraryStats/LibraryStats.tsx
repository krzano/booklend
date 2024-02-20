import Paper from "@mui/material/Paper/Paper"
import StatisticCard from "./components/StatisticCard/StatisticCard"
import PeopleIcon from "@mui/icons-material/People"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import BookIcon from "@mui/icons-material/Book"
import { useAppSelector } from "@/app/hooks"
import { lighten } from "@mui/material"
import styled, { css } from "styled-components"
import { useTranslation } from "react-i18next"

const LibraryStats = () => {
  const { t } = useTranslation(["overview"])
  const { totalBooks, totalCurrentlyBorrowed, totalReaders } = useAppSelector(
    (store) => store.overview,
  )
  return (
    <StyledPaper>
      <StatisticCard
        icon={<PeopleIcon fontSize="large" />}
        label={t("overview:totalNumberOfReaders")}
        number={totalReaders}
      />
      <StatisticCard
        icon={<BookIcon fontSize="large" />}
        label={t("overview:booksInTheLibrary")}
        number={totalBooks}
      />
      <StatisticCard
        icon={<AutoStoriesIcon fontSize="large" />}
        label={t("overview:currentlyBorrowedBooks")}
        number={totalCurrentlyBorrowed}
      />
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  ${({ theme }) => css`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: ${theme.spacing(4)};
    padding: ${theme.spacing(4)};
    width: 600px;
    background: linear-gradient(
      135deg,
      ${lighten(theme.palette.secondary.main, 0.9)} 0%,
      ${lighten(theme.palette.secondary.main, 0.5)} 100%
    );
  `}
`

export default LibraryStats
