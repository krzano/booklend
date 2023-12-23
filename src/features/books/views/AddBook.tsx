import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"
import AddBookForm from "../components/AddBookForm/AddBookForm"

const AddBook = () => {
  const { t } = useTranslation(["books"])

  return (
    <>
      <PageTitle>{t("common:addNewBook")}</PageTitle>
      <AddBookForm />
    </>
  )
}
export default AddBook
