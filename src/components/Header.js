import styled from "@emotion/styled";
import React from "react";

const Container = styled.header`
  width: 100%;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: #c1c1c1 0 0 6px 5px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: rgb(17, 24, 39);

    @media screen (min-width: 550px) {
      font-size: 28px;
    }
  }
`;

const Header = () => {
  return (
    <Container>
      <h3>React Interview Q1</h3>
    </Container>
  );
};

Header.propTypes = {};

export default Header;
