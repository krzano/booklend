import { styled } from "styled-components"
import { Link as RouterLink } from "react-router-dom"
import Chip from "@mui/material/Chip/Chip"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import { BOOKS_PATH } from "@/constants/paths"
import { LendBookStatus } from "@/types/api"
import { useTranslation } from "react-i18next"

export interface BookStatusChipProps {
  bookId: string
  lendStatus: LendBookStatus
}
const BookStatusChip = ({ bookId, lendStatus }: BookStatusChipProps) => {
  const { t } = useTranslation(["lendBook"])
  return (
    <StyledChip
      variant="outlined"
      label={
        lendStatus === "borrowed"
          ? t("lendBook:borrowed")
          : t("lendBook:returned")
      }
      color={lendStatus === "borrowed" ? "warning" : "success"}
      disabled={lendStatus === "available"}
      clickable
      size="small"
      icon={<FiberManualRecordIcon fontSize="small" />}
      component={RouterLink}
      to={`${BOOKS_PATH}/${bookId}`}
    />
  )
}

const StyledChip = styled(Chip)`
  text-transform: uppercase;
  font-weight: 500;
`

export default BookStatusChip
