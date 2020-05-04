import React, { Component } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { clickModalPassword } from "../../_actions/modal";
import { Alert } from "react-bootstrap";
import { changePassword } from "../../_actions/user";

class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      reNewPassword: "",
      message: "",
      success: false,
    };
  }

  handleSubmit = async (e) => {
    if (
      this.state.password !== "" &&
      this.state.newPassword !== "" &&
      this.state.reNewPassword !== ""
    ) {
      e.preventDefault();
      const { newPassword, password, reNewPassword } = this.state;
      if (password !== "" && newPassword === reNewPassword) {
        const data = {
          password,
          newPassword,
        };
        await this.props.changePassword(data);
        console.log(this.props.password);
        if (this.props.password.msg === "success") {
          this.setState({
            password: "",
            newPassword: "",
            reNewPassword: "",
            message: "Change password success",
            success: true,
          });
        } else {
          this.setState({
            password: "",
            newPassword: "",
            reNewPassword: "",
            message: this.props.password.msg,
            success: false,
          });
        }
      } else {
        this.setState({
          password: "",
          newPassword: "",
          reNewPassword: "",
          message: "New password didn't match",
          success: false,
        });
      }
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    const { modal, modalPassword } = this.props;
    return (
      <Modal
        show={modal}
        onHide={() => {
          modalPassword();
        }}
        size="sm"
        centered
      >
        <Modal.Body>
          <h3 style={{ textAlign: "center" }}>Change Password</h3>
          <Form>
            {this.state.message !== "" ? (
              <Alert
                variant={this.state.success ? "success" : "danger"}
                style={{ padding: 3 }}
              >
                <small>{this.state.message}</small>
              </Alert>
            ) : null}
            <Form.Group>
              <Form.Label>Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old Password"
                required
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                required
                name="newPassword"
                onChange={this.handleChange}
                value={this.state.newPassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Re-enter new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                required
                name="reNewPassword"
                onChange={this.handleChange}
                value={this.state.reNewPassword}
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              block
              onClick={this.handleSubmit}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal.modalPassword,
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalPassword: () => dispatch(clickModalPassword()),
    changePassword: (data) => dispatch(changePassword(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePwd);
