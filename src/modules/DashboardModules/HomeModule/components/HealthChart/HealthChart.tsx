import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { HealthChartProps } from "./types";
import {
  getColorByScore,
  orderAssetsByScore,
} from "modules/DashboardModules/utils/functions";
import { useMemo } from "react";

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
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default HealthChart;
