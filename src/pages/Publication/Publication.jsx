import React from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";

const Publication = () => {
  return (
    <PublicationDiv>
      <EachPageHeading title="Publication" />
    </PublicationDiv>
  );
};

export default Publication;

const PublicationDiv = styled.div`
  padding: 10px;
`;
