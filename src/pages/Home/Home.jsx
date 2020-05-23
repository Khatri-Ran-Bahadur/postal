import React, { useState, useEffect } from "react";
import { HomeStyled } from "./Home.styled";
import HomeCarousel from "./HomeCarousel";

import Highlight from "./Highlight";
import { Card, Row, Col, CardDeck, Button } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import HomePageNews from "../../components/NewsListBox/HomePageNews";
import gql from "graphql-tag";
import { Query, useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import { FormattedMessage } from "react-intl";
import { FacebookProvider, Page } from "react-facebook";
import { Content } from "../../components/Common/Content";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const Home = (props) => {
  // news state
  // const [allNews, setAllNews] = useState();
  // const [allTenders, setAllTenders] = useState();
  // const [allCirculars, setAllCirculars] = useState();
  // const [allServices, setAllServices] = useState();

  // useEffect(() => {}, [allNews, allTenders, allCirculars, allServices]);
  const navigate = (to) => props.history.push(to);

  const NewsQuery = gql`
    {
      allNewsAndNotices(last: 3) {
        edges {
          node {
            title
            date
            slug
            Nepali {
              nepaliTitle
              description
            }
          }
        }
      }
    }
  `;

  const NewsTender = gql`
    {
      allTenderNotice(last: 3) {
        edges {
          node {
            title
            date
            slug
            Nepali {
              nepaliTitle
            }
          }
        }
      }
    }
  `;

  const Circulars = gql`
    {
      allCirculars(last: 3) {
        edges {
          node {
            title
            date
            slug
            Nepali {
              nepaliTitle
            }
          }
        }
      }
    }
  `;

  const Staffs = gql`
    {
      staffs {
        edges {
          node {
            staff {
              name
              photo {
                mediaItemUrl
              }
              designation
              officeNumber
              sn
            }
          }
        }
      }
    }
  `;
  const Services = gql`
    {
      allServices(last: 4) {
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

  const { loading, error, data } = useQuery(Staffs);

  let firstStaff = [];
  let secondStaff = [];

  if (!loading & !error) {
    firstStaff = data.staffs.edges.filter((item) => {
      return item.node.staff.sn === 1;
    });
    secondStaff = data.staffs.edges.filter((item) => {
      return item.node.staff.sn === 2;
    });
  }

  const newsandnotice = props.engLang ? "NOTICES & NEWS" : "समाचार तथा सूचना";
  const tendernotice = props.engLang ? "TENDER NOTICE" : "बोलपत्र";
  const circularnotice = props.engLang ? "CIRCULAR" : "परिपत्र";

  return (
    <HomeStyled>
      <div className="carousel-wrapper">
        <HomeCarousel />
        {/* <Highlight
          engLang={props.engLang}
          news={allNews}
          tender={allTenders}
          circular={allCirculars}
        /> */}
        {/* <Highlight news={allNews} /> */}
        <div className="services">
          <CardDeck className="news">
            <Card>
              <Query query={NewsQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner />;
                  }

                  if (!error) {
                    let news = data.allNewsAndNotices.edges;

                    return (
                      <HomePageNews
                        pill={true}
                        type="news"
                        pillText={newsandnotice}
                        data={news}
                        engLang={props.engLang}
                      />
                    );
                  } else {
                    return <Spinner />;
                  }
                }}
              </Query>
              <div className="readmore">
                <Button
                  className="primary"
                  onClick={() => navigate("/media/news")}
                >
                  {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                </Button>
              </div>
            </Card>
            <Card>
              <Query query={NewsTender}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner />;
                  }

                  if (!error) {
                    let tender = data.allTenderNotice.edges;
                    return (
                      <HomePageNews
                        pill={true}
                        type="tender"
                        pillText={tendernotice}
                        data={tender}
                        engLang={props.engLang}
                      />
                    );
                  }
                }}
              </Query>

              <div className="readmore">
                <Button
                  className="primary "
                  onClick={() => navigate("/media/tender")}
                >
                  {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                </Button>
              </div>
            </Card>
            <Card>
              <Query query={Circulars}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return <Spinner />;
                  }
                  if (!error) {
                    let circulars = data.allCirculars.edges;
                    return (
                      <HomePageNews
                        type="circular"
                        pill={true}
                        pillText={circularnotice}
                        data={circulars}
                        engLang={props.engLang}
                      />
                    );
                  }
                }}
              </Query>
              <div className="readmore">
                <Button
                  className="primary"
                  onClick={() => navigate("/media/circular")}
                >
                  {props.engLang ? "View All" : "सबै हेर्नुहोस्"}
                </Button>
              </div>
            </Card>

            {/** Todo: */}
            {firstStaff[0] ? (
              <Card className="director-card">
                <img
                  style={{ borderRadius: "50%" }}
                  className="director-img"
                  src={firstStaff[0].node.staff.photo.mediaItemUrl}
                />
                <div className="director-desc">
                  <h5>{firstStaff[0] && firstStaff[0].node.staff.name}</h5>
                  <p>
                    {firstStaff[0] && firstStaff[0].node.staff.designation}{" "}
                  </p>
                  <p>
                    {firstStaff[0] && firstStaff[0].node.staff.officeNumber}
                  </p>
                </div>
              </Card>
            ) : (
              <Spinner />
            )}
          </CardDeck>
          <div style={{ float: "left" }}>
            <EachPageHeading
              title={props.engLang ? "Our Servies" : "हाम्रा सेवाहरु"}
            />
          </div>
          <hr />
          <div>
            <Row>
              <Query query={Services}>
                {({ loading, error, data }) => {
                  if (loading) return <Spinner />;

                  if (!error) {
                    return (
                      <Col md={9}>
                        <Row>
                          <CardDeck>
                            {data.allServices.edges &&
                              data.allServices.edges.map((service, index) => (
                                <Col md={3} key={index}>
                                  <Card style={{ margin: "0" }}>
                                    <Card.Img
                                      variant="top"
                                      src={
                                        service.node.featuredImage.mediaItemUrl
                                      }
                                    />
                                    <Card.Body style={{ minHeight: "230px" }}>
                                      <Card.Title>
                                        {props.engLang
                                          ? service.node.title
                                          : service.node.services.title}
                                      </Card.Title>
                                      <Card.Text>
                                        <Content
                                          dangerouslySetInnerHTML={{
                                            __html: `${
                                              props.engLang
                                                ? service.node.content.substring(
                                                    0,
                                                    100
                                                  ) + "..."
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
                                          navigate(
                                            "/services/" + service.node.slug
                                          )
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
                    );
                  }
                }}
              </Query>
              <Col md={3}>
                {secondStaff[0] ? (
                  <Card className="director-card">
                    <img
                      style={{ borderRadius: "50%" }}
                      className="director-img"
                      src={secondStaff[0].node.staff.photo.mediaItemUrl}
                    />
                    <div className="director-desc">
                      <h5>
                        {secondStaff[0] && secondStaff[0].node.staff.name}
                      </h5>
                      <p>
                        {secondStaff[0] &&
                          secondStaff[0].node.staff.designation}{" "}
                      </p>
                      <p>
                        {secondStaff[0] &&
                          secondStaff[0].node.staff.officeNumber}
                      </p>
                    </div>
                  </Card>
                ) : (
                  <Spinner />
                )}
              </Col>
            </Row>
            <Row>
              <Button className="primary" onClick={() => navigate("/services")}>
                {props.engLang ? "See All Servies" : "सबै सेवाहरु हेर्नु होस् "}
              </Button>
            </Row>
          </div>
        </div>
        <br />
        <CardDeck className="home-last-section">
          <Card onClick={() => navigate("/gallery")}>
            <EachPageHeading
              title={
                <FormattedMessage
                  id="home.ourgallery"
                  defaultMessage="Our Gallery"
                />
              }
            />
            <Card.Img></Card.Img>
            <Card.Body>Photos from World Post Day 2019</Card.Body>
          </Card>
          <Card onClick={() => navigate("/publications")}>
            <EachPageHeading
              title={
                <FormattedMessage
                  id="home.ourpublication"
                  defaultMessage="Our Publications"
                />
              }
            />
            <Card.Img></Card.Img>
            <Card.Body>Our Publication</Card.Body>
          </Card>
          <Card>
            <EachPageHeading
              title={
                <FormattedMessage
                  id="home.ourfacebook"
                  defaultMessage="Our Facebook"
                />
              }
            />
            <Card.Img></Card.Img>
            <Card.Body>
              <FacebookProvider appId="212716196805650">
                <Page href="https://www.facebook.com" tabs="timeline" />
              </FacebookProvider>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    </HomeStyled>
  );
};

export default Home;
