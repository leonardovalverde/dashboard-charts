import { TitleProps } from "antd/es/typography/Title";
import { ReactNode } from "react";

export interface StyledTitleProps extends TitleProps {
  children: ReactNode;
  color?: string;
}
