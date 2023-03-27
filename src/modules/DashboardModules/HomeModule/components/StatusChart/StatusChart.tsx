import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { HealthChartProps } from "./types";
import {
  countAssetsWithStatus,
  getColorByStatus,
} from "modules/DashboardModules/utils/functions";
import { useMemo } from "react";
import { StatusTranslate } from "../../constants";


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
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default StatusChart;
