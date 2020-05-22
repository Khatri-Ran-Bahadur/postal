import React from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import { ReactComponent as Pdf } from "../../assets/images/pdf.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
const FileAndDownloadTableAct = ({ header, data }) => {
  return (
    <div>
      {header && <h4 style={{ textAlign: "center" }}>{header}</h4>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>File</th>
            <th>Description</th>
            <th>Download</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return (
              <tr key={index}>
                <td>
                  <Pdf width={40} height={40} className="mr-1" />
                  <span style={{ fontSize: "12px" }}>.pd{item.node.slug}f</span>
                </td>
                <td>{item.node.title}</td>
                <td>
                  <a
                    href={item.node.actandregulation.file.mediaItemUrl}
                    download
                  >
                    <Download width={40} height={40} className="mr-1" />
                    <span style={{ fontSize: "12px" }}>
                      {item.node.slug}.pdf
                    </span>
                  </a>
                </td>
                <td>
                  <Moment fromNow>{item.node.date}</Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FileAndDownloadTableAct;
