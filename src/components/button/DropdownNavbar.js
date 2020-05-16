import React, { Component } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { dataSign } from "../../_actions/user";
import { connect } from "react-redux";

class DropdownNavbar extends Component {
  constructor(props) {
    super(props);
    props.dataSign();
    this.state = {};
  }

  handleSignout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.props.dataSign();
    this.props.history.push("/");
  };

  render() {
    const secondMenu =
      this.props.sign.level === "0" ? (
        <Dropdown.Item as={Link} to="/addarticle" variant="danger">
          <i className="fas fa-book-medical"></i> Add Article
        </Dropdown.Item>
      ) : (
        <Dropdown.Item as={Link} to="/listconsultation" variant="danger">
          <i className="fas fa-notes-medical"></i> Consultation
        </Dropdown.Item>
      );
    return (
      <Dropdown drop="left" variant="danger">
        <Dropdown.Toggle
          as={Image}
          src={require(`../../images/${
            this.props.sign.level === "1"
              ? "khabib_nurmagomedov.jpg"
              : "doctor.png"
          }`)}
          alt="avatar"
          width="50px"
          height="50px"
          className="avatar"
          variant="danger"
        ></Dropdown.Toggle>

        <Dropdown.Menu variant="danger">
          <Dropdown.Item as={Link} to="/detailprofile" variant="danger">
            <i className="fas fa-user"></i> Profile
          </Dropdown.Item>

          {secondMenu}
          <hr style={{ margin: 0 }} />
          <Dropdown.Item
            as="button"
            onClick={this.handleSignout}
            variant="danger"
          >
            <i className="fas fa-power-off"></i> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
    dataSign: () => dispatch(dataSign()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DropdownNavbar));
