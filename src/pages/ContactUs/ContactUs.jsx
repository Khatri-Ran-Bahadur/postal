import React from "react";
import { Card, Col, Row, Media } from "react-bootstrap";
import { MdPhone, MdEmail } from "react-icons/md";
import { FaFax, FaPhoneVolume } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";

import { ContactDiv } from "./Contact.styled";
import ContactForm from "./ContactForm";
import { ReactComponent as Fb } from "./assets/facebook.svg";
import { ReactComponent as Tweet } from "./assets/twitter.svg";
import { ReactComponent as Toll } from "./assets/toll.svg";
import EachPageHeading from "../../components/Common/EachPageHeading";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Spinner from "../../components/Common/Spinner";
import GoogleMap from "./GoogleMap";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const ContactUs = ({ engLang }) => {
  const contactus = gql`
    {
      contactsUs(last: 1) {
        edges {
          node {
            Conatctus {
              address1
              address
              email
              facebook
              fax
              noticeBoard
              phone
              trollFree
              twitter
              website
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(contactus);
  if (loading) return <Spinner />;
  let address1;
  let address;
  let email;
  let facebook;
  let fax;
  let noticeBoard;
  let phone;
  let trollFree;
  let twitter;
  let website;
  if (!loading & !error) {
    data.contactsUs.edges.map((item) => {
      address = item.node.Conatctus.address;
      address1 = item.node.Conatctus.address1;
      email = item.node.Conatctus.email;
      facebook = item.node.Conatctus.facebook;
      fax = item.node.Conatctus.fax;
      noticeBoard = item.node.Conatctus.noticeBoard;
      phone = item.node.Conatctus.phone;
      trollFree = item.node.Conatctus.trollFree;
      twitter = item.node.Conatctus.twitter;
      website = item.node.Conatctus.website;
    });
  }
  let title = engLang ? "Contact Us" : "सम्पर्क";
  return (
    <ContactDiv>
      <EachPageHeading title={title} />
      {data ? (
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card className="contact-card">
              <Card.Body>
                <Card.Title className="title">
                  {engLang
                    ? "DISTRICT POSTAL OFFICE SALYLAN"
                    : "जिल्ला हुलाक कार्यालय सल्यान"}
                </Card.Title>
                <Card.Text>{engLang ? address : address1}</Card.Text>
                <Card.Text>
                  <div className="details">
                    <MdPhone size="18px" />
                    <span>
                      {engLang ? "Phone" : "फोन"}: {phone}
                    </span>
                  </div>
                  <div className="details">
                    <FaFax size="18px" />
                    <span>
                      {engLang ? "Fax" : "फ्याक्स"}: {fax}
                    </span>
                  </div>
                  <div className="details">
                    <MdEmail size="18px" />
                    <span>
                      {engLang ? "Email" : "इमेल"} : {email}
                    </span>
                  </div>
                  <div className="details">
                    <IoMdGlobe size="18px" />
                    <span>
                      {engLang ? "Website" : "वेबसाइट"} : {website}{" "}
                    </span>
                  </div>
                  <div className="details">
                    <FaPhoneVolume size="18px" />
                    <span>
                      {engLang ? "Notice Board" : "नोटिस बोर्डः"} :{noticeBoard}{" "}
                    </span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="social-wrapper">
            <div className="social">
              <Media className="social-media">
                <Fb width={50} height={50} className="mr-3" />
                <a href={facebook} target="_blank">
                  <Media.Body>
                    <div>{engLang ? "Facebook" : "फेसबुक"}</div>
                    <span>@nplpost</span>
                  </Media.Body>
                </a>
              </Media>
              <Media className="social-media">
                <Tweet width={50} height={50} className="mr-3" />
                <a href={twitter} target="_blank">
                  <Media.Body>
                    <div>{engLang ? "Twitter" : "ट्वीटर"}</div>
                    <span>@Nepal_Post</span>
                  </Media.Body>
                </a>
              </Media>
              <Media className="social-media">
                <Toll width={50} height={50} className="mr-3" />
                <Media.Body>
                  <div>{engLang ? "Toll Free" : "टोल फ्रीस"}</div>
                  <span>{trollFree}</span>
                </Media.Body>
              </Media>
            </div>
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
      <Row>
        <Card className="map-card" style={{ width: "100%" }}>
          <GoogleMap />
        </Card>
      </Row>
      <Row>
        <Col>
          <ContactForm />
        </Col>
      </Row>
    </ContactDiv>
  );
};

export default ContactUs;
