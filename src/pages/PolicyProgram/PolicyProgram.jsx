import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const PolicyProgram = ({ engLang }) => {
  let query = gql`
    {
      singlepost(id: "/policy-and-programmes/", idType: SLUG) {
        content
        slug
        singlepost {
          nepali
        }
      }
    }
  `;
  const title = engLang ? "Policy Program" : "नीति तथा कार्यक्रम";
  return (
    <PolicyProgramDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              console.log(error);

              if (!error) {
                let policyData = data.singlepost;
                return (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: `${
                        engLang
                          ? policyData.content
                          : policyData.singlepost.nepali
                      }`,
                    }}
                  ></Content>
                );
              } else {
                return <Spinner />;
              }
            }}
          </Query>
        </Col>

        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </PolicyProgramDiv>
  );
};

export default PolicyProgram;

const PolicyProgramDiv = styled.div`
  padding: 10px;
`;
