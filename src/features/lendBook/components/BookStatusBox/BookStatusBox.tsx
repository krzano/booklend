import { useTranslation } from "react-i18next"
import styled from "styled-components"
import Chip from "@mui/material/Chip/Chip"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import { LendBookStatus } from "@/types/api"

interface BookStatusBoxProps {
  status: LendBookStatus
}
const BookStatusBox = ({ status }: BookStatusBoxProps) => {
  const { t } = useTranslation(["lendBook"])
  return (
    <div>
      <StyledChip
        variant="outlined"
        color={status === "available" ? "success" : "warning"}
        label={
          status === "available"
            ? t("lendBook:bookStatusAvailable")
            : t("lendBook:bookStatusBorrowed")
        }
        icon={<FiberManualRecordIcon fontSize="small" />}
      />
    </div>
  )
}

const StyledChip = styled(Chip)`
  font-weight: 500;
  font-size: 1.4rem;
`

export default BookStatusBox
