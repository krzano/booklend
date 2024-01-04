import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"
import AddReaderForm from "../components/AddReaderForm/AddReaderForm"
import { useAppDispatch } from "@/app/hooks"
import { addReader } from "../readersThunk"

const AddReader = () => {
  const { t } = useTranslation(["readers"])
  const dispatch = useAppDispatch()

  return (
    <>
      <PageTitle>{t("readers:addNewReader")}</PageTitle>
      <AddReaderForm
        initialValues={{
          readerImage: undefined,
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            postalCode: "",
          },
        }}
        onSubmit={async (values, actions) => {
          await dispatch(addReader(values))
          actions.resetForm()
        }}
      />
    </>
  )
}
export default AddReader
