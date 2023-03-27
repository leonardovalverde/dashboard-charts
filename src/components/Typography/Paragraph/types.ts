import { ParagraphProps } from "antd/es/typography/Paragraph";
import { ReactNode } from "react";

export interface StyledParagraphProps extends ParagraphProps {
  children: ReactNode;
  color?: string;
}
