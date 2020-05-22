import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import styled from "styled-components";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const EachCircular = (props) => {
  const { slug } = props.match.params;
  const engLang = props.engLang;

  let gqlLiteral = `
    {
      circular:singleCircular(id: "${slug}", idType: SLUG) {
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
      <EachCircularDiv>
        <Row>
          <Col xs={12} md={8} lg={8}>
            <EachPageHeading
              title={
                engLang ? data.circular.title : data.circular.Nepali.nepaliTitle
              }
            />
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: engLang
                    ? data.circular.content
                    : data.circular.Nepali.description,
                }}
              ></div>
            </div>
          </Col>
          <Col>
            <CollectionNewsListBox
              type="News & Notice"
              engLang={props.engLang}
            />
          </Col>
        </Row>
      </EachCircularDiv>
    );
};

export default EachCircular;

const EachCircularDiv = styled.div`
  padding: 10px;
`;
