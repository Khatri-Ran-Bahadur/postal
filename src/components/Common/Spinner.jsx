import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Spinner = () => {
  return (
    <SpinnerStyled>
      <Loader type="Oval" color="#0a3c86 " height={80} width={80} />
      <span>Loading</span>
    </SpinnerStyled>
  );
};

export default Spinner;

const SpinnerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin: auto; */
  margin: 4em;

  span {
    margin-top: 1em;
    color: black;
  }
`;
