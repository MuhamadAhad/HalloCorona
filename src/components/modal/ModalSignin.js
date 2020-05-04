import React, { Component } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { clickModalSignin, clickModalSignup } from "../../_actions/modal";
import { connect } from "react-redux";
import { userSignin } from "../../_actions/user";
import { withRouter } from "react-router-dom";
import { dataSign } from "../../_actions/user";

class ModalSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }
  handleSubmit = async (e) => {
    if (this.state.userName !== "" && this.state.password !== "") {
      e.preventDefault();
      const { userName, password } = this.state;
      if (userName !== "" && password !== "") {
        const data = {
          userName,
          password,
        };
        localStorage.clear();
        await this.props.signin(data);
        this.setState({
          userName: "",
          password: "",
        });
        this.props.dataSign();
        const { dataSignin } = this.props;
        if (
          dataSignin &&
          dataSignin.msg &&
          dataSignin.msg === "Username not registered"
        ) {
          this.setState({ userName: "", password: "" });
        } else if (
          dataSignin &&
          dataSignin.msg &&
          dataSignin.msg === "Invalid signin"
        ) {
          this.setState({ ...this.state, password: "" });
        } else if (
          dataSignin &&
          dataSignin.data &&
          dataSignin.data.userName &&
          dataSignin.data.token
        ) {
          if (localStorage.getItem("level") === "1") {
            this.props.clickModalSignin();
          } else {
            this.props.clickModalSignin();
            this.props.history.push("/listreservation");
          }
        }
      }
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    const {
      modal,
      clickModalSignin,
      clickModalSignup,
      dataSignin,
    } = this.props;
    return (
      <Modal
        show={modal.modalSignin}
        onHide={() => {
          clickModalSignin();
        }}
        size="sm"
        centered
      >
        <Modal.Body>
          <h3 style={{ textAlign: "center" }}>Sign In</h3>
          {dataSignin && dataSignin.msg && (
            <Alert variant="danger" style={{ padding: 3 }}>
              <small>{dataSignin.msg}</small>
            </Alert>
          )}
          <Form>
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
            <Button
              type="submit"
              variant="danger"
              block
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            <Form.Text className="text-muted" style={{ textAlign: "center" }}>
              Don't Have an account ? click{" "}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  clickModalSignup();
                }}
                style={{ color: "#dc3545", textDecoration: "none" }}
              >
                here
              </a>
            </Form.Text>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    dataSignin: state.sign.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickModalSignin: () => dispatch(clickModalSignin()),
    clickModalSignup: () => dispatch(clickModalSignup()),
    signin: (data) => dispatch(userSignin(data)),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ModalSignin));
