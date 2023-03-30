import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c5c5fe;
  width: 100vw;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFoundImage = styled.img`
  max-width: 100%;
  width: 20%;
`;

export { Container, ContentWrapper, NotFoundImage };
