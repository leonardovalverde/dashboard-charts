import { useMemo } from "react";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import {
  countAssetsWithStatus,
  getColorByStatus,
} from "modules/DashboardModules/utils/functions";
import { breakpoints } from "ui-tokens/breakpoints";

import { StatusTranslate } from "../../constants";

import { type HealthChartProps } from "./types";

const StatusChart = ({ assets }: HealthChartProps): JSX.Element => {
  const statusCounter = useMemo(() => countAssetsWithStatus(assets), [assets]);

  const options: Highcharts.Options = {
    title: {
      text: "Ativos por status",
    },
    series: statusCounter.map((status) => ({
      type: "bar",
      name: StatusTranslate[status.status],
      data: [status.count],
      color: getColorByStatus(status.status),
    })),
    yAxis: {
      title: {
        text: "Número de ativos por status",
      },
    },
    xAxis: {
      labels: {
        enabled: false,
      },
    },
    chart: {
      backgroundColor: "transparent",
      type: "bar",
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

export default StatusChart;
