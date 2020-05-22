import React from "react";
import { ActivitiesDiv } from "./Activities.styled";
import EachPageHeading from "../../components/Common/EachPageHeading";
import { Row, Col } from "react-bootstrap";
import CollectionNewsListBox from "../../components/Common/CollectionNewsListBox";

const Activities = (props) => {
  return (
    <ActivitiesDiv>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <EachPageHeading title={`Activities`} />
          <p>activity 12</p>
        </Col>
        <Col>
          <CollectionNewsListBox type="News & Notice" engLang={props.engLang} />
        </Col>
      </Row>
    </ActivitiesDiv>
  );
};

export default Activities;
