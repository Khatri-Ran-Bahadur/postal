import React from "react";
import styled from "styled-components";

const EachPageHeading = ({ title }) => {
  return <PageHeading className="header">{title}</PageHeading>;
};

export default EachPageHeading;

const PageHeading = styled.h4`
  display: inline-block;
  border-bottom: 2px solid #2460c2;
  font-size: 1.2em;
  font-weight: 800;
  text-transform: uppercase;
  padding: 8px;
  padding-left: 0px;
  color: #2460b9;
  margin-left: 5px;
`;
