import { pulseAnimation } from "@/styles/animations"
import { Typography } from "@mui/material"
import { useField } from "formik"
import { ReactElement, useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"

interface FormikFileInputProps {
  children: ReactElement
  name: string
  accept?: string
}

const FormikFileInput = ({ children, name, accept }: FormikFileInputProps) => {
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
        />
        <span>{children}</span>
      </label>
      {meta.error && (
        <StyledTypography color="error" fontSize={12} marginTop={0.5}>
          {t(meta.error)}
        </StyledTypography>
      )}
    </StyledFileInputBox>
  )
}

const StyledFileInputBox = styled.div`
  ${({ theme }) => css`
    position: relative;
    margin-bottom: ${theme.spacing(1)};
    outline-color: transparent;
    outline-width: 1px;
    outline-style: solid;
    border-radius: ${theme.shape.borderRadius}px;
    transition: outline-color 0.6s;
    &:focus-within,
    &:hover,
    &.is-drag-over {
      outline-color: ${theme.palette.primary.main};
      animation: ${pulseAnimation} 2s infinite;
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
const StyledTypography = styled(Typography)`
  position: absolute;
  left: 0;
  right: 0;
`

export default FormikFileInput
