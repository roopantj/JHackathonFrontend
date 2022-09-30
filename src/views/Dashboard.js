import React, { useState } from "react";
import {
  Card,
  FormText,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  CardTitle,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";
import { FaEdit } from "react-icons/fa";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import axios from "axios";
import DBTable from "../components/DBTable/DBTable";
function Dashboard() {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showFields, setShowFields] = useState(false);
  const fileChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };
  const onSubmitHandler = async () => {
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    const response = await axios.post("http://127.0.0.1:8000/files/", form);
    console.log(response);
    setLoading(false);
    setFormData(response.data);
  };
  const onAddHandler = () => {
    const newTableData = [...tableData];
    newTableData.push(formData);
    setTableData(newTableData);
    setFile("");
    setFormData({});
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={handleClick}
                      >
                        Upload Form
                      </Button>
                      <input
                        type="file"
                        hidden
                        ref={hiddenFileInput}
                        onChange={fileChangeHandler}
                      />
                      <FormText>
                        Extract data from printed or handwritten forms
                      </FormText>
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">{file.name}</div>
              </CardFooter>
            </Card>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                onClick={onSubmitHandler}
                className="btn-round"
                color="danger"
                style={{ width: "100%" }}
                disabled={loading || file.length === 0}
              >
                {loading ? "Loading..." : "Process"}
              </Button>
              {Object.keys(formData).length > 0 && (
                <Button
                  onClick={onAddHandler}
                  className="btn-round"
                  color="warning"
                  style={{ width: "100%" }}
                >
                  Post
                </Button>
              )}
            </div>
          </Col>
          <Col md="8">
            <Card className="card-stats">
              <CardBody className="p-2">
                {Object.keys(formData).length === 0 ? (
                  <div style={{ textAlign: "center" }}>
                    <CardTitle tag="h4">
                      {loading ? (
                        <Spinner />
                      ) : (
                        "Upload form image and click on Process"
                      )}
                    </CardTitle>
                  </div>
                ) : (
                  <React.Fragment>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="primary"
                        outline={showFields}
                        onClick={() => setShowFields((prev) => !prev)}
                      >
                        JSON Viewer
                      </Button>
                      <Button
                        color="primary"
                        outline={!showFields}
                        onClick={() => setShowFields((prev) => !prev)}
                      >
                        <FaEdit style={{ marginRight: "5px" }} />
                        Edit
                      </Button>
                    </div>
                    <Row>
                      {showFields ? (
                        <Col xs="12">
                          <CardTitle tag="h5">Field Detections</CardTitle>
                          <Row>
                            <Col sm="12">
                              <FormGroup>
                                <label>Name</label>
                                <Input
                                  value={formData?.name}
                                  type="text"
                                  name="name"
                                  onChange={(e) => onInputChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="12">
                              <FormGroup>
                                <label>Age</label>
                                <Input
                                  value={formData?.age}
                                  type="text"
                                  name="age"
                                  onChange={(e) => onInputChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="12">
                              <FormGroup>
                                <label>Gender</label>
                                <Input
                                  type="select"
                                  name="gender"
                                  value={formData?.gender}
                                  onChange={(e) => onInputChange(e)}
                                >
                                  <option value={"Male"}>Male</option>
                                  <option value={"Female"}>Female</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col sm="12">
                              <FormGroup>
                                <label>City</label>
                                <Input
                                  type="text"
                                  name="city"
                                  value={formData?.city}
                                  onChange={(e) => onInputChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="12">
                              <FormGroup>
                                <label>Phone</label>
                                <Input
                                  value={formData?.phone}
                                  type="text"
                                  name="phone"
                                  onChange={(e) => onInputChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="12">
                              <FormGroup>
                                <label>Email</label>
                                <Input
                                  value={formData?.email}
                                  type="text"
                                  name="email"
                                  onChange={(e) => onInputChange(e)}
                                />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <div></div>
                                <input
                                  id="health"
                                  name="health"
                                  type="checkbox"
                                />

                                <label htmlFor="health">Health Insurance</label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      ) : (
                        <Col xs="12">
                          <CardTitle tag="h5">JSON Viewer</CardTitle>
                          <JSONInput
                            confirmGood={false}
                            width="90%"
                            id="json"
                            placeholder={formData}
                            locale={locale}
                            height="auto"
                          />
                        </Col>
                      )}
                    </Row>
                  </React.Fragment>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DBTable data={tableData} />
      </div>
    </>
  );
}

export default Dashboard;
