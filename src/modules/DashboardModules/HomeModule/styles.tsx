import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { spacings } from "ui-tokens/spacings";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: calc(100vh - 60px);
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${blue[0]};
`;

const ChartWrapper = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor = "transparent" }) => backgroundColor};
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacings.x5}px;
  height: calc(100vh - 60px);
  justify-content: space-between;
  gap: ${spacings.x5}px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${blue[0]};
`;

export {
  Container,
  ChartContainer,
  ChartWrapper,
  NotificationWrapper,
  LoadingContainer,
};
