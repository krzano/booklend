import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import AnimatedNumber from "../AnimatedNumber/AnimatedNumber"
import Skeleton from "@mui/material/Skeleton/Skeleton"
import Paper from "@mui/material/Paper/Paper"
import { Stack } from "@mui/material"

interface StatisticCardProps {
  label: string
  number: number | null
  icon: JSX.Element
}

const StatisticCard = ({ number, label, icon }: StatisticCardProps) => {
  return (
    <Box flexGrow={1}>
      {number === null ? (
        <Skeleton
          height={80}
          variant="rounded"
          sx={{ width: "100%", minWidth: 200 }}
        />
      ) : (
        <Paper
          elevation={10}
          sx={{
            width: 1,
            px: 2,
            py: 2,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack gap={1}>
              <Typography
                fontSize={16}
                fontWeight={500}
                lineHeight={1}
                color={(theme) => theme.palette.grey[600]}
              >
                {label}
              </Typography>
              <Typography
                fontSize={36}
                fontWeight={500}
                lineHeight={1}
                color={(theme) => theme.palette.grey[700]}
              >
                <AnimatedNumber value={number} />
              </Typography>
            </Stack>
            <Box
              sx={{
                display: "grid",
                placeContent: "center",
                p: 1,
                color: (theme) => theme.palette.grey[700],
              }}
            >
              {icon}
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  )
}
export default StatisticCard
