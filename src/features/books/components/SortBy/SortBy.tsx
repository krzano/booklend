import MenuItem from "@mui/material/MenuItem/MenuItem"
import TextField from "@mui/material/TextField/TextField"
import sortOptions from "./sortOptions"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect, useState } from "react"
import { setQueryParams } from "../../booksSilce"
import { useTranslation } from "react-i18next"
import { Typography } from "@mui/material"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const SortBy = () => {
  const { t } = useTranslation(["books", "forms"])
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector((store) => store.books.queryParams.sortBy)
  const sortDirection = useAppSelector(
    (store) => store.books.queryParams.sortDirection,
  )
  const [selectedSortOptionText, setSelectedSortOptionText] = useState<string>(
    sortOptions.find(
      (item) =>
        item.value.sortBy === sortBy &&
        item.value.sortDirection === sortDirection,
    )?.optionTranslationKey || sortOptions[0].optionTranslationKey,
  )

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSortOptionText(event.target.value)
    const selectedSortOptionValues = sortOptions.find(
      (item) => item.optionTranslationKey === event.target.value,
    )?.value
    if (selectedSortOptionValues) {
      dispatch(setQueryParams(selectedSortOptionValues))
    }
  }

  useEffect(() => {
    setSelectedSortOptionText(
      sortOptions.find(
        (item) =>
          item.value.sortBy === sortBy &&
          item.value.sortDirection === sortDirection,
      )?.optionTranslationKey || sortOptions[0].optionTranslationKey,
    )
  }, [sortBy, sortDirection])

  return (
    <TextField
      select
      SelectProps={{ MenuProps }}
      id="sort-by"
      label={t("forms:labels.sortBy")}
      size="small"
      fullWidth
      value={selectedSortOptionText}
      onChange={handleSortChange}
    >
      {sortOptions.map(({ optionTranslationKey, value }) => (
        <MenuItem key={optionTranslationKey} value={optionTranslationKey}>
          <Typography>
            {t(`books:sortOptions.${optionTranslationKey}`)}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  )
}
export default SortBy
