import React from "react";
import { Formik } from "formik";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import { ContactFormDiv } from "./Contact.styled";

let yup = require("yup");

const schema = yup.object({
  Fullname: yup.string().required(),
  Email: yup
    .string()
    .required()
    .email(),
  Subject: yup.string().required(),
  Message: yup.string().required()
});

const ContactForm = () => {
  return (
    <ContactFormDiv>
      <Card>
        <Card.Body>
          <div className="info">
            Usually we need 1 working day to reply to the enquiries/complaints,
            depending on the enquiry/complaints type, it may take longer.
          </div>
        </Card.Body>

        <Formik
          initialValues={{
            Fullname: "",
            Email: "",
            Phone: "",
            Fax: "",
            Subject: "",
            Message: ""
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit} className="form-card">
              <Row>
                <Col xs={12} lg={6} md={6}>
                  <Form.Group controlId="Fullname">
                    <Form.Label>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {errors.Fullname && touched.Fullname && (
                      <small className="error">{errors.Fullname}</small>
                    )}
                    <Form.Control
                      type="text"
                      name="Fullname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fullname}
                      placeholder="Enter your full name"
                      isValid={touched.Fullname && !errors.Fullname}
                      isInvalid={touched.Fullname && errors.Fullname}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6} md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>
                      Email address <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {errors.Email && touched.Email && (
                      <small className="error">{errors.Email}</small>
                    )}
                    <Form.Control
                      type="email"
                      name="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter your email address"
                      isValid={touched.Email && !errors.Email}
                      isInvalid={touched.Email && errors.Email}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xs={12} lg={6} md={6}>
                  <Form.Group controlId="Phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="Phone"
                      name="Phone"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Phone}
                      placeholder="Enter your Phone address"
                      isInvalid={touched.Phone && errors.Phone}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6} md={6}>
                  <Form.Group controlId="Fax">
                    <Form.Label>Fax Number</Form.Label>
                    <Form.Control
                      type="Fax"
                      name="Fax"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Fax}
                      placeholder="Enter your Fax address"
                      isInvalid={touched.Fax && errors.Fax}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="Subject">
                    <Form.Label>
                      Subject <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {errors.Subject && touched.Subject && (
                      <small className="error">{errors.Subject}</small>
                    )}
                    <Form.Control
                      type="text"
                      name="Subject"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Subject}
                      placeholder="Subject"
                      isValid={touched.Subject && !errors.Subject}
                      isInvalid={touched.Subject && errors.Subject}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="Message">
                    <Form.Label>
                      Message <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {errors.Message && touched.Message && (
                      <small className="error">{errors.Message}</small>
                    )}
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows="3"
                      name="Message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.Message}
                      placeholder="Message"
                      isValid={touched.Message && !errors.Message}
                      isInvalid={touched.Message && errors.Message}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
                style={{
                  background: "rgba(10,60,134,0.79)",
                  border: "1px rgba(10,60,134,0.79) solid",
                  color: " rgba(255, 255, 255, 0.9)",
                  marginTop: "5px",
                  width: "50%"
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </ContactFormDiv>
  );
};

export default ContactForm;
