import { Form } from "antd";
import styled from "styled-components";
import { breakpoints } from "../../../../ui-tokens/breakpoints";
import { spacings } from "../../../../ui-tokens/spacings";

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  width: 100%;
  max-width: 800px;

  @media (max-width: ${breakpoints.tablet}px) {
    grid-template-columns: 1fr;
    max-width: 80%;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${spacings.x6}px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  @media (max-width: ${breakpoints.tablet}px) {
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
`;

const QuoteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  gap: ${spacings.x4}px;
  padding: ${spacings.x6}px;
  background-color: rgba(255, 255, 255, 0.4);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  @media (max-width: ${breakpoints.tablet}px) {
    border-top-right-radius: 0;
    border-bottom-left-radius: 10px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${spacings.x2}px;
`;

const RightAlignedItem = styled(Form.Item)`
  text-align: right;
  align-self: flex-end;

  button {
    display: flex;
    align-items: center;
  }
`;

export { Container, FormWrapper, QuoteWrapper, StyledForm, RightAlignedItem };
