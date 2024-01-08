import { Box, BoxProps, Typography } from "@mui/material"

interface SectionProps extends Omit<BoxProps, "component"> {
  title?: string
  children: React.ReactNode
}

const Section = ({ title, children, ...restBoxProps }: SectionProps) => {
  return (
    <Box component="section" {...restBoxProps}>
      {title && (
        <Typography variant="h3" marginBottom={1}>
          {title}
        </Typography>
      )}
      <Box>{children}</Box>
    </Box>
  )
}

export default Section
