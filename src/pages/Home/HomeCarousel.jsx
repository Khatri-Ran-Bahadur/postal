import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Carousel } from "react-bootstrap";
import Spinner from "../../components/Common/Spinner";

const HomeCarousel = () => {
  const SliderQuery = gql`
    {
      sliders {
        edges {
          node {
            title
            content
            slug
            slider {
              nepaliTitle
              nepaliDescription
            }
            featuredImage {
              mediaItemUrl
            }
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(SliderQuery);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {data ? (
        <Carousel key="100">
          {data.sliders.edges.map((slider) => (
            <Carousel.Item key={slider.node.slug}>
              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "435px",
                  maxWidth: "100%",
                }}
                src={slider.node.featuredImage.mediaItemUrl}
                alt={slider.node.title}
              />
              <Carousel.Caption
                style={{
                  background: "rgba(8, 13, 55, 0.35)",
                  left: "0",
                  width: "47%",
                  paddingLeft: "2%",
                  bottom: "1%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingRight: "4%",
                  textAlign: "Justify",
                  minHeight: "59px",
                }}
              >
                <h3>{slider.node.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${slider.node.content}`,
                  }}
                ></p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
    </div>
  );
};

export default HomeCarousel;
