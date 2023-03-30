import { useMemo } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import {
  getColorByScore,
  orderAssetsByScore,
} from "modules/DashboardModules/utils/functions";
import { breakpoints } from "ui-tokens/breakpoints";

import { type HealthChartProps } from "./types";

const HealthChart = ({ assets }: HealthChartProps): JSX.Element => {
  const assetsData = useMemo(() => orderAssetsByScore(assets), [assets]);

  const options: Highcharts.Options = {
    title: {
      text: "Saúde dos ativos",
    },
    series: assetsData.map((asset) => ({
      type: "column",
      name: asset.name,
      data: [asset.healthscore],
      color: getColorByScore(asset.healthscore),
    })),
    yAxis: {
      title: {
        text: "Pontuação de saúde dos ativos",
      },
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    chart: {
      backgroundColor: "transparent",
      reflow: true,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: breakpoints.tablet,
          },
          chartOptions: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HealthChart;
