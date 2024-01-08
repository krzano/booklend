import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { editReader, getSingleReader } from "../readersThunk"
import { READERS_PATH } from "@/constants/paths"
import Loader from "@/components/Loader/Loader"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import Button from "@/components/Button/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useTranslation } from "react-i18next"
import PageTitle from "@/components/PageTitle/PageTitle"
import AddReaderForm from "../components/AddReaderForm/AddReaderForm"

const EditReader = () => {
  const { t } = useTranslation(["readers"])
  const { readerId } = useParams()
  const dispatch = useAppDispatch()
  const { isReadersLoading, isReadersError, singleReader } = useAppSelector(
    (store) => store.readers,
  )

  useEffect(() => {
    if (readerId) {
      dispatch(getSingleReader(readerId))
    }
  }, [readerId, dispatch])
  if (!readerId) return <Navigate to={READERS_PATH} />
  return isReadersLoading ? (
    <Loader />
  ) : isReadersError ? (
    <DataFetchingError />
  ) : singleReader ? (
    <>
      <PageTitle>{t("readers:editReader")}</PageTitle>
      <AddReaderForm
        readerImgSrc={singleReader.photo ? singleReader.photo : undefined}
        initialValues={{
          readerImage: undefined,
          firstName: singleReader.firstName,
          lastName: singleReader.lastName,
          phoneNumber: singleReader.phoneNumber,
          address: {
            street: singleReader.address.street,
            city: singleReader.address.city,
            postalCode: singleReader.address.postalCode,
          },
        }}
        onSubmit={async (values, actions) => {
          await dispatch(
            editReader({
              readerId: singleReader._id,
              editReaderValues: values,
            }),
          )
          actions.resetForm()
        }}
      />
    </>
  ) : (
    <Button
      variant="outlined"
      size="large"
      startIcon={<ArrowBackIcon />}
      {...{ component: Link, to: READERS_PATH }}
    >
      {t("readers:backToReaders")}
    </Button>
  )
}
export default EditReader
