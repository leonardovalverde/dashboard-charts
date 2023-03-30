import styled from "styled-components";
import { breakpoints } from "ui-tokens/breakpoints";
import { spacings } from "ui-tokens/spacings";

import { blue } from "@ant-design/colors";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  height: calc(100vh - 60px);
  width: 100%;

  @media (max-width: ${breakpoints.tablet}px) {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${blue[0]};
`;

const ChartWrapper = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor = "transparent" }) => backgroundColor};
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;

  @media (max-width: ${breakpoints.tablet}px) {
    width: 100vw;
  }
`;

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacings.x5}px;
  height: calc(100vh - 60px);
  justify-content: space-between;
  gap: ${spacings.x5}px;

  @media (max-width: ${breakpoints.tablet}px) {
    width: 100vw;
  }
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
  ChartContainer,
  ChartWrapper,
  Container,
  LoadingContainer,
  NotificationWrapper,
};
