import React from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Spinner from "../../components/Common/Spinner";
import { Row, Col } from "react-bootstrap";
import { Content } from "../../components/Common/Content";
import "./style.css";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const CitizenCharter = ({ engLang }) => {
  let query = gql`
    {
      singlepost(id: "/citizen-chrater/", idType: SLUG) {
        content
        title
        singlepost {
          nepali
        }
      }
    }
  `;

  const title = engLang ? "CITIZEN CHARTER" : "नागरिक बडापत्र";
  const header = engLang ? (
    <div className="lead-header ">
      <div>Government of Nepal</div>
      <div>Department of Postal Service</div>
      <div>Department of Postal Service </div>
      <div>Citizen Charter</div>
    </div>
  ) : (
    <div className="lead-header ">
      <div>नेपाल सरकार</div>
      <div>सञ्‍चार तथा सूचना प्रविधि मन्‍त्रालय </div>
      <div>हुलाक सेवा विभाग</div>
      <div>नागरिक बडापत्र</div>
    </div>
  );
  return (
    <CitizenCharterDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={title} />
          {/* <div className="lead-header ">{header}</div> */}
          <Query query={query}>
            {({ loading, error, data }) => {
              if (loading) {
                return <Spinner />;
              }
              if (!error) {
                let aboutUsData = data.singlepost;

                return (
                  <Content
                    dangerouslySetInnerHTML={{
                      __html: `${
                        engLang
                          ? aboutUsData.content
                          : aboutUsData.singlepost.nepali
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
    </CitizenCharterDiv>
  );
};

export default CitizenCharter;

const CitizenCharterDiv = styled.div`
  padding: 10px;
  .lead-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
  }
`;
