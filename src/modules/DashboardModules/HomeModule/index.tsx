import { useState, useEffect } from "react";
import { useGetAllAssetsQuery } from "services/assets/assets";
import { IAsset } from "services/assets/types";
import { getOnlyAsignedAssets } from "../utils/functions";
import { HomeModuleProps } from "./types";
import { blue } from "@ant-design/colors";
import {
  ChartContainer,
  ChartWrapper,
  Container,
  LoadingContainer,
  NotificationWrapper,
} from "./styles";
import HealthChart from "./components/HealthChart/HealthChart";
import StatusChart from "./components/StatusChart/StatusChart";
import Notifications from "./components/Notifications/Notifications";
import { Spin } from "antd";

const HomeModule = ({ userData }: HomeModuleProps): JSX.Element => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const { data, isLoading, error } = useGetAllAssetsQuery();

  useEffect(() => {
    if (data && userData.isAdmin) {
      setAssets(data);
    } else if (data) {
      setAssets(getOnlyAsignedAssets(data, userData.id));
    }
  }, [data, userData.id, userData.isAdmin]);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <Spin />
        </LoadingContainer>
      ) : (
        <Container>
          <ChartContainer>
            <ChartWrapper>
              <HealthChart assets={assets} />
            </ChartWrapper>
            <ChartWrapper backgroundColor={blue[1]}>
              <StatusChart assets={assets} />
            </ChartWrapper>
          </ChartContainer>
          <NotificationWrapper>
            <Notifications assets={assets} />
          </NotificationWrapper>
        </Container>
      )}
    </>
  );
};

export default HomeModule;
