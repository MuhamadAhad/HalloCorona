import React, { Component } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalSignin from "../components/modal/ModalSignin";
import ModalSignup from "../components/modal/ModalSignup";
import DropdownNavbar from "./button/DropdownNavbar";
import { clickModalSignin, clickModalSignup } from "../_actions/modal";
import { connect } from "react-redux";
import { dataSign } from "../_actions/user";

class Header extends Component {
  constructor(props) {
    super(props);
    props.dataSign();
  }
  render() {
    const { sign, clickSignin, clickSignup } = this.props;
    const buttons =
      sign.signIn === true ? (
        <DropdownNavbar />
      ) : (
        [
          <Button
            key="1"
            variant="outline-danger"
            style={{ marginRight: "20px" }}
            onClick={() => {
              clickSignin();
            }}
          >
            Sign In
          </Button>,
          <Button
            key="2"
            variant="danger"
            style={{ marginRight: "20px" }}
            onClick={() => {
              clickSignup();
            }}
          >
            Sign Up
          </Button>,
        ]
      );

    return (
      <>
        <ModalSignin />
        <ModalSignup />
        <Navbar
          variant="light justify-content-between"
          className="mainNav"
          sticky="top"
        >
          <Navbar.Brand>
            <Link to="/">
              <img
                src={require("../components/logo/logo.png")}
                width="220"
                height="60"
                className="d-inline-block align-top"
                alt="Hallo Corona"
              />
            </Link>
          </Navbar.Brand>
          <Nav>{buttons}</Nav>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickSignin: () => dispatch(clickModalSignin()),
    clickSignup: () => dispatch(clickModalSignup()),
    dataSign: () => dispatch(dataSign()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
