import React from "react";
import { RightToInformationSection } from "./RightToInformation.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Col, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import RightToInformationFile from "../../components/Common/RightToInformationFile";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const RightToInformation = (props) => {
  const rightToInformations = gql`
    {
      rightToInformations(
        where: { orderby: { field: MODIFIED, order: DESC } }
      ) {
        nodes {
          title
          rightToinfo {
            nepaliTitle
            timePeriod
            fileUpload {
              mediaItemUrl
            }
          }
        }
      }
    }
  `;

  return (
    <RightToInformationSection>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading
            title={props.engLang ? "Right To Information" : "सूचनाको-हक"}
          />
          <p className="lead">Download the attachments.</p>
          <Query query={rightToInformations}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              let rightToInformations = data.rightToInformations.nodes;
              return (
                <RightToInformationFile
                  data={rightToInformations}
                  engLang={props.engLang}
                />
              );
            }}
          </Query>
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </RightToInformationSection>
  );
};

export default RightToInformation;
