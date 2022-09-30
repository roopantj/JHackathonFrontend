import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables({ data }) {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">DB Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Phone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data].length > 0 ? (
                      [...data].map((item) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.gender}</td>
                          <td>{item.city}</td>
                          <td>{item.state}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                        </tr>
                      ))
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <span>No Data Found</span>
                      </div>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Tables;
