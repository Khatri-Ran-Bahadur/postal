import React, { Fragment } from "react";
import NewsListBox from "../NewsListBox/NewsListBox";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "./Spinner";
import EachPageHeading from "./EachPageHeading";
import ErrorBoundary from "../Error/ErrorBoundary";

const CollectionNewsListBox = (props) => {
  let actualType;
  let urlType;

  if (props.type === "News & Notice") {
    actualType = "allNewsAndNotices";
    urlType = "news";
  }

  const QUERY = `
      {
        data: ${actualType}(
          first: 5
          where: { orderby: { field: DATE, order: ASC } }
        ) {
          edges {
            node {
              content
              title
              slug
              date
              featuredImage{
                mediaItemUrl
              }
              Nepali {
                nepaliTitle
                description
              }
            }
          }
        }
      }
    `;

  const { loading, error, data } = useQuery(gql(QUERY));

  if (loading) return <Spinner />;

  if (error) return <ErrorBoundary />;
  return (
    <Fragment>
      <EachPageHeading
        title={props.engLang ? props.type : "समाचार तथा सूचना"}
      />
      {data.data.edges.map((item, index) => {
        return (
          <NewsListBox
            image={
              item.node.featuredImage
                ? item.node.featuredImage.mediaItemUrl
                : `${require("../Header/assets/logo.png")}`
            }
            noticetitle={
              props.engLang ? item.node.title : item.node.Nepali.nepaliTitle
            }
            date={item.node.date}
            pill={true}
            engLang={props.engLang}
            slug={item.node.slug}
            type={urlType}
            key={index}
          />
        );
      })}
    </Fragment>
  );
};

export default CollectionNewsListBox;
