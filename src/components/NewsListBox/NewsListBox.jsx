import React from "react";
import EachPageHeading from "../Common/EachPageHeading";
import { NewsListBoxDiv } from "./NewsListBox.styled";
import { Media, Badge, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import BikramSambatConverter from "../../lib/nepconverter";
import { Link } from "react-router-dom";
//const adTobs= requ ire('../Common/converter');

const NewsListBox = ({
  readmore,
  pill,
  image,
  title,
  pillText,
  engLang,
  noticetitle,
  date,
  slug,
  type,
}) => {
  let bsConvertor;
  let publishedDate;
  let bs_date;

  if (date) {
    bsConvertor = new BikramSambatConverter();

    publishedDate = new Date(date);

    bs_date = bsConvertor.eng_to_nep(
      publishedDate.getFullYear(),
      publishedDate.getMonth() + 1,
      publishedDate.getDate()
    );
  }

  return (
    <NewsListBoxDiv>
      {title && <EachPageHeading title={pillText} />}
      <Link to={`/media/${type}/${slug}`}>
        <Media className="news-generic-media">
          {image && (
            <img
              width={64}
              height={64}
              className="mr-3"
              src={image}
              alt="Imaggge"
            />
          )}

          <Media.Body>
            <Row>
              {date && (
                <Col>
                  <div className="date">
                    {engLang ? (
                      <Moment format="MMMM Do YYYY">{date}</Moment>
                    ) : (
                      <div>
                        {bs_date.day}, {bs_date.nmonth} {bs_date.date},{" "}
                        {bs_date.year}
                      </div>
                    )}
                  </div>
                </Col>
              )}
              {pill && (
                <Col>
                  <Badge pill variant="primary" className="news-generic-badge">
                    {pillText}
                  </Badge>
                </Col>
              )}
            </Row>
            <span className="news-excerpt">{noticetitle}</span>

            {readmore && (
              <div className="read-more">
                {engLang ? "Read More" : "सबै हेर्नुहोस्"}
              </div>
            )}
          </Media.Body>
        </Media>
      </Link>
    </NewsListBoxDiv>
  );
};

export default NewsListBox;
