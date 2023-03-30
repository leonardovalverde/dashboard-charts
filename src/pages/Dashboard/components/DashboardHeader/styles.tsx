import { Divider, Menu, Typography } from "antd";
import styled from "styled-components";
import { breakpoints } from "ui-tokens/breakpoints";
import { spacings } from "ui-tokens/spacings";

import { blue } from "@ant-design/colors";
import { MenuFoldOutlined, MenuUnfoldOutlined,RadarChartOutlined } from "@ant-design/icons";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacings.x1}px ${spacings.x6}px;
  width: 100%;
  background-color: ${blue.primary};
  color: #fff;
  min-height: 60px;

  @media (max-width: ${breakpoints.tablet}px) {
    padding: ${spacings.x1}px ${spacings.x3}px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
  }
`;

const HeaderLeftSection = styled.div`
  display: flex;
  width: 50%;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}px) {
    width: 100%;
    justify-content: space-between;
  }

  button {
    display: none;
    @media (max-width: ${breakpoints.tablet}px) {
      display: block;
    }
  }
`;

const HeaderRightSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}px) {
    display: none;
  }
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

const StyledMenuUnfoldOutlined = styled(MenuUnfoldOutlined)`
  font-size: 18px;
`;

const StyledMenuFoldOutlined = styled(MenuFoldOutlined)`
  font-size: 18px;
`;

export {
  Container,
  DropDownWrapper,
  HeaderLeftSection,
  HeaderRightSection,
  NameContainer,
  StyledDivider,
  StyledMenu,
  StyledMenuFoldOutlined,
  StyledMenuUnfoldOutlined,
  StyledRadarChartOutlined,
  StyledText,
};
