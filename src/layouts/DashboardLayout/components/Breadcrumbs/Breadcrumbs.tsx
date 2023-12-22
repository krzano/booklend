import { Link, useLocation } from "react-router-dom"
import { Chip } from "@mui/material"
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

const Breadcrumbs = () => {
  const location = useLocation()
  const { t } = useTranslation(["dashboard"])

  let currentLink = ""
  const breadcrumbsList = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index) => {
      currentLink += `/${crumb}`
      const breadcrumb = {
        id: index,
        to: currentLink,
        label: t(`dashboard:breadcrumbs.${crumb}`),
      }
      return breadcrumb
    })

  return (
    <StyledBreadcrumps>
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
