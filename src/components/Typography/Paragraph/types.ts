import { type ReactNode } from "react";
import { type ParagraphProps } from "antd/es/typography/Paragraph";

export interface StyledParagraphProps extends ParagraphProps {
  children: ReactNode;
  color?: string;
}
