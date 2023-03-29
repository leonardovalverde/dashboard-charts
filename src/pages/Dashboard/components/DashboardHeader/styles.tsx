import { Divider, Menu, Typography } from "antd";
import styled from "styled-components";
import { spacings } from "ui-tokens/spacings";

import { blue } from "@ant-design/colors";
import { RadarChartOutlined } from "@ant-design/icons";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacings.x1}px ${spacings.x6}px;
  width: 100%;
  background-color: ${blue.primary};
  color: #fff;
  min-height: 60px;
`;

const HeaderLeftSection = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
`;

const HeaderRightSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const StyledDivider = styled(Divider)`
  background-color: #fff;
  height: unset;
`;

const StyledRadarChartOutlined = styled(RadarChartOutlined)`
  font-size: 24px;
  margin-right: ${spacings.x3}px;
`;

const StyledMenu = styled(Menu)`
  background-color: transparent;
  border: none;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacings.x0}px ${spacings.x5}px;
  color: #fff;
`;

const StyledText = styled(Typography.Text)`
  font-weight: 500;
  color: #fff;
`;

const DropDownWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export {
  Container,
  DropDownWrapper,
  HeaderLeftSection,
  HeaderRightSection,
  NameContainer,
  StyledDivider,
  StyledMenu,
  StyledRadarChartOutlined,
  StyledText,
};
