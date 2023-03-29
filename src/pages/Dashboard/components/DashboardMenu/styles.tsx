import Sider from "antd/es/layout/Sider";
import styled from "styled-components";
import { spacings } from "ui-tokens/spacings";

const StyledSider = styled(Sider)`
  position: relative;
  background-color: #001529;
  padding-top: ${spacings.x4}px;
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

export { StyledSider, CompanyContainer, ToggleAdminContainer };
