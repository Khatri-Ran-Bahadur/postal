import styled from "styled-components";

export const NewsListBoxDiv = styled.div`
  .news-generic-media {
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 1em;
    margin-top: 1em;
    margin-right: 0.4em;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
  }
  .date {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    color: #787878;
  }

  .news-generic-badge {
    background: #0a75b9 !important;
    color: #fff;
    padding: 3px 15px;
    border-radius: 18px;
    line-height: 1;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 0;
  }
  .news-excerpt {
    color: black;
  }
  .media-body {
    margin-left: 4px;
  }
  .read-more {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    text-transform: uppercase;
    cursor: pointer;
  }
`;
