import { Badge, Card, Space } from "antd";
import Title from "components/Typography/Title";
import { getColorByStatus } from "modules/DashboardModules/utils/functions";

import { attentionStatus, StatusTranslate } from "../../constants";

import { Container, NotificationsWrapper, TitleWrapper } from "./styles";
import { type NotificationsProps } from "./types";

const Notifications = ({ assets }: NotificationsProps): JSX.Element => {
  return (
    <Container>
      <TitleWrapper>
        <Title level={3}>Notificações</Title>
      </TitleWrapper>
      <NotificationsWrapper>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {assets.map(
            (asset) =>
              attentionStatus.includes(asset.status) && (
                <Badge.Ribbon
                  text={StatusTranslate[asset.status]}
                  color={getColorByStatus(asset.status)}
                  key={asset.id}
                >
                  <Card title={asset.name} size="small">
                    Atenção! O ativo <strong>{asset.name}</strong> está com
                    status{" "}
                    <strong>
                      {StatusTranslate[asset.status].toLocaleLowerCase()}
                    </strong>
                  </Card>
                </Badge.Ribbon>
              )
          )}
        </Space>
      </NotificationsWrapper>
    </Container>
  );
};

export default Notifications;
