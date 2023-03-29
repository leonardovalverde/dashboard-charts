import styled from "styled-components";

import { blue,green, red } from "@ant-design/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: linear-gradient(
    90deg,
    ${red[1]} 0%,
    ${green[1]} 50%,
    ${blue[1]} 100%
  );
  height: 100vh;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  text-align: center;
`;

export { Container, Footer };
