import React from "react";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const AboutUs = ({ engLang }) => {
  let query = gql`
    {
      singlepost(id: "/about-us/", idType: SLUG) {
        content
        singlepost {
          nepali
        }
      }
    }
  `;
  const title = engLang
    ? "Introduction to Postal Service"
    : "हुलाक सेवा को लागी परिचय";

  return (
    <AboutUsDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              if (!error) {
                let aboutUsData = data.singlepost;

                return (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: `${
                        engLang
                          ? aboutUsData.content
                          : aboutUsData.singlepost.nepali
                      }`,
                    }}
                  ></Content>
                );
              }
            }}
          </Query>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </AboutUsDiv>
  );
};

export default AboutUs;

const AboutUsDiv = styled.div`
  padding: 10px;
`;
