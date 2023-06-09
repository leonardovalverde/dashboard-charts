import { StyledTitle } from "../styles";

import { type StyledTitleProps } from "./types";

const Title = ({ children, color, ...rest }: StyledTitleProps): JSX.Element => {
  return (
    <StyledTitle color={color} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
