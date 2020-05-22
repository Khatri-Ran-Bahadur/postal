import React from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";

const PressRelease = () => {
  return (
    <PressReleaseDiv>
      <EachPageHeading title="Press Release" />
    </PressReleaseDiv>
  );
};

export default PressRelease;

const PressReleaseDiv = styled.div`
  padding: 10px;
`;
