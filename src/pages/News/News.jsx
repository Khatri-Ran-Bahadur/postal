import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import EachPageHeading from "../../components/Common/EachPageHeading";
import VericleTimeline from "../../components/Common/VericleTimeline";
import Spinner from "../../components/Common/Spinner";
import BikramSambatConverter from "../../lib/nepconverter";
import { ALL_MONTHS } from "../../lib/allMonths";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const News = (props) => {
  let today = new Date();

  let [currentMonth, setCurrentMonth] = useState(today.getMonth());
  let [currentYear, setCurrentYear] = useState(today.getFullYear());

  const NEWS_QUERY = `
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
    gql(NEWS_QUERY),
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
  let NEPALI_MONTHS = bsConvertor.nepali_months;

  // let publishedDate = new Date(data.news.edges[0].node.date);

  return (
    <NewsDiv>
      <EachPageHeading title={props.engLang ? "News For" : "समाचार"} />
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
          {props.engLang ? "No News found" : "कुनै समाचार फेला परेन"}
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
    </NewsDiv>
  );
};

const YearSelecterComponent = ({ engLang }) => {
  let currentYear = new Date().getFullYear();
  let years = [];
  let startYear = 2019;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }

  return (
    <select>
      {years.map((year) => {
        return <option>{year}</option>;
      })}
    </select>
  );
};

const DateSelectComponent = ({ engLang, selectedMonth }) => {
  const bsConvertor = new BikramSambatConverter();
  let today = new Date();
  let bs_date = bsConvertor.eng_to_nep(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  let NEPALI_MONTHS = bsConvertor.nepali_months;

  return (
    <select>
      {NEPALI_MONTHS.map((month, i) => {
        const getSelected = (i, engMonth, nepMonth) => {
          if (!engLang) {
            let currentNepMonth = bs_date.nmonth;
            if (currentNepMonth === nepMonth) {
              return true;
            } else {
              return false;
            }
          } else {
            if (today.getMonth() === i) {
              return true;
            } else {
              return false;
            }
          }
        };

        return (
          <option selected={getSelected(i, ALL_MONTHS[0], month)}>
            {engLang ? ALL_MONTHS[i] : month}
          </option>
        );
      })}
    </select>
  );
};

export default News;

const NewsDiv = styled.div`
  padding: 10px;
`;
