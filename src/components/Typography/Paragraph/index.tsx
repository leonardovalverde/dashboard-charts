import { StyledParagraph } from "../styles";

import { type StyledParagraphProps } from "./types";

const Paragraph = ({
  children,
  color,
  ...rest
}: StyledParagraphProps): JSX.Element => {
  return (
    <StyledParagraph color={color} {...rest}>
      {children}
    </StyledParagraph>
  );
};

export default Paragraph;
