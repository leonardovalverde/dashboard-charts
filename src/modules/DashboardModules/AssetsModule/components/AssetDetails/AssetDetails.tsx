import { Badge, Descriptions, Image, Progress, Spin, Tag } from "antd";
import { useGetAssetsByIdQuery } from "services/assets/assets";
import { AssetDetailsProps } from "./types";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";
import { useState, useEffect } from "react";
import { IAsset } from "services/assets/types";
import { ProgressWrapper } from "./styles";
import { format } from "date-fns";
import { getColorByStatus } from "modules/DashboardModules/utils/functions";
import { StatusTranslate } from "modules/DashboardModules/HomeModule/constants";
import Text from "components/Typography/Text";
import { LoadingWrapper } from "../../styles";

const AssetDetails = ({ assetId }: AssetDetailsProps): JSX.Element => {
  const { data, isLoading, error } = useGetAssetsByIdQuery(assetId);
  const [assetData, setAssetData] = useState<IAsset>({} as IAsset);
  const {
    data: unitData,
    isLoading: unitIsLoading,
    error: unitError,
  } = useGetUnitByIdQuery(assetData.unitId);
  const {
    data: companyData,
    isLoading: companyIsLoading,
    error: companyError,
  } = useGetCompanyByIdQuery(assetData.companyId);

  useEffect(() => {
    if (data) {
      setAssetData(data);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Descriptions title={data?.name} bordered>
          <Descriptions.Item label="Empresa:">
            {companyIsLoading ? <Spin /> : companyData?.name}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Unidade:">
            {unitIsLoading ? <Spin /> : unitData?.name}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Especificações:">
            Temperatura Máxima: {data?.specifications.maxTemp}°C
            <br />
            {data?.specifications.rpm && (
              <>RPM (Rotações por minuto): {data?.specifications.rpm}</>
            )}
            <br />
            {data?.specifications.power && (
              <>Potência: {data?.specifications.power}W</>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Métricas:">
            Total de coletas: {data?.metrics.totalCollectsUptime}
            <br />
            Horas em funcionamento:{" "}
            {data?.metrics.totalUptime && Math.round(data?.metrics.totalUptime)}
            <br />
            Momento da última coleta:{" "}
            {data?.metrics.lastUptimeAt &&
              format(
                new Date(data?.metrics.lastUptimeAt),
                "dd/MM/yyyy HH:mm:ss"
              )}
          </Descriptions.Item>
          <Descriptions.Item label="Sensores:" span={2}>
            {data?.sensors.map((sensor) => (
              <Tag color="blue">{sensor}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Saúde:">
            {data?.healthscore && (
              <ProgressWrapper>
                <Progress
                  percent={data?.healthscore}
                  status={data?.healthscore < 60 ? "exception" : "active"}
                  showInfo={false}
                  style={{ width: "90%" }}
                />
                <Text>{data?.healthscore}%</Text>
              </ProgressWrapper>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Estado:" span={3}>
            {data?.status && (
              <>
                <Badge color={getColorByStatus(data?.status)} />{" "}
                {StatusTranslate[data?.status]}
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Imagem (clique para ampliar):">
            {data?.image && <Image src={data?.image} width={200} />}
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default AssetDetails;
