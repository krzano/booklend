import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material"
import img from "@/assets/images/fetching-error.svg"
import { toast } from "react-toastify"
import { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import RefreshIcon from "@mui/icons-material/Refresh"
import firstLetterToUppercase from "@/utils/firstLetterToUppercase"

interface DataFetchingErrorProps {
  text?: string
  disableToast?: boolean
  toastMsg?: string
  refreshFunction?: () => void
}

const DataFetchingError = ({
  text,
  disableToast,
  toastMsg,
  refreshFunction,
}: DataFetchingErrorProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleRefresh = () => {
    if (refreshFunction) {
      refreshFunction()
    } else {
      navigate(0)
    }
  }

  useEffect(() => {
    if (!disableToast) {
      toast.error(toastMsg || t("common:fetchingErrorMsg"), {
        autoClose: 6000,
        closeButton: true,
      })
    }
  }, [t, disableToast, toastMsg])
  return (
    <StyledPaper elevation={1}>
      <Box
        display={"block"}
        component={"img"}
        src={img}
        alt={text}
        maxHeight={300}
        maxWidth={6 / 10}
        marginBottom={2}
      />
      <Typography variant="h4" color={"primary"}>
        {text || t("common:somethingWrong")}
      </Typography>
      <Tooltip title={t("common:refresh")} arrow>
        <StyledIconButton onClick={handleRefresh}>
          <RefreshIcon fontSize="large" />
        </StyledIconButton>
      </Tooltip>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  padding: 6rem 4rem 4rem;
  max-width: 36rem;
  text-align: center;
`
const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`

export default DataFetchingError
