import Paragraph from "components/Typography/Paragraph";
import Text from "components/Typography/Text";
import { Link } from "react-router-dom";

import { Container, ContentWrapper, NotFoundImage } from "./styles";

export const Error = (): JSX.Element => {
  return (
    <Container>
      <ContentWrapper>
        <NotFoundImage src="/assets/astronaut.webp" />
        <Paragraph>
          <strong>
            Ops, a página que você estava procurando não pôde ser encontrada =({" "}
          </strong>
        </Paragraph>
        <Link to="/">
          <Text>clique aqui para voltar à aplicação</Text>
        </Link>
      </ContentWrapper>
    </Container>
  );
};
