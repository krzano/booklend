import { Box } from "@mui/material"
import Rating from "@mui/material/Rating/Rating"
import Typography from "@mui/material/Typography/Typography"
import { useField } from "formik"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
interface FormikRatingFieldProps {
  name: string
  label: string
  disabled?: boolean
}
const FormikRatingField = ({
  name,
  disabled,
  label,
}: FormikRatingFieldProps) => {
  const { t } = useTranslation(["forms"])
  const [field, meta, helpers] = useField(name)
  return (
    <StyledFormikRatingField>
      <Typography fontSize={12} fontWeight={500}>
        {label}
      </Typography>
      <Box display="flex" gap={1} justifyContent="center" alignItems="center">
        <Rating
          name={name}
          color="secondary"
          size="large"
          precision={0.5}
          value={meta.value}
          onChange={(_e, newValue) => {
            helpers.setValue(newValue)
          }}
          onBlur={field.onBlur}
          disabled={disabled}
        />
        <Typography
          fontWeight={500}
          fontSize={26}
          color={(theme) => theme.palette.grey[600]}
          fontFamily={(theme) => theme.otherFonts.serif}
          minWidth={"4rem"}
        >
          {meta.value ? meta.value : "0"}
        </Typography>
      </Box>
      {meta.error && (
        <Typography fontSize={12} color="error">
          {t(meta.error)}
        </Typography>
      )}
    </StyledFormikRatingField>
  )
}

const StyledFormikRatingField = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing(1)} ${theme.spacing(1.5)};
    & .MuiRating-iconHover {
      color: ${theme.palette.secondary.main};
    }
    .MuiTypography-root {
      &::first-letter {
        text-transform: uppercase;
      }
    }
  `}
`

export default FormikRatingField
