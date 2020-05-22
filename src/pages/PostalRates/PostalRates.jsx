import React from "react";
import { PostalRatesSection } from "./PostalRates.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Col, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import FileAndDownloadTable from "../../components/Common/FileAndDownloadTable";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const PostalRates = (props) => {
  const PostalRates = gql`
    {
      postalRates {
        edges {
          node {
            title
            date
            slug
            PostalRates {
              file {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `;

  return (
    <PostalRatesSection>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Postal Rates" : "हुलाक दर"}
          />
          <p className="lead">Download the attachments.</p>
          <Query query={PostalRates}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              let postalRates = data.postalRates.edges;
              return <FileAndDownloadTable data={postalRates} />;
            }}
          </Query>
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </PostalRatesSection>
  );
};

export default PostalRates;
