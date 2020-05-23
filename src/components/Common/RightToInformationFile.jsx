import React from "react";
import { Table } from "react-bootstrap";
import { ReactComponent as Download } from "../../assets/images/download.svg";
const RightToInformationFile = ({ header, data, engLang }) => {
  return (
    <div>
      {header && <h4 style={{ textAlign: "center" }}>{header}</h4>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>{engLang ? "S.N." : "सि.नं."}</th>
            <th>{engLang ? "Title" : "शिर्षक"}</th>
            <th>{engLang ? "Time Period" : "समय अवधि"}</th>
            <th>{engLang ? "Download" : "डाउनलोड"}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <span style={{ fontSize: "12px" }}>{index + 1}</span>
                </td>
                <td>{engLang ? item.title : item.rightToinfo.nepaliTitle}</td>
                <td>{item.rightToinfo.nepaliTitle}</td>
                <td>
                  <a href={item.rightToinfo.fileUpload.mediaItemUrl} download>
                    <Download width={40} height={40} className="mr-1" />
                    <span style={{ fontSize: "12px" }}>PDF</span>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RightToInformationFile;
