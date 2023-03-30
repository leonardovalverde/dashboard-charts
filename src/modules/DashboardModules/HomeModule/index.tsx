import { useEffect, useState } from "react";
import { Spin } from "antd";
import Text from "components/Typography/Text";
import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import { useGetAllAssetsQuery } from "services/assets/assets";
import { type IAsset } from "services/assets/types";

import { blue, red } from "@ant-design/colors";

import { getOnlyAsignedAssets } from "../utils/functions";

import HealthChart from "./components/HealthChart/HealthChart";
import Notifications from "./components/Notifications/Notifications";
import StatusChart from "./components/StatusChart/StatusChart";
import {
  ChartContainer,
  ChartWrapper,
  Container,
  LoadingContainer,
  NotificationWrapper,
} from "./styles";
import { type HomeModuleProps } from "./types";

const HomeModule = ({ userData }: HomeModuleProps): JSX.Element => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const {
    data: assetsData,
    isLoading: assetsLoading,
    isError: assetsIsError,
  } = useGetAllAssetsQuery();

  useEffect(() => {
    if (assetsData && userData.isAdmin) {
      setAssets(assetsData);
    } else if (assetsData) {
      setAssets(getOnlyAsignedAssets(assetsData, userData.id));
    }
  }, [assetsData, userData.id, userData.isAdmin]);

  useEffect(() => {
    highchartsAccessibility(Highcharts);
  }, []);

  return (
    <>
      {assetsLoading ? (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      ) : (
        <Container>
          <ChartContainer>
            <ChartWrapper>
              {assetsIsError ? (
                <Text color={red[6]}>Não foi possível carregar os dados</Text>
              ) : (
                <HealthChart assets={assets} />
              )}
            </ChartWrapper>
            <ChartWrapper backgroundColor={blue[1]}>
              {assetsIsError ? (
                <Text color={red[6]}>Não foi possível carregar os dados</Text>
              ) : (
                <StatusChart assets={assets} />
              )}
            </ChartWrapper>
          </ChartContainer>
          <NotificationWrapper>
            {assetsIsError ? (
              <Text color={red[6]}>Não foi possível carregar os dados</Text>
            ) : (
              <Notifications assets={assets} />
            )}
          </NotificationWrapper>
        </Container>
      )}
    </>
  );
};

export default HomeModule;
