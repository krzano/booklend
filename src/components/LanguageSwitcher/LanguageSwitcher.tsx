import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import languagesList from "@/i18n/languagesList"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import styled from "styled-components"
import { KeyboardArrowDown } from "@mui/icons-material"
import { SvgIcon } from "@mui/material"

type LanguageSwitcherProps = {
  variant?: "contained" | "outlined"
}

const LanguageSwitcher = ({ variant = "contained" }: LanguageSwitcherProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { i18n } = useTranslation()
  const currentLanguageData = languagesList.find(
    (item) => item.language === i18n.resolvedLanguage,
  )

  return (
    <div>
      <Button
        id="basic-button"
        variant={variant}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        startIcon={
          <StyledFlagSvgIcon>{currentLanguageData?.flagSvg}</StyledFlagSvgIcon>
        }
      >
        {i18n.resolvedLanguage}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languagesList.map(({ language, name, flagSvg }) => {
          return (
            <MenuItem
              key={language}
              disabled={i18n.resolvedLanguage === language}
              onClick={() => {
                handleClose()
                i18n.changeLanguage(language)
              }}
            >
              <ListItemIcon>
                <StyledFlagSvgIcon>{flagSvg}</StyledFlagSvgIcon>
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

const StyledFlagSvgIcon = styled(SvgIcon)`
  border-radius: 50%;
  border: 1px solid;
`

export default LanguageSwitcher
