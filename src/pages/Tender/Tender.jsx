import React, { useState } from "react";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import VericleTimeline from "../../components/Common/VericleTimeline";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import BikramSambatConverter from "../../lib/nepconverter";

const Tender = props => {
  let today = new Date();
  let [newsData, setNewsData] = useState();

  let [currentMonth, setCurrentMonth] = useState(today.getMonth());
  let [currentYear, setCurrentYear] = useState(today.getFullYear());

  const TenderQuery = `
        {
      news:allTenderNotice(where: {dateQuery: {
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
    gql(TenderQuery),
    { notifyOnNetworkStatusChange: true }
  );
  const bsConvertor = new BikramSambatConverter();
  if (networkStatus === 4) return <Spinner />;
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

  return (
    <TenderDiv>
      <EachPageHeading title="Tender Notice" />

      {data.news.edges.length > 0 ? (
        <VericleTimeline
          data={data.news}
          engLang={props.engLang}
          type="tender"
        />
      ) : (
        <div
          style={{
            textAlign: "center",
            paddingTop: "2em",
            paddingBottom: "2em"
          }}
        >
          {props.engLang ? "No Tender found" : "कुनै बोलपत्रहरू फेला परेन"}
        </div>
      )}
      <div
        style={{
          textAlign: "center"
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
    </TenderDiv>
  );
};

export default Tender;

const TenderDiv = styled.div`
  padding: 10px;
`;
