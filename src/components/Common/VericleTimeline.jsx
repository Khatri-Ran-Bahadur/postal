import React from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import NewsListBox from "../NewsListBox/NewsListBox";
import styled from "styled-components";
import BikramSambatConverter from "../../lib/nepconverter";
import { ALL_MONTHS } from "../../lib/allMonths";

const VericleTimeline = props => {
  let { data } = props;
  const bsConvertor = new BikramSambatConverter();
  // FilterData using Date

  // let filteredData = data.map();
  let publishedDate = new Date(data.edges[0].node.date);
  let bs_date = bsConvertor.eng_to_nep(
    publishedDate.getFullYear(),
    publishedDate.getMonth() + 1,
    publishedDate.getDate()
  );

  return (
    <VTDiv>
      <Timeline lineColor={"#ddd"}>
        <TimelineItem
          key={
            props.engLang
              ? ALL_MONTHS[publishedDate.getMonth()] +
                ", " +
                publishedDate.getFullYear()
              : bs_date.nmonth + ", " + bs_date.year
          }
          dateComponent={
            <div className="dataComponent-pill">
              {props.engLang
                ? ALL_MONTHS[publishedDate.getMonth()] +
                  ", " +
                  publishedDate.getFullYear()
                : bs_date.nmonth + ", " + bs_date.year}
            </div>
          }
        >
          {data.edges.map(item => {
            return (
              <NewsListBox
                image={
                  item.node.featuredImage
                    ? item.node.featuredImage.mediaItemUrl
                    : `${require("../Header/assets/logo.png")}`
                }
                pill={false}
                date={publishedDate}
                noticetitle={item.node.title}
                type={props.type}
                slug={item.node.slug}
              />
            );
          })}
        </TimelineItem>
      </Timeline>
    </VTDiv>
  );
};

export default VericleTimeline;

const VTDiv = styled.div`
  .dataComponent-pill {
    /* Layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 47px;

    background: #0a75b9 !important;
    color: #fff;
    /* padding: 3px 15px; */
    border-radius: 11px;
    line-height: 1;
    text-transform: uppercase;
    /* font-size: 12px; */
    margin-bottom: 0;
    height: 2em;
    position: relative;
    right: 22px;
  }
`;
