import { Typography, TypographyProps } from "@mui/material"

interface PageTitleProps
  extends Omit<TypographyProps, "children" | "variant" | "component"> {
  children: string | (string | number)[]
}

const PageTitle = ({
  children,
  marginBottom = { xs: 6, sm: 8 },
  ...restTypographyProps
}: PageTitleProps) => {
  return (
    <Typography
      variant="h2"
      marginBottom={marginBottom}
      {...restTypographyProps}
    >
      {children}
    </Typography>
  )
}

export default PageTitle
