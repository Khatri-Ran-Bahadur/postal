import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import EachPageHeading from "../../components/Common/EachPageHeading";
import Spinner from "../../components/Common/Spinner";
import { Table } from "react-bootstrap";
import ErrorBoundary from "../../components/Error/ErrorBoundary";

const StaffDetails = () => {
  let staffQuery = gql`
    {
      staffs(where: { orderby: { field: DATE, order: ASC } }) {
        edges {
          node {
            slug
            staff {
              designation
              sn
              email
              officeNumber
              name
              photo {
                id
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  return (
    <StaffDetailsDiv>
      <EachPageHeading title="Staff Details" />

      <Query query={staffQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          if (!error) {
            return (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Staff Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Office No.</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {data.staffs.edges.map((item) => {
                    return (
                      <tr key={item.node.staff.sn}>
                        <td>{item.node.staff.sn}</td>
                        <td>{item.node.staff.name}</td>
                        <td>{item.node.staff.designation}</td>
                        <td>{item.node.staff.email}</td>
                        <td>{item.node.staff.officeNumber}</td>
                        <td>
                          <img
                            style={{ height: "80px" }}
                            src={item.node.staff.photo.sourceUrl}
                            alt={item.node.staff.staffName}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            );
          }
        }}
      </Query>
    </StaffDetailsDiv>
  );
};

export default StaffDetails;

const StaffDetailsDiv = styled.div`
  padding: 10px;
`;
