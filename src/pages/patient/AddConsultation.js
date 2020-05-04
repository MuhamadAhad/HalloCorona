import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, InputGroup, Button, Col } from "react-bootstrap";
import Header from "../../components/Header";
import { dataSign } from "../../_actions/user";
import { connect } from "react-redux";
import { haveValue } from "../../function/FormatNumber";
import { createConsultation } from "../../_actions/consultation";

class AddConsultation extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
    this.state = {
      validated: false,
      fullName: "",
      phone: "",
      bornDate: "",
      subject: "",
      liveConsul: "",
      description: "",
      age: "",
      height: "",
      gender: "",
      weight: "",
      loading: props.loading,
    };
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "1") {
      this.props.history.push("/");
    }
  };

  handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    const {
      fullName,
      phone,
      bornDate,
      subject,
      liveConsul,
      description,
      age,
      height,
      gender,
      weight,
    } = this.state;
    if (
      haveValue(fullName) &&
      haveValue(phone) &&
      haveValue(bornDate) &&
      haveValue(subject) &&
      haveValue(liveConsul) &&
      haveValue(description) &&
      haveValue(age) &&
      haveValue(height) &&
      haveValue(gender) &&
      haveValue(weight)
    ) {
      const data = {
        fullName,
        phone,
        bornDate,
        subject,
        liveConsul,
        description,
        age,
        height,
        gender,
        weight,
      };
      await this.props.createConsul(data);
      this.props.history.push("/listconsultation");
    }
    this.setState({ validated: true });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { validated } = this.state;
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent mainShadow">
            <h3 className="titleColor">
              <i className="fas fa-file-medical"></i> Reservasi Consultation
            </h3>
            <br />
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="validationCustom10">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="enter full name"
                  name="fullName"
                  value={this.state.fullName}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom11">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="phone"
                  placeholder="phone number"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Born Date</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="bornDate"
                    placeholder="Born Date"
                    value={this.state.bornDate}
                    onChange={this.handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="validationCustom02">
                  <Form.Label>Age</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Age"
                      name="age"
                      value={this.state.age}
                      onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="inputGroupAppend">
                        <small>years</small>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Height</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="height"
                      aria-describedby="inputGroupAppend"
                      required
                      name="height"
                      value={this.state.height}
                      onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="inputGroupAppend">
                        <small>cm</small>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                      looks Good
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Weight</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="Number"
                      placeholder="Weight"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="weight"
                      value={this.state.weight}
                      onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="inputGroupPrepend">
                        <small>kg</small>
                      </InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                      looks good !
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="validationCustom11">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                  required
                >
                  <option value="">choose your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom11">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="subject"
                  placeholder="subject"
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom11">
                <Form.Label>Live Consultation Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="liveConsul"
                  placeholder="date for live Consultation"
                  value={this.state.liveConsul}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom11">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="6"
                  placeholder=""
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="danger" style={{ width: 250 }}>
                  <strong>Send</strong>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
    loading: state.consultation.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    createConsul: (data) => dispatch(createConsultation(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddConsultation));
