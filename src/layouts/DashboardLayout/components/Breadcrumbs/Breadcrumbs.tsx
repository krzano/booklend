import { Link, useLocation, useParams } from "react-router-dom"
import { Chip } from "@mui/material"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "@/app/hooks"
import truncateString from "@/utils/truncateString"
const DISPLAYED_LABEL_LENGTH = 20
const Breadcrumbs = () => {
  const { singleBook } = useAppSelector((store) => store.books)
  const { singleReader } = useAppSelector((store) => store.readers)
  const { bookId, readerId } = useParams()
  const location = useLocation()
  const { t } = useTranslation(["breadcrumbs"])

  let currentLink = ""
  const breadcrumbsList = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`
      let label = t(`breadcrumbs:${crumb}`)
      if (label === bookId && singleBook && singleBook._id === bookId) {
        label = truncateString(singleBook.title, DISPLAYED_LABEL_LENGTH)
      }
      if (label === readerId && singleReader && singleReader._id === readerId) {
        label = truncateString(
          `${singleReader.firstName} ${singleReader.lastName}`,
          DISPLAYED_LABEL_LENGTH,
        )
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
