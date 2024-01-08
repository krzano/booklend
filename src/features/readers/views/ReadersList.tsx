import { useAppDispatch, useAppSelector } from "@/app/hooks"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { deleteReader, getReaders } from "../readersThunk"
import Table from "@/components/Table/Table"
import Loader from "@/components/Loader/Loader"
import { setQueryParams } from "../readersSlice"
import { Reader } from "@/types/api"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import Avatar from "@mui/material/Avatar/Avatar"
import { BASE_URL } from "@/constants/api"
import Box from "@mui/material/Box/Box"
import { Tooltip, Typography } from "@mui/material"
import EditNoteIcon from "@mui/icons-material/EditNote"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import { EDIT_READER, READERS_PATH } from "@/constants/paths"
import SearchField from "@/components/SearchField/SearchField"
import ActionButtons from "@/components/Table/components/ActionButtons/ActionButtons"
import { Link } from "react-router-dom"

const ReadersList = () => {
  const { t } = useTranslation(["readers", "forms"])
  const dispatch = useAppDispatch()
  const { isReadersError, isReadersLoading, queryParams, readersData } =
    useAppSelector((store) => store.readers)

  useEffect(() => {
    dispatch(getReaders(queryParams))
  }, [dispatch, queryParams])
  const { currentPage, pageSize, sortBy, sortDirection, search } = queryParams
  return (
    <>
      <PageTitle>{t("readers:readersList")}</PageTitle>
      {readersData ? (
        isReadersError ? (
          <DataFetchingError
            refreshFunction={() => {
              dispatch(getReaders(queryParams))
            }}
          />
        ) : (
          <Table<Reader>
            title={t("readers:readers")}
            filtersList={[
              <SearchField
                search={search}
                onSearchChange={(searchTerm) => {
                  dispatch(setQueryParams({ search: searchTerm }))
                }}
              />,
            ]}
            loading={isReadersLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            refreshFunction={() => {
              dispatch(getReaders(queryParams))
            }}
            sortBy={sortBy}
            sortDirection={sortDirection}
            totalItems={readersData.totalItems}
            onPageChange={(newPage) => {
              dispatch(setQueryParams({ currentPage: newPage }))
            }}
            onPageSizeChange={(newPageSize) => {
              dispatch(setQueryParams({ pageSize: newPageSize }))
            }}
            onSortByChange={(sortByValue) => {
              dispatch(setQueryParams({ sortBy: sortByValue }))
            }}
            onSortDirectionChange={(sortDirectionValue) => {
              dispatch(setQueryParams({ sortDirection: sortDirectionValue }))
            }}
            dataList={readersData.readersList}
            columns={[
              {
                label: t("common:photo"),
                key: "photo",
                isSortable: false,
                render: ({ photo, firstName, lastName, _id }) => (
                  <Box display={"flex"} justifyContent={"center"}>
                    <Tooltip arrow title={t("readers:goToReader")}>
                      <Avatar
                        variant="rounded"
                        src={photo ? BASE_URL + photo : undefined}
                        component={Link}
                        to={`${READERS_PATH}/${_id}`}
                        sx={{ textDecoration: "none" }}
                      >
                        <Typography
                          textTransform={"uppercase"}
                          fontWeight={500}
                          fontSize={18}
                        >
                          {firstName.slice(0, 1) + lastName.slice(0, 1)}
                        </Typography>
                      </Avatar>
                    </Tooltip>
                  </Box>
                ),
                align: "center",
              },
              {
                label: t("forms:labels.firstName"),
                key: "firstName",
                isSortable: true,
                render: (data) => data.firstName,
              },
              {
                label: t("forms:labels.lastName"),
                key: "lastName",
                isSortable: true,
                render: (data) => data.lastName,
              },
              {
                label: t("forms:labels.phoneNumber"),
                key: "phoneNumber",
                isSortable: false,
                render: (data) => data.phoneNumber,
              },
              {
                label: t("forms:labels.street"),
                key: "address.street",
                isSortable: true,
                render: (data) => data.address.street,
              },
              {
                label: t("forms:labels.city"),
                key: "address.city",
                isSortable: true,
                render: (data) => data.address.city,
              },
              {
                label: t("forms:labels.postalCode"),
                key: "address.postalCode",
                isSortable: true,
                render: (data) => data.address.postalCode,
              },
              {
                label: t("common:actions"),
                key: "actions",
                isSortable: false,
                render: ({ _id }) => (
                  <ActionButtons
                    variant="outlined"
                    buttonList={[
                      {
                        id: 0,
                        label: t("readers:goToReader"),
                        icon: <ReadMoreIcon fontSize="small" />,
                        component: "link",
                        color: "secondary",
                        to: `${READERS_PATH}/${_id}`,
                      },
                      {
                        id: 1,
                        label: t("common:edit"),
                        icon: <EditNoteIcon fontSize="small" />,
                        component: "link",
                        to: `${READERS_PATH}/${_id}/${EDIT_READER}`,
                      },
                      {
                        id: 2,
                        label: t("common:delete"),
                        icon: <DeleteOutlineIcon fontSize="small" />,
                        color: "error",
                        component: "button",
                        onAsyncClick: async () => {
                          await dispatch(deleteReader(_id))
                        },
                      },
                    ]}
                  />
                ),
                align: "center",
              },
            ]}
          />
        )
      ) : (
        <Loader />
      )}
    </>
  )
}
export default ReadersList
