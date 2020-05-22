import React, { Fragment } from "react";
import { default as HTlib } from "react-horizontal-timeline";
import styled from "styled-components";
import NewsListBox from "../NewsListBox/NewsListBox";
import SwipeableViews from "react-swipeable-views";
const VALUES = ["Jan 2020", "Dec 2019", "Nov 2019", "Sep 2019"];

export default class HorizontalTimeline extends React.Component {
  state = { value: 0, previous: 0 };
  getLabel = props => {
    return props;
  };
  getNotice = value => {
    switch (value) {
      case 0:
        return <NewsListBox image={true} pill={false} />;
        break;
      case 1:
        return <NewsListBox readmore={true} image={true} pill={true} />;
        break;
      case 2:
        return <NewsListBox readmore={true} image={true} pill={false} />;
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <HTStyled>
        {/* Bounding box for the Timeline */}
        <div style={{ height: "7em" }}>
          <HTlib
            index={this.state.value}
            indexClick={index => {
              this.setState({ value: index, previous: this.state.value });
            }}
            styles={{
              background: "#f8f8f8",
              foreground: "#2460b9",
              outline: "#dfdfdf"
            }}
            fillingMotion={{ stiffness: 150, damping: 25 }}
            slidingMotion={{ stiffness: 150, damping: 25 }}
            getLabel={this.getLabel}
            isTouchEnabled={true}
            isKeyboardEnabled={true}
            values={VALUES}
          />
        </div>
        <div>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={(value, previous) => {
              this.setState({ value: value, previous: previous });
            }}
            enableMouseEvents={true}
          >
            <div className="news-items disable-select">
              <Fragment>
                <NewsListBox image={true} pill={false} />
                <NewsListBox image={true} pill={true} />
                <NewsListBox image={true} pill={true} />
                <NewsListBox image={true} pill={true} />
                <NewsListBox image={true} pill={true} />
              </Fragment>
            </div>
            <div className="news-items disable-select">
              <Fragment>
                <NewsListBox image={true} pill={false} />

                <NewsListBox image={true} pill={true} />
                <NewsListBox image={true} pill={true} />
              </Fragment>
            </div>
          </SwipeableViews>
        </div>
      </HTStyled>
    );
  }
}

const HTStyled = styled.div`
  .dot-label {
    font-size: 12px;
  }
  li {
    background-image: none !important;
  }
  .news-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
`;
