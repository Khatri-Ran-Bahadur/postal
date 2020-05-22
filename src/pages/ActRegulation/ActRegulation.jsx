import React from "react";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import EachPageHeading from "../../components/Common/EachPageHeading";
import FileAndDownloadTableAct from "../../components/Common/FileAndDownloadTableAct";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Spinner from "../../components/Common/Spinner";

const ActRegulation = (props) => {
  const ActAndReguation = gql`
    {
      actandRegulations {
        edges {
          node {
            title
            actandregulation {
              file {
                mediaItemUrl
              }
            }
            slug
            date
          }
        }
      }
    }
  `;

  return (
    <ActRegulationDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Act And Regulation" : "ऐन तथा नियमावली"}
          />
          <p className="lead">Download the attachments.</p>
          <Query query={ActAndReguation}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              let actandregulation = data.actandRegulations.edges;
              return <FileAndDownloadTableAct data={actandregulation} />;
            }}
          </Query>
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </ActRegulationDiv>
  );
};

export default ActRegulation;

const ActRegulationDiv = styled.div`
  padding: 10px;
`;
