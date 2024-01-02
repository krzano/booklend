import { pulseAnimation } from "@/styles/animations"
import { Grid, SxProps, Theme } from "@mui/material"
import Chip from "@mui/material/Chip/Chip"
import Typography from "@mui/material/Typography/Typography"
import { useField } from "formik"
import { ReactElement, useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"

interface FormikFileInputProps {
  children: ReactElement
  name: string
  accept?: string
  disabled?: boolean
  sx?: SxProps<Theme>
}
// TODO TO DO: receiving yup error with custom values for interpolation
const FormikFileInput = ({
  children,
  name,
  accept,
  disabled,
  sx,
}: FormikFileInputProps) => {
  // I had to use number except the boolean because if the element has any children then it fires dragOver/Leave event every time we drag over its children
  const [dragOverCount, setDragOverCount] = useState(0)
  const [field, meta, helpers] = useField(name)
  const { t } = useTranslation(["forms"])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    helpers.setValue(e.dataTransfer.files[0])
    setDragOverCount(0)
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const handleDragEnter = () => {
    setDragOverCount((prev) => prev + 1)
  }
  const handleDragLeave = () => {
    setDragOverCount((prev) => prev - 1)
  }
  return (
    <Grid sx={sx} container justifyContent="center" rowSpacing={0.5}>
      <Grid item xs={12}>
        <StyledFileInputBox
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={dragOverCount ? "is-drag-over" : ""}
        >
          <label>
            <StyledInput
              id={name}
              name={name}
              type="file"
              accept={accept ? accept : ""}
              onChange={(event) => {
                if (event.target.files) {
                  helpers.setValue(event.target.files[0])
                }
              }}
              onBlur={field.onBlur}
              disabled={disabled}
            />
            <StyledSpan $isError={Boolean(meta.error)}>{children}</StyledSpan>
          </label>
        </StyledFileInputBox>
      </Grid>
      <Grid item xs={12}>
        <Typography color="error" fontSize={12} textAlign="center">
          {meta.error && t(meta.error)}
        </Typography>
      </Grid>
      {meta.value && (
        <Grid item xs={12}>
          <Chip
            label={meta.value.name}
            disabled={disabled}
            onDelete={() => {
              helpers.setValue(undefined)
            }}
            color={meta.error ? "error" : "default"}
            sx={{ width: 1 }}
          />
        </Grid>
      )}
    </Grid>
  )
}

const StyledFileInputBox = styled.div`
  ${({ theme }) => css`
    position: relative;
    outline-color: transparent;
    outline-width: 1px;
    outline-style: solid;
    border-radius: ${theme.shape.borderRadius}px;
    transition: outline-color 0.6s;
    &:has(:disabled) {
      opacity: 0.7;
    }
    &:focus-within,
    &:hover,
    &.is-drag-over {
      &:not(:has(:disabled)) {
        outline-color: ${theme.palette.primary.main};
        animation: ${pulseAnimation} 2s infinite;
      }
    }
  `}
`
const StyledInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
`
const StyledSpan = styled.span<{ $isError: boolean }>`
  ${({ theme, $isError }) => css`
    display: block;
    overflow: hidden;
    border-radius: ${theme.shape.borderRadius}px;
    border: 1px solid
      ${$isError ? theme.palette.error.main : theme.palette.grey[400]};
  `}
`

export default FormikFileInput
