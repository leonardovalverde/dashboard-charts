import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100vw;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

export { Container, ContentWrapper };
