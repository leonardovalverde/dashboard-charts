import { useEffect,useState } from "react";
import { Spin } from "antd";
import { useGetAllAssetsQuery } from "services/assets/assets";
import { type IAsset } from "services/assets/types";

import { blue } from "@ant-design/colors";

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

  const { data, isLoading } = useGetAllAssetsQuery();

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
