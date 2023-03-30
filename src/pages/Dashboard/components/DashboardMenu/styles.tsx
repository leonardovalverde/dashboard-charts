import Sider from "antd/es/layout/Sider";
import styled from "styled-components";
import { breakpoints } from "ui-tokens/breakpoints";
import { spacings } from "ui-tokens/spacings";

const StyledSider = styled(Sider)`
  position: relative;
  background-color: #001529;
  padding-top: ${spacings.x4}px;

  @media (max-width: ${breakpoints.tablet}px) {
    display: none;
  }
`;

const CompanyContainer = styled.div`
  padding: 0 ${spacings.x7}px;
`;

const ToggleAdminContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: ${spacings.x4}px;
`;

export { CompanyContainer, StyledSider, ToggleAdminContainer };
