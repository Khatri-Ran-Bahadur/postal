import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { isMobile, isTablet } from "react-device-detect";
import { FormattedMessage } from "react-intl";
import {
  Navbar,
  Nav,
  Form,
  Button,
  NavDropdown,
  FormControl,
  Col,
  Row,
} from "react-bootstrap";
// import { CalendarFunctions } from "react-nepali-calendar";

import { TopNav, MiddleHeader, BottomBar } from "./Header.styled";
import { GoMailRead, GoSearch } from "react-icons/go";
// Assets
import { ReactComponent as NepalFlag } from "./assets/nepal.svg";
import { ReactComponent as AusFlag } from "./assets/aus.svg";
import { ReactComponent as Eye } from "./assets/eye.svg";

import Moment from "react-moment";
import BikramSambatConverter from "../../lib/nepconverter";

const Header = (props) => {
  return (
    <Fragment>
      <TopNavbar
        engLangUI={props.engLangUI}
        setEngLangUI={props.setEngLangUI}
        toggleEye={props.toggleEye}
        setToggleEye={props.setToggleEye}
      />
      <MiddleHeader history={props.history}>
        <Row>
          <Col>
            <div className="left" onClick={() => props.history.push("/home")}>
              <img
                src={require("./assets/logo.png")}
                className="main-logo"
                alt="MINISTY OF COMMUNICATION AND INFORMATION TECHNOLOGY"
              />
              <div className="header-text">
                <span className="nepal-gov">
                  <FormattedMessage
                    id="logo.first"
                    defaultMessage="NEPAL GOVERNMENT"
                  />
                </span>
                <span className="ministry">
                  <FormattedMessage
                    id="logo.second"
                    defaultMessage="MINISTY OF COMMUNICATION AND INFORMATION TECHNOLOGY"
                  />
                </span>
                <span className="postal">
                  <FormattedMessage
                    id="logo.third"
                    defaultMessage=" POSTAL SERVICES DEPARTMENT"
                  />
                </span>
              </div>
            </div>
          </Col>

          <Col>
            <div className="ticket"></div>
            <img
              className="flag-gif"
              src={require("./assets/nepalflag.gif")}
              alt="Nepal FLag"
            />
          </Col>
        </Row>
      </MiddleHeader>
      <BottomNavbar history={props.history} />
    </Fragment>
  );
};

const TopNavbar = (props) => {
  const bsConvertor = new BikramSambatConverter();

  const today = new Date();

  const bs_date = bsConvertor.eng_to_nep(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const changeLanguage = () => {
    props.setEngLangUI(!props.engLangUI);
  };

  const eyeHandler = () => {
    props.setToggleEye(!props.toggleEye);
  };
  const handleA = (item) => {
    // console.log(item);
    document.getElementById("body-baby").className = item;
  };

  return (
    <TopNav expand="lg" className="TopNavbar">
      <Row style={{ width: "100%" }}>
        <Col xs={2}></Col>
        <Col xs={10}>
          <Nav className="mr-auto top-right-nav">
            <Nav.Link>
              <span className="a-plus" onClick={() => handleA("A-minus")}>
                A-
              </span>
              <span className="a-plus" onClick={() => handleA("A-middle")}>
                A
              </span>
              <span className="a-plus" onClick={() => handleA("A-plus")}>
                A+
              </span>
            </Nav.Link>
            <Nav.Link onClick={eyeHandler}>
              <Eye className="lang-svg eye" />
            </Nav.Link>

            <Nav.Link>
              {props.engLangUI ? (
                <Moment format="dddd, MMMM Do YYYY">{new Date()}</Moment>
              ) : (
                <div>
                  {bs_date.day}, {bs_date.nmonth} {bs_date.date}, {bs_date.year}
                </div>
              )}
            </Nav.Link>
            <Nav.Link onClick={changeLanguage}>
              {props.engLangUI ? (
                <Fragment>
                  <span className="lang-text">Nepali</span>
                  <NepalFlag className="lang-svg" />
                </Fragment>
              ) : (
                <Fragment>
                  <span className="lang-text">English</span>
                  <AusFlag className="lang-svg" />
                </Fragment>
              )}
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </TopNav>
  );
};

const BottomNavbar = (props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const searchHandler = () => {
    navigate(`/search/${searchText}`);
  };
  const navigate = (to) => props.history.push(to);
  return (
    <Fragment>
      <BottomBar bg="light" expand="lg" className="bottomnav">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ color: "white", border: "white 1px solid" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div onClick={() => navigate("/home")}>
              <Nav.Link>
                <FormattedMessage id="bottomnav.home" defaultMessage="Home" />
              </Nav.Link>
            </div>
            <NavDropdown
              title={
                <FormattedMessage
                  id="bottomnav.department"
                  defaultMessage="Department"
                />
              }
            >
              <div onClick={() => navigate("/department/aboutus")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.about"
                    defaultMessage="About Us"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/department/underneath-org")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.underneath"
                    defaultMessage="Underneath Organization"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/department/staffs")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.staff"
                    defaultMessage="Staff Details"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/department/citizen-charter")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.citizen"
                    defaultMessage="Citizen Charter"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/services")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.services"
                    defaultMessage="All Services"
                  />
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <div onClick={() => navigate("/policy-program")}>
              <Nav.Link>
                <FormattedMessage
                  id="bottomnav.policy"
                  defaultMessage="Policy and Programs"
                />
              </Nav.Link>
            </div>

            <div onClick={() => navigate("/act-regulations")}>
              <Nav.Link>
                <FormattedMessage
                  id="bottomnav.acts"
                  defaultMessage="Act & Regulations"
                />
              </Nav.Link>
            </div>

            <NavDropdown
              title={
                <FormattedMessage
                  id="bottomnav.media"
                  defaultMessage="Media Center"
                />
              }
            >
              <div onClick={() => navigate("/media/notice")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.notice"
                    defaultMessage="Notice"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/media/right-to-information")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.righttoinformation"
                    defaultMessage="Right To Information"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/media/press-release")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.press"
                    defaultMessage="Press Release"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/media/news")}>
                <NavDropdown.Item>
                  <FormattedMessage id="bottomnav.news" defaultMessage="News" />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/media/tender")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.tender"
                    defaultMessage="Tender"
                  />
                </NavDropdown.Item>
              </div>
              <div onClick={() => navigate("/media/circular")}>
                <NavDropdown.Item>
                  <FormattedMessage
                    id="bottomnav.circular"
                    defaultMessage="Circular"
                  />
                </NavDropdown.Item>
              </div>
            </NavDropdown>

            <div onClick={() => navigate("/activities")}>
              <Nav.Link>
                <FormattedMessage
                  id="bottomnav.activities"
                  defaultMessage="Activities"
                />
              </Nav.Link>
            </div>

            <div onClick={() => navigate("/postal-rates")}>
              <Nav.Link>
                <FormattedMessage
                  id="bottomnav.postal"
                  defaultMessage="postal"
                />
              </Nav.Link>
            </div>

            <div onClick={() => navigate("/contact-us")}>
              <Nav.Link>
                <FormattedMessage
                  id="bottomnav.contact"
                  defaultMessage="Contact Us"
                />
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link onClick={toggleSearch}>
          <GoSearch />
        </Nav.Link>
      </BottomBar>
      {searchOpen && (
        <Form
          className="search-form"
          inline
          style={{
            padding: "1em",
            justifyContent: "center",
          }}
        >
          <FormattedMessage
            id="bottomnav.search.placeholder"
            defaultMessage="Type and Press Enter"
          >
            {(placeholder) => (
              <FormControl
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder}
                className="mr-sm-2"
              />
            )}
          </FormattedMessage>

          <Button
            className="search-btn"
            style={{
              background: "rgba(10,60,134,0.79)",
              border: "1px rgba(10,60,134,0.79) solid",
              color: " rgba(255, 255, 255, 0.9)",
              marginTop: "5px",
            }}
            onClick={searchHandler}
          >
            <FormattedMessage id="bottomnav.search" defaultMessage="Search" />
          </Button>
        </Form>
      )}
    </Fragment>
  );
};
export default Header;
