import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col, Button } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const EachService = (props) => {
  const navigate = (to) => props.history.push(to);
  const { slug } = props.match.params;
  const engLang = props.engLang;
  const [serviceTtitle, setServiceTitle] = useState();
  let query = gql`
    {
      singleService(id: "${slug}", idType: SLUG) {
        title
        slug
        content
        featuredImage {
          mediaItemUrl
        }
        services {
          title
          description
        }
      }
    }
  `;

  useEffect(() => {}, [serviceTtitle]);

  const title = serviceTtitle;
  return (
    <EachServiceDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />

          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              if (!error) {
                let service = data.singleService;
                setServiceTitle(
                  engLang ? service.title : service.services.title
                );
                return (
                  <div>
                    <Content
                      dangerouslySetInnerHTML={{
                        __html: `${
                          engLang
                            ? service.content
                            : service.services.description
                        }`,
                      }}
                    ></Content>
                  </div>
                );
              }
            }}
          </Query>
          <Button variant="secondary" onClick={() => navigate("/services")}>
            {props.engLang ? "See All Servies" : "सबै सेवाहरु हेर्नु होस् "}
          </Button>
        </Col>

        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </EachServiceDiv>
  );
};

export default EachService;

const EachServiceDiv = styled.div`
  padding: 10px;
`;
