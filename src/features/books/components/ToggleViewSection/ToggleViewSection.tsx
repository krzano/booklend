import ToggleButton from "@mui/material/ToggleButton/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup"
import Typography from "@mui/material/Typography/Typography"
import styled from "styled-components"
import { ViewList, ViewModule } from "@mui/icons-material"
import { ViewVariants, setView } from "../../booksSilce"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Divider from "@mui/material/Divider/Divider"
import { useTranslation } from "react-i18next"

const ToggleViewSection = () => {
  const { t } = useTranslation(["books"])
  const dispatch = useAppDispatch()
  const totalItems = useAppSelector(
    (store) => store.books.booksData?.totalItems,
  )
  const view = useAppSelector((store) => store.books.view)

  return (
    <StyledToggleViewSection>
      <ToggleButtonGroup
        size="small"
        value={view}
        exclusive
        onChange={(_, nextView) => {
          if (nextView !== null) {
            dispatch(setView(nextView))
          }
        }}
      >
        <ToggleButton value={ViewVariants.grid}>
          <ViewModule />
        </ToggleButton>
        <ToggleButton value={ViewVariants.list}>
          <ViewList />
        </ToggleButton>
      </ToggleButtonGroup>
      <Divider />
      <Typography>
        {t("books:foundBooksNumber", { count: totalItems })}
      </Typography>
    </StyledToggleViewSection>
  )
}

const StyledToggleViewSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.6rem;
`

export default ToggleViewSection
