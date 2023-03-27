import Sider from "antd/es/layout/Sider";
import styled from "styled-components";
import { spacings } from "ui-tokens/spacings";

const StyledSider = styled(Sider)`
  background-color: #001529;
  padding-top: ${spacings.x4}px;
`;

const CompanyContainer = styled.div`
  padding: 0 ${spacings.x7}px;
`;

export { StyledSider, CompanyContainer };
