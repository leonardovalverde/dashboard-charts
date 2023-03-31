import { useEffect, useState } from "react";
import { Badge, Descriptions, Image, Progress, Spin, Tag } from "antd";
import Text from "components/Typography/Text";
import { format } from "date-fns";
import { StatusTranslate } from "modules/DashboardModules/HomeModule/constants";
import { LoadingWrapper } from "modules/DashboardModules/styles";
import { getColorByStatus } from "modules/DashboardModules/utils/functions";
import { useGetAssetsByIdQuery } from "services/assets/assets";
import { type IAsset } from "services/assets/types";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";

import { red } from "@ant-design/colors";

import { ProgressWrapper } from "./styles";
import { type AssetDetailsProps } from "./types";

const AssetDetails = ({ assetId }: AssetDetailsProps): JSX.Element => {
  const [assetData, setAssetData] = useState<IAsset>({} as IAsset);
  const {
    data: assetsData,
    isLoading: assetsLoading,
    isError: assetsIsError,
  } = useGetAssetsByIdQuery(assetId);
  const {
    data: unitData,
    isLoading: unitIsLoading,
    isError: unitIsError,
  } = useGetUnitByIdQuery(assetData.unitId);
  const {
    data: companyData,
    isLoading: companyIsLoading,
    isError: companyIsError,
  } = useGetCompanyByIdQuery(assetData.companyId);

  useEffect(() => {
    if (assetsData) {
      setAssetData(assetsData);
    }
  }, [assetsData]);

  return (
    <>
      {assetsLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Descriptions title={assetData.name} bordered>
          {assetsIsError && (
            <Text color={red[6]}>Erro ao carregar os dados do ativo</Text>
          )}
          <Descriptions.Item label="Empresa:">
            {companyIsLoading ? <Spin /> : companyData?.name}{" "}
            {companyIsError && (
              <Tag color="error">Não foi possível carregar</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Unidade:">
            {unitIsLoading ? <Spin /> : unitData?.name}{" "}
            {unitIsError && <Tag color="error">Não foi possível carregar</Tag>}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Especificações:">
            {assetData.specifications?.maxTemp && (
              <>Temperatura Máxima: {assetData.specifications.maxTemp}°C</>
            )}
            <br />
            {assetData.specifications?.rpm && (
              <>RPM (Rotações por minuto): {assetData.specifications.rpm}</>
            )}
            <br />
            {assetData.specifications?.power && (
              <>Potência: {assetData.specifications.power}W</>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Métricas:">
            Total de coletas: {assetData.metrics?.totalCollectsUptime}
            <br />
            Horas em funcionamento:{" "}
            {assetData.metrics?.totalUptime &&
              Math.round(assetData.metrics.totalUptime)}
            <br />
            Momento da última coleta:{" "}
            {assetData.metrics?.lastUptimeAt &&
              format(
                new Date(assetData.metrics.lastUptimeAt),
                "dd/MM/yyyy HH:mm:ss"
              )}
          </Descriptions.Item>
          <Descriptions.Item label="Sensores:" span={2}>
            {assetData.sensors?.map((sensor) => (
              <Tag color="blue" key={sensor}>
                {sensor}
              </Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Saúde:">
            {assetData?.healthscore && (
              <ProgressWrapper>
                <Progress
                  percent={assetData.healthscore}
                  status={assetData.healthscore < 60 ? "exception" : "active"}
                  showInfo={false}
                  style={{ width: "90%" }}
                />
                <Text>{assetData.healthscore}%</Text>
              </ProgressWrapper>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Estado:" span={3}>
            {assetData?.status && (
              <>
                <Badge color={getColorByStatus(assetData.status)} />{" "}
                {StatusTranslate[assetData.status]}
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Imagem (clique para ampliar):">
            {assetData?.image && <Image src={assetData.image} width={200} />}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default AssetDetails;
