import { type ReactNode } from "react";
import { type TitleProps } from "antd/es/typography/Title";

export interface StyledTitleProps extends TitleProps {
  children: ReactNode;
  color?: string;
}
