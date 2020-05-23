import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const UnderneathOrg = ({ engLang }) => {
  let query = gql`
    {
      singlepost(id: "/underneath-organization/", idType: SLUG) {
        content
        singlepost {
          nepali
        }
      }
    }
  `;

  return (
    <UnderneathOrgDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={
              engLang
                ? "UNDERNEATH ORGANIZATIONS"
                : "कार्यालय अन्तर्गतका निकायहरू "
            }
          />
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              if (!error) {
                let underneathOrg = data.singlepost;
                return (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: `${
                        engLang
                          ? underneathOrg.content
                          : underneathOrg.singlepost.nepali
                      }`,
                    }}
                  ></Content>
                );
              }
            }}
          </Query>
        </Col>

        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </UnderneathOrgDiv>
  );
};

export default UnderneathOrg;

const UnderneathOrgDiv = styled.div`
  padding: 10px;
`;
