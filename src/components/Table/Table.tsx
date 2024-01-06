import { useState } from "react"
import MuiTable from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { TableCellProps } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {
  Box,
  IconButton,
  Stack,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
  darken,
} from "@mui/material"
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions"
import CustomBackdrop from "../CustomBackdrop/CustomBackdrop"
import FilterListIcon from "@mui/icons-material/FilterList"
import FilterListOffIcon from "@mui/icons-material/FilterListOff"
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded"
import styled, { css } from "styled-components"
import { useTranslation } from "react-i18next"

export type Columns<T> = {
  label: string
  key: string
  isSortable: boolean
  render: (data: T) => React.ReactNode
  align?: TableCellProps["align"]
}[]
type TableProps<T> = {
  title: string
  dataList: T[]
  columns: Columns<T>
  filtersList?: JSX.Element[]
  refreshFunction: () => void
  loading: boolean
  sortBy: string
  sortDirection: "asc" | "desc"
  pageSize: number
  currentPage: number
  totalItems: number
  onSortByChange: (sortByValue: string) => void
  onSortDirectionChange: (sortDirectionValue: "asc" | "desc") => void
  onPageSizeChange: (newPageSize: number) => void
  onPageChange: (newPage: number) => void
}
const Table = <T,>({
  title,
  dataList,
  columns,
  filtersList,
  refreshFunction,
  loading,
  sortBy,
  sortDirection,
  pageSize,
  currentPage,
  totalItems,
  onSortByChange,
  onSortDirectionChange,
  onPageSizeChange,
  onPageChange,
}: TableProps<T>) => {
  const { t } = useTranslation()
  const [showFilters, setShowFilters] = useState(true)

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    onPageChange(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onPageSizeChange(parseInt(event.target.value, 10))
  }
  const handleSortClick = (sortByValue: string) => {
    onSortByChange(sortByValue)
    onSortDirectionChange(
      sortBy === sortByValue
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc",
    )
  }
  return (
    <Paper>
      <StyledToolbar>
        <Typography
          pr={2}
          fontWeight={400}
          fontSize={20}
          sx={{ "&::first-letter": { textTransform: "uppercase" } }}
        >
          {title}
        </Typography>
        <Box width={1}>
          {filtersList && (
            <Stack
              direction={"row"}
              alignItems={"flex-end"}
              justifyContent={"flex-end"}
              gap={2}
              flexWrap={"wrap"}
              display={showFilters ? "flex" : "none"}
            >
              {filtersList.map((filter, index) => {
                return (
                  <Box key={index} display={showFilters ? "block" : "none"}>
                    {filter}
                  </Box>
                )
              })}
            </Stack>
          )}
        </Box>
        <Box marginLeft={"auto"} display={"flex"}>
          {filtersList && (
            <Tooltip
              arrow
              title={
                showFilters ? t("common:hideFilters") : t("common:showFilters")
              }
            >
              <span>
                <IconButton
                  onClick={() => {
                    setShowFilters((prev) => !prev)
                  }}
                >
                  {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
                </IconButton>
              </span>
            </Tooltip>
          )}
          <Tooltip arrow title={t("common:refresh")}>
            <span>
              <IconButton
                disabled={loading}
                onClick={() => {
                  refreshFunction()
                }}
              >
                <RefreshRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </StyledToolbar>
      <TableContainer>
        <StyledTable aria-label={`${title}-table`}>
          <TableHead>
            <TableRow>
              {columns.map(({ isSortable, label, key, align }) => {
                return isSortable ? (
                  <TableCell key={key} align={align}>
                    <TableSortLabel
                      disabled={loading}
                      active={sortBy === key}
                      direction={sortBy === key ? sortDirection : "asc"}
                      onClick={() => {
                        handleSortClick(key)
                      }}
                    >
                      <span>{label}</span>
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell key={key} align={align}>
                    {label}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: "relative" }}>
            <TableRow>
              <TableCell
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              >
                <CustomBackdrop open={loading} />
              </TableCell>
            </TableRow>
            {dataList.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map(({ key, align, render }) => (
                  <TableCell key={`${key}${index}`} align={align}>
                    {render(data)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <Box px={2}>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={pageSize}
          page={currentPage - 1}
          count={totalItems}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
            disabled: loading,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          backIconButtonProps={
            loading
              ? {
                  disabled: true,
                }
              : undefined
          }
          nextIconButtonProps={
            loading
              ? {
                  disabled: true,
                }
              : undefined
          }
        />
      </Box>
    </Paper>
  )
}

const StyledTable = styled(MuiTable)`
  .MuiTableRow-head {
    .MuiTableCell-root {
      &::first-letter {
        text-transform: capitalize;
      }
    }
    .MuiButtonBase-root {
      span::first-letter {
        text-transform: capitalize;
      }
    }
  }
  .MuiTableRow-root {
    transition: background-color 0.3s;
    &:hover {
      background-color: ${({ theme }) =>
        darken(theme.palette.background.paper, 0.03)};
    }
  }
`

const StyledToolbar = styled(Toolbar)`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: ${theme.spacing(2)};
    padding-top: ${theme.spacing(2)};
  `}
`

export default Table
