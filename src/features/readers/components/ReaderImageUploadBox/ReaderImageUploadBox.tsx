import { BASE_URL } from "@/constants/api"
import { Avatar, Divider, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

interface ReaderImageUploadBoxProps {
  readerImage: File | undefined
  readerImgSrc?: string | undefined
}

const ReaderImageUploadBox = ({
  readerImage,
  readerImgSrc,
}: ReaderImageUploadBoxProps) => {
  const { t } = useTranslation()

  return (
    <StyledReaderImageUploadBox>
      <Avatar
        variant="rounded"
        src={
          readerImage
            ? URL.createObjectURL(readerImage)
            : readerImgSrc
            ? BASE_URL + readerImgSrc
            : undefined
        }
        sx={{ width: 100, height: 100 }}
      />
      <Stack
        flexGrow={1}
        gap={1}
        textAlign={"center"}
        color={(theme) => theme.palette.grey[700]}
        alignItems={"center"}
      >
        <Typography fontSize={18} fontWeight={500} textTransform={"capitalize"}>
          {t("common:photo")}
        </Typography>
        <Divider sx={{ width: 2 / 3 }} />
        <Typography fontSize={12} textTransform={"uppercase"}>
          {t("common:chooseFile")}
        </Typography>
      </Stack>
    </StyledReaderImageUploadBox>
  )
}

const StyledReaderImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.palette.grey[100]};
`

export default ReaderImageUploadBox
