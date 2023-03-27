import { TextProps } from "antd/es/typography/Text";
import { ReactNode } from "react";

export interface StyledTextProps extends TextProps {
  children: ReactNode;
  color?: string;
}
