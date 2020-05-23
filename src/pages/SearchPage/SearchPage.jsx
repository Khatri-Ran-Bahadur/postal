import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import styled from "styled-components";
import EachPageHeading from "../../components/Common/EachPageHeading";
import NewsListBox from "../../components/NewsListBox/NewsListBox";
import ErrorBoundary from "../../components/Error/ErrorBoundary";
const SearchPage = (props) => {
  const { search } = props.match.params;
  const SEARCH_QUERY = `
    {
      searchResults: contentNodes(where: { search: "${search}" }) {
        edges {
          node {
            __typename
            uri
            slug
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(gql(SEARCH_QUERY));
  if (loading) return <Spinner />;
  if (error) return <ErrorBoundary />;
  return (
    <SearchDiv>
      <EachPageHeading title={`Search Term : ${search}`} />
      {data.searchResults.edges.length === 0 ? (
        <div style={{ textAlign: "center" }}>Sorry, No results found</div>
      ) : (
        <div>
          {data.searchResults.edges.map((item) => {
            return <EachSearchResult item={item} props={props} />;
          })}
        </div>
      )}
    </SearchDiv>
  );
};

export default SearchPage;

const EachSearchResult = ({ item, props }) => {
  let link;
  let queryType;
  let urlType;
  const typeName = item.node.__typename.toLowerCase();
  const slug = item.node.slug;

  if (typeName.includes("news")) {
    link = `/media/news/${item.node.slug}`;
    queryType = "singleNewsAndNotices";
    urlType = "news";
  } else if (typeName.includes("circular")) {
    link = `/media/circular/${item.node.slug}`;
    queryType = "singleCircular";
    urlType = "circular";
  } else if (typeName.includes("tender")) {
    link = `/media/tender/${item.node.slug}`;
    queryType = "singleTenderNotice";
    urlType = "tender";
  }
  let gqlLiteral = `
    {
      searchItem:${queryType}(id: "${slug}", idType: SLUG) {
        content
        id
        title
        slug
        date
        featuredImage{
           mediaItemUrl 
        }
        Nepali {
          description
          nepaliTitle
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(gql(gqlLiteral));
  if (loading) return <Spinner />;

  if (!data) {
    return <div />;
  } else {
    return (
      <EachSearchResultDiv>
        <div className="each-card">
          <NewsListBox
            image={
              data.searchItem.featuredImage
                ? data.searchItem.featuredImage.mediaItemUrl
                : `${require("../../components/Header/assets/logo.png")}`
            }
            noticetitle={
              props.engLang
                ? data.searchItem.title
                : data.searchItem.Nepali.nepaliTitle
            }
            date={data.searchItem.date}
            pill={true}
            engLang={props.engLang}
            slug={data.searchItem.slug}
            type={urlType}
          />
        </div>
      </EachSearchResultDiv>
    );
  }
};

const SearchDiv = styled.div`
  padding: 10px;
`;

const EachSearchResultDiv = styled.div`
  .each-card {
    margin: 2em 2em;
  }
`;
