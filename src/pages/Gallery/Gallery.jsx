import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Content } from "../../components/Common/Content";
import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";

const Gallery = () => {
  let query = gql`
    {
      singlepost(id: "/gallery/", idType: SLUG) {
        content
      }
    }
  `;

  return (
    <GalleryDiv>
      <EachPageHeading title="Gallery" />
      <div className="gallery-cards">
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Spinner />;
            }
            if (!error) {
              let gallery = data.singlepost;

              return (
                <Content
                  dangerouslySetInnerHTML={{
                    __html: `${gallery.content}`,
                  }}
                ></Content>
              );
            }
          }}
        </Query>
      </div>
    </GalleryDiv>
  );
};

export default Gallery;

const GalleryDiv = styled.div`
  padding: 10px;
`;
//const photos = [
//   {
//     src: "http://example.com/example/img1.jpg",
//     width: 4,
//     height: 3,
//   },
//   {
//     src: "http://example.com/example/img2.jpg",
//     width: 1,
//     height: 1,
//   },
// ];

// <Gallery photos={photos} />;
