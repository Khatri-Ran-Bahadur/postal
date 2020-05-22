import styled from "styled-components";
import ticketBg from "./assets/ticket-bg.png";
import { Navbar } from "react-bootstrap";
export const TopNav = styled.div`
  background: rgba(10, 60, 134, 0.79) !important;
  font-size: 13px;
  a {
    color: white;
    border-left: 1px solid rgba(111, 11, 11, 0.2);
    padding: 4px 8px;
    margin: 0;
  }
  .webmail {
    max-width: 100px;
    min-width: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 0.5em;
    span {
      margin-left: 3px;
    }
  }
  .top-right-nav {
    display: flex;
    justify-content: flex-end;
  }
`;

export const MiddleHeader = styled.header`
  padding: 1rem 2rem 1rem 2rem;
  .main-logo {
    margin-right: 10px;
    width: 6em;
    min-width: 4em;
    max-width: 100%;
    height: auto;
  }
  .left {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
  }
  .header-text {
    display: flex;
    flex-direction: column;

    .nepal-gov {
      font-size: 90%;
    }
    .ministry {
      font-size: 62%;
      font-weight: 600;
      color: #333;
    }
    .postal {
      font-size: 1.3rem;
      /* margin-top: 4px; */
      font-weight: 600;
      color: #ac151b;
    }
  }

  .ticket {
    .each-ticket {
      position: relative;
      float: left;
    }
    .each-ticket::before {
      content: "";
      height: 108px;
      top: 0;
      position: absolute;
      z-index: -1;
      background: url(${ticketBg}) no-repeat content-box;
      background-size: auto auto;
      margin-left: 05px;

      width: 110px;
      background-size: contain;
      left: 0;
      content: "";
      z-index: -1;
    }
    img {
      display: block;
      width: 95px;
      float: left;
      border: none;
      height: 57px;
      max-width: 100%;
      margin: 6px 13px;
    }
  }
  .flag-gif {
    width: 42px;
    float: right;
    margin-right: 27px;
  }
`;

export const BottomBar = styled(Navbar)`
  background-color: #0a3c86 !important;
  height: auto;
  width: 100%;
  width: 100%;
  color: white !important;

  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;

  a {
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    text-decoration: none;
  }
`;
//afdgda
