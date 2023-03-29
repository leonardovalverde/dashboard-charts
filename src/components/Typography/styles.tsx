import { Typography as AntdTypography } from "antd";
import styled from "styled-components";

import { gray } from "@ant-design/colors";

const { Paragraph, Text, Title } = AntdTypography;

const StyledParagraph = styled(Paragraph)<{ color?: string }>`
  ${({ color = gray[12] }) => `color: ${color};`}
`;

const StyledText = styled(Text)<{ color?: string }>`
  ${({ color = gray[12] }) => `color: ${color};`}
`;

const StyledTitle = styled(Title)<{ color?: string }>`
  ${({ color = gray[12] }) => `color: ${color};`};
`;

export { StyledParagraph, StyledText, StyledTitle };
