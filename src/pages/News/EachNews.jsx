import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import styled from "styled-components";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const EachNews = (props) => {
  const { slug } = props.match.params;
  const engLang = props.engLang;

  let gqlLiteral = `
    {
      news:singleNewsAndNotices(id: "${slug}", idType: SLUG) {
        content
        id
        title
        slug
        Nepali {
          description
          nepaliTitle
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(gql(gqlLiteral));

  if (loading) {
    return <Spinner />;
  }

  if (!error)
    return (
      <EachNewsDiv>
        <Row>
          <Col xs={12} md={8} lg={8}>
            <EachPageHeading
              title={engLang ? data.news.title : data.news.Nepali.nepaliTitle}
            />
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: engLang
                    ? data.news.content
                    : data.news.Nepali.description,
                }}
              ></div>
            </div>
          </Col>
          <Col>
            <CollectionNewsListBox type="News & Notice" engLang={engLang} />
          </Col>
        </Row>
      </EachNewsDiv>
    );
};

export default EachNews;

const EachNewsDiv = styled.div`
  padding: 10px;
`;
