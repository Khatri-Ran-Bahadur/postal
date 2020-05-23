import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Card, Row, Col, CardDeck, Button } from "react-bootstrap";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Content } from "../../components/Common/Content";
import Spinner from "../../components/Common/Spinner";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const AllServices = (props) => {
  let engLang = props.engLang;
  const [allServices, setAllServices] = useState();
  useEffect(() => {}, [allServices]);
  const navigate = (to) => props.history.push(to);

  const Services = gql`
    {
      allServices {
        edges {
          node {
            title
            content
            slug
            featuredImage {
              mediaItemUrl
            }
            services {
              title
              description
            }
          }
        }
      }
    }
  `;

  const title = engLang ? "All Services" : "सबै सेवाहरु";
  return (
    <AllServicesDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          <Row>
            <CardDeck>
              <Query query={Services}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner />;
                  }
                  if (!error) {
                    let services = data.allServices.edges;
                    setAllServices(services);
                    return <span></span>;
                  }
                }}
              </Query>
              {allServices &&
                allServices.map((service, index) => (
                  <Col md={4} key={index} style={{ marginBottom: "10px" }}>
                    <Card style={{ margin: "0" }}>
                      <Card.Img
                        variant="top"
                        src={service.node.featuredImage.mediaItemUrl}
                      />
                      <Card.Body style={{ minHeight: "230px" }}>
                        <Card.Title>
                          {engLang
                            ? service.node.title
                            : service.node.services.title}
                        </Card.Title>
                        <Card.Text>
                          <Content
                            dangerouslySetInnerHTML={{
                              __html: `${
                                engLang
                                  ? service.node.content.substring(0, 100) +
                                    "..."
                                  : service.node.services.description.substring(
                                      0,
                                      100
                                    ) + "..."
                              }`,
                            }}
                          ></Content>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <Button
                          className="primary"
                          onClick={() =>
                            navigate("/services/" + service.node.slug)
                          }
                        >
                          Read More
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </CardDeck>
          </Row>
        </Col>

        <Col xs={12} md={4} lg={4}>
          <CollectionNewsListBox type="News & Notice" engLang={engLang} />
        </Col>
      </Row>
    </AllServicesDiv>
  );
};

export default AllServices;

const AllServicesDiv = styled.div`
  padding: 20px;
`;
