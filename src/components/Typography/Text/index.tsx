import { StyledText } from "../styles";
import { StyledTextProps } from "./types";

const Text = ({
  children,
  color,
  ...rest
}: StyledTextProps): JSX.Element => {
  return (
    <StyledText color={color} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;
