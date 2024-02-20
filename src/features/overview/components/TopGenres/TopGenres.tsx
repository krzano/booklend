import { Box, Paper, Skeleton, Typography } from "@mui/material"
import { PieChart, pieArcLabelClasses } from "@mui/x-charts"
import { useTranslation } from "react-i18next"
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes"
import { useAppSelector } from "@/app/hooks"
import styled, { css } from "styled-components"

const TopGenres = () => {
  const { t } = useTranslation(["genres", "overview"])
  const recentlyPickedGenres = useAppSelector(
    (state) => state.overview.recentlyPickedGenres,
  )

  if (!recentlyPickedGenres)
    return (
      <Box flexGrow={1}>
        <Skeleton
          variant="rounded"
          width={"100%"}
          sx={{ minWidth: 260, maxWidth: "100%" }}
          height={300}
        />
      </Box>
    )
  return (
    <StyledPaper>
      <Typography fontSize={20}>
        {t("overview:genresRecentlyPicked")}
      </Typography>
      <Typography color={(theme) => theme.palette.grey[500]} mb={1}>
        {t("overview:percentageDistributionOfGenres")}
      </Typography>
      {recentlyPickedGenres.length < 1 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mx: "auto",
            my: 3,
            p: 5,
            width: 220,
            height: 220,
            borderRadius: "100%",
            border: 1,
            borderColor: (theme) => theme.palette.grey[500],
            color: (theme) => theme.palette.grey[500],
            textAlign: "center",
          }}
        >
          <Typography textAlign={"center"} fontSize={16}>
            {t("common:noDataToDisplay")}
          </Typography>
          <Typography fontSize={14}>
            {t("overview:lendBookToSeeThis")}
          </Typography>
        </Box>
      ) : (
        <PieChart
          series={[
            {
              arcLabel: (item) => item.value + "%",
              arcLabelMinAngle: 45,
              data: recentlyPickedGenres.map(
                ({ genreTranslationKey, percentage }) => ({
                  label: t(`genres:${genreTranslationKey}`),
                  value: percentage,
                }),
              ),
              valueFormatter: ({ value }) => value + "%",
              innerRadius: "15%",
              outerRadius: "85%",
              paddingAngle: 2,
              cornerRadius: 6,
              startAngle: -90,
              endAngle: 270,
              highlightScope: {
                highlighted: "item",
                faded: "global",
              },
              highlighted: { additionalRadius: 4 },
            },
          ]}
          colors={mangoFusionPalette}
          height={220}
          width={undefined}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              padding: 1,
              labelStyle: {
                textTransform: "capitalize",
                fontSize: 14,
              },
              itemMarkHeight: 10,
              itemMarkWidth: 10,
              itemGap: 7,
              markGap: 6,
            },
          }}
        />
      )}
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  ${({ theme }) => css`
    flex-grow: 1;
    padding: ${theme.spacing(2)};
    width: 500px;
    .${pieArcLabelClasses.root} {
      font-family: ${theme.typography.fontFamily};
      font-size: 14px;
      font-weight: 500;
      fill: #fff;
      pointer-events: none;
    }
  `}
`

export default TopGenres
