import styled from "styled-components";
import { breakpoints } from "ui-tokens/breakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;

  @media (max-width: ${breakpoints.tablet}px) {
    margin-top: 60px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export { Container, LoadingWrapper };
