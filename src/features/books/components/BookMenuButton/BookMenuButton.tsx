import Button from "@/components/Button/Button"
import Divider from "@mui/material/Divider/Divider"
import IconButton from "@mui/material/IconButton/IconButton"
import Menu from "@mui/material/Menu/Menu"
import Tooltip from "@mui/material/Tooltip/Tooltip"
import { MouseEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import styled from "styled-components"
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined"
import MoreHoriz from "@mui/icons-material/MoreHoriz"
import { Link as RouterLink } from "react-router-dom"
import { EDIT_BOOK_PATH } from "@/constants/paths"
import MuiButton from "@mui/material/Button/Button"
import { useAppDispatch } from "@/app/hooks"
import { deleteBook } from "../../booksThunk"
interface BookMenuButtonProps {
  bookId: string
}

const BookMenuButton = ({ bookId }: BookMenuButtonProps) => {
  const { t } = useTranslation(["books"])
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleDeleteBook = async () => {
    await dispatch(deleteBook(bookId))
    handleCloseMenu()
  }
  return (
    <>
      <Tooltip title={t("books:options")} placement="left">
        <IconButton
          id="book-more-actions-button"
          aria-controls={open ? "book-more-actions-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickMenu}
        >
          <MoreHoriz />
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="book-more-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "book-more-actions-button",
          disablePadding: true,
        }}
      >
        <li onClick={handleCloseMenu}>
          <MuiButton
            component={RouterLink}
            to={`${EDIT_BOOK_PATH}/${bookId}`}
            variant="text"
            size="large"
            fullWidth
            startIcon={<EditNoteOutlinedIcon fontSize="small" />}
          >
            {t("common:edit")}
          </MuiButton>
        </li>
        <Divider />
        <li>
          <Button
            variant="text"
            size="large"
            color="error"
            fullWidth
            startIcon={<DeleteOutlineIcon fontSize="small" />}
            onAsyncClick={handleDeleteBook}
          >
            {t("common:delete")}
          </Button>
        </li>
      </StyledMenu>
    </>
  )
}

const StyledMenu = styled(Menu)`
  .MuiButtonBase-root {
    font-size: 1.3rem;
    border-radius: 0;
  }
`

export default BookMenuButton
