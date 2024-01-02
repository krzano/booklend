import { Link, useLocation, useParams } from "react-router-dom"
import { Chip } from "@mui/material"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/app/hooks"
import truncateString from "@/utils/truncateString"

const Breadcrumbs = () => {
  // TODO TO DO: after I add the currentBook to the booksSlice, I have to change the booksList to currentBook
  const { booksData } = useAppSelector((store) => store.books)
  const { bookId } = useParams()
  const location = useLocation()
  const { t } = useTranslation(["breadcrumbs"])

  let currentLink = ""
  const breadcrumbsList = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`
      let label = t(`breadcrumbs:${crumb}`)
      if (index === array.length - 1 && label === bookId && booksData) {
        const bookTitle = booksData.booksList.find(
          (book) => book._id === bookId,
        )?.title
        if (bookTitle) {
          label = truncateString(bookTitle, 20)
        }
      }
      const breadcrumb = {
        id: index,
        to: currentLink,
        label,
      }
      return breadcrumb
    })

  return (
    <StyledBreadcrumps aria-label="breadcrumb">
      {breadcrumbsList.map(({ id, to, label }, index, array) => {
        if (index === array.length - 1) {
          return <StyledChip key={id} label={label} />
        }
        return <StyledChip key={id} component={Link} to={to} label={label} />
      })}
    </StyledBreadcrumps>
  )
}

const StyledChip = styled(Chip)`
  font-weight: 500;
  opacity: 0.8;
  .MuiChip-label::first-letter {
    text-transform: capitalize;
  }
`
const StyledBreadcrumps = styled(MuiBreadcrumbs)`
  .MuiBreadcrumbs-ol {
    row-gap: ${({ theme }) => theme.spacing(1)};
  }
  a {
    cursor: pointer;
    transition: opacity 0.6s;
    &:hover {
      opacity: 1;
    }
  }
  .MuiBreadcrumbs-li:last-child {
    ${StyledChip} {
      opacity: 1;
    }
  }
`

export default Breadcrumbs
