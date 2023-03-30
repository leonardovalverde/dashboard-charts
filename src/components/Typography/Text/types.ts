import { type ReactNode } from "react";
import { type TextProps } from "antd/es/typography/Text";

export interface StyledTextProps extends TextProps {
  children: ReactNode;
  color?: string;
}
