import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import styled from "styled-components";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const EachTender = (props) => {
  const { slug } = props.match.params;
  const engLang = props.engLang;

  let gqlLiteral = `
    {
      tender:singleTenderNotice(id: "${slug}", idType: SLUG) {
        content
        title
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
      <EachTenderDiv>
        <Row>
          <Col xs={12} md={8} lg={8}>
            <EachPageHeading
              title={
                engLang ? data.tender.title : data.tender.Nepali.nepaliTitle
              }
            />
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: engLang
                    ? data.tender.content
                    : data.tender.Nepali.description,
                }}
              ></div>
            </div>
          </Col>
          <Col>
            <CollectionNewsListBox type="News & Notice" engLang={engLang} />
          </Col>
        </Row>
      </EachTenderDiv>
    );
};

export default EachTender;

const EachTenderDiv = styled.div`
  padding: 10px;
`;
