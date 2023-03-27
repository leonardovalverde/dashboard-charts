import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { spacings } from "ui-tokens/spacings";

const Container = styled.div`
  display: flex;
  padding: ${spacings.x5}px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${blue[0]};
  border-radius: 20px;
  overflow-y: hidden;
`;

const TitleWrapper = styled.div`
  padding: 0 ${spacings.x5}px;
`;

const NotificationsWrapper = styled.div`
  padding: ${spacings.x5}px;
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #d62929;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: transparent;
  }
`;

export { Container, NotificationsWrapper, TitleWrapper };
