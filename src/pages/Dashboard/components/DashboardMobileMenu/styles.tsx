import styled from "styled-components";
import { breakpoints } from "ui-tokens/breakpoints";
import { spacings } from "ui-tokens/spacings";

const Container = styled.div`
  display: none;
  position: fixed;
  z-index: 10;
  top: 60px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #001529;
  @media (max-width: ${breakpoints.tablet}px) {
    display: block;
  }
`;

const UserInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: ${spacings.x3}px ${spacings.x6}px;
`;

const SignOutButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: ${spacings.x5}px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 10;
  width: 90%;
`;

const SwitchContainer = styled.div`
  display: flex;
  margin: ${spacings.x6}px 0 ${spacings.x6}px ${spacings.x6}px;
`;

export { Container, SignOutButtonWrapper, SwitchContainer, UserInfoWrapper };
