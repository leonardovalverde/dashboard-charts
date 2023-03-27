import { Typography as AntdTypography } from "antd";
import styled from "styled-components";

const { Paragraph, Text, Title } = AntdTypography;

const StyledParagraph = styled(Paragraph)<{ color?: string }>`
  ${({ color }) => color && `color: ${color};`}
`;

const StyledText = styled(Text)<{ color?: string }>`
  ${({ color }) => color && `color: ${color};`}
`;

const StyledTitle = styled(Title)<{ color?: string }>`
  ${({ color }) => color && `color: ${color};`};
`;

export { StyledParagraph, StyledText, StyledTitle };
