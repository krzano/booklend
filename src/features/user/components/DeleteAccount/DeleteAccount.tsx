import { useAppDispatch } from "@/app/hooks"
import Box from "@mui/material/Box/Box"
import Button from "@/components/Button/Button"
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { deleteUserAccount } from "../../userThunk"
import PaperModal from "@/components/PaperModal/PaperModal"
import { useTranslation } from "react-i18next"

const DeleteAccount = () => {
  const { t } = useTranslation(["settings"])
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const handleOpenModal = () => {
    setTimeLeft(5)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isModalOpen && timeLeft !== null) {
      if (timeLeft === 0) {
        setTimeLeft(null)
      }
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isModalOpen, timeLeft])

  return (
    <>
      <StyledDeleteAccount>
        <Button
          variant="text"
          size="large"
          color="error"
          onClick={handleOpenModal}
        >
          {t("settings:deleteAccount")}
        </Button>
      </StyledDeleteAccount>
      <PaperModal
        title={t("settings:areYouSure")}
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography marginBottom={3} fontSize={18}>
          {t("settings:deleteAccountWarningMessage")}
        </Typography>
        <Box display="flex" justifyContent="center" gap={{ xs: 2, sm: 4 }}>
          <Button
            color="error"
            disabled={timeLeft !== null && timeLeft > 0}
            onAsyncClick={() => {
              handleCloseModal()
              return dispatch(deleteUserAccount())
            }}
          >
            {timeLeft
              ? `${t("common:delete")} (${timeLeft})`
              : t("settings:deleteAccount")}
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            {t("common:cancel")}
          </Button>
        </Box>
      </PaperModal>
    </>
  )
}

const StyledDeleteAccount = styled.div`
  ${({ theme }) => css`
    display: grid;
    place-content: center;
    padding: ${theme.spacing(1)};
    border-top: 1px solid ${theme.palette.error.main};
    transition: border-color 0.6s;
    &:hover {
      border-color: ${theme.palette.error.main};
    }
  `}
  .MuiButton-root {
    padding: 1rem 4rem;
  }
`

export default DeleteAccount
