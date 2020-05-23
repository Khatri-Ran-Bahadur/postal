import React, { useState } from "react";
import EachPageHeading from "../../components/Common/EachPageHeading";

import { NoticeDiv } from "./Notice.styled";
import VericleTimeline from "../../components/Common/VericleTimeline";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const Notice = (props) => {
  let today = new Date();
  let [currentMonth, setCurrentMonth] = useState(today.getMonth());
  let [currentYear, setCurrentYear] = useState(today.getFullYear());

  const NoticeQuery = `
  {
      news:allNewsAndNotices(where: {dateQuery: {
          after: {
            day: ${1}, 
            month: ${currentMonth + 1}, 
            year: ${currentYear}
          }, 
          before: {
            day: ${1}, 
            month: ${currentMonth + 2}, 
            year: ${currentYear}
          }
      }}){
        edges {
          node {
            date
            title
            slug
            content
            Nepali{
              nepaliTitle
              description
            }
          }
        }
      }
  }
  `;

  const { loading, error, data, refetch, networkStatus } = useQuery(
    gql(NoticeQuery),
    { notifyOnNetworkStatusChange: true }
  );
  if (loading) return <Spinner />;
  const loadMore = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    refetch();
  };

  const loadNext = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    refetch();
  };

  if (networkStatus === 4) return <Spinner />;

  return (
    <NoticeDiv>
      <EachPageHeading title="Notice" />
      {data.news.edges.length > 0 ? (
        <VericleTimeline data={data.news} engLang={props.engLang} type="news" />
      ) : (
        <div
          style={{
            textAlign: "center",
            paddingTop: "2em",
            paddingBottom: "2em",
          }}
        >
          {props.engLang ? "No Notices found" : "कुनै सूचनाहरू फेला परेन"}
        </div>
      )}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          className="btn btn-primary"
          style={{ marginRight: "1em" }}
          onClick={loadMore}
        >
          {props.engLang
            ? " Load Previous Month"
            : "अघिल्लो महिना लोड गर्नुहोस्"}
        </button>
        <button className="btn btn-primary" onClick={loadNext}>
          {props.engLang ? " Load Next Month" : "अर्को महिना लोड गर्नुहोस्"}
        </button>
      </div>
    </NoticeDiv>
  );
};

export default Notice;
