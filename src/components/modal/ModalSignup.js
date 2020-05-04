import React, { Component } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { clickModalSignup } from "../../_actions/modal";
import { connect } from "react-redux";
import { userSignup } from "../../_actions/user";
import { withRouter } from "react-router-dom";
import { dataSign } from "../../_actions/user";

class ModalSignup extends Component {
  constructor(props) {
    super(props);
    props.dataSign();
    this.state = {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      asId: "",
      gender: "",
      address: "",
      phone: "",
      message: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.fullName !== "" &&
      this.state.userName !== "" &&
      this.state.email !== "" &&
      this.state.password !== "" &&
      this.state.rePassword !== "" &&
      this.state.asId !== "" &&
      this.state.gender !== "" &&
      this.state.address !== "" &&
      this.state.phone !== ""
    ) {
      if (this.state.password === this.state.rePassword) {
        const {
          fullName,
          userName,
          email,
          password,
          asId,
          gender,
          address,
          phone,
        } = this.state;
        const data = {
          fullName,
          userName,
          email,
          password,
          asId,
          gender,
          address,
          phone,
        };
        localStorage.clear();
        await this.props.signup(data);
        this.props.dataSign();
        const { dataSignup } = this.props;
        if (
          dataSignup &&
          dataSignup.msg &&
          dataSignup.msg === "Username or email already registered"
        ) {
          this.setState({
            ...this.state,
            rePassword: "",
            password: "",
            userName: "",
            email: "",
            message: dataSignup.msg,
          });
        } else if (dataSignup && dataSignup.msg) {
          this.setState({
            fullName: "",
            userName: "",
            email: "",
            password: "",
            rePassword: "",
            asId: "",
            gender: "",
            address: "",
            phone: "",
            message: dataSignup.msg,
          });
        } else if (
          dataSignup &&
          dataSignup.data &&
          dataSignup.data.userName &&
          dataSignup.data.token
        ) {
          if (localStorage.getItem("level") === "1") {
            this.props.clickSignup();
            this.props.history.push("/");
          } else {
            this.props.clickSignup();
            this.props.history.push("/listconsultation");
          }
        }
      } else {
        this.setState({
          ...this.state,
          password: "",
          rePassword: "",
          message: "password didn't match",
        });
      }
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  render() {
    const { modalSignup, clickSignup } = this.props;
    return (
      <Modal
        show={modalSignup}
        onHide={() => {
          clickSignup();
        }}
        size="md"
        centered
        scrollable
      >
        <Modal.Body>
          <h3 style={{ textAlign: "center" }}>
            <strong>Sign Up</strong>
          </h3>
          <Form onSubmit={this.handleSubmit}>
            {this.state.message && (
              <Alert variant="danger" style={{ padding: 3 }}>
                <small>{this.state.message}</small>
              </Alert>
            )}
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                required
                name="fullName"
                onChange={this.handleChange}
                value={this.state.fullName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                required
                name="userName"
                value={this.state.userName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                required
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter Password"
                required
                name="rePassword"
                value={this.state.rePassword}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Signup As </Form.Label>
              <Form.Control
                as="select"
                name="asId"
                onChange={this.handleChange}
                value={this.state.asId}
                required
              >
                <option value=""> choose </option>
                <option value="0">Doctor</option>
                <option value="1">Patient</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender </Form.Label>
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
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                required
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Address"
                name="address"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="danger" type="submit" block>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalSignup: state.modal.modalSignup,
    dataSignup: state.sign.data,
  };
};
const mapDispatchToState = (dispatch) => {
  return {
    clickSignup: () => dispatch(clickModalSignup()),
    signup: (data) => dispatch(userSignup(data)),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToState
)(withRouter(ModalSignup));
