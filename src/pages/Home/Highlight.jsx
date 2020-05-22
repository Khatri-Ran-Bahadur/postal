import React, { Fragment } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { Content } from '../../components/Common/Content';
import BikramSambatConverter from "../../lib/nepconverter";


const Highlight = ({engLang, news,tender,circular}) => {
  let heighliteEnglish = "";

  const HighlightHandler = (item) => {
    let date = item.node.date;
    let bs_date;
    if (date) {
      let bsConvertor = new BikramSambatConverter();
      let publishedDate = new Date(date);
      bs_date = bsConvertor.eng_to_nep(
        publishedDate.getFullYear(),
        publishedDate.getMonth() + 1,
        publishedDate.getDate()
      );
    }
    let mybs = bs_date.day + " , " + bs_date.nmonth + " , " + bs_date.date + " , " + bs_date.year;
    let englishdate = new Date(date);
    let mydate = engLang ? englishdate.getFullYear() + "-" + englishdate.getMonth() + "-" + englishdate.getDate() : mybs;
    let title = engLang ? item.node.title : item.node.Nepali.nepaliTitle;
    let html = "<span style='color:red'>" + mydate + "</span> &nbsp; &nbsp;" + title;
    heighliteEnglish += html + " , ";
  }

  if (news) {
    news.map((item) => {
      HighlightHandler(item);
    });
  }

  if (tender) {
    tender.map((item) => {
      HighlightHandler(item);
    });
  }

  if (circular) {
    circular.map((item) => {
      HighlightHandler(item);
    });
  }


  return (
    <HighlightDiv>
      <Row className="highlight-row">
        <Col xs={12} md={3} md={3} className="highlight">
          <span>
            <FormattedMessage id="home.highlight" defaultMessage="Highlight" />
          </span>
        </Col>
        <Col>
          <div className="actual-highlight">
            <marquee style={{marqueeSpeed: "fast"}}>
              <Highttext
                text={heighliteEnglish}
              />
            </marquee>
          </div>
        </Col>
      </Row>
    </HighlightDiv>
  );
};

const Highttext = ({ text }) => (
  
  <Fragment>
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
      }}
    >
      <span className="text" className="highlight-hover">
        <Content
          dangerouslySetInnerHTML={{
            __html: `${
              text
            }`
          }}
        ></Content>
      </span>
    </div>
  </Fragment>
);

export default Highlight;

const HighlightDiv = styled.div`
  margin-top: 2px;
  .highlight-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
    border: 1px #94949436 solid;
  }
  .highlight {
    background: #080d37;
    color: white;
    height: 3em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
  }
  .date {
    margin-left: 15px;
    color: red;
    font-weight: bold;
    margin-right: 10px;
  }
  .actual-highlight {
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;
  }
`;
