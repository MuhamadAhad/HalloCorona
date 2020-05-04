import React, { Component } from "react";
import Header from "../components/Header";
import { Row, Col, Image, Button } from "react-bootstrap";
import ApersonalInfo from "../components/content/ApersonalInfo";
import ChangePwd from "../components/modal/ChangePwd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../_actions/user";
import { clickModalPassword } from "../_actions/modal";
import { dataSign } from "../_actions/user";

class DetailProfile extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  handlePhotoProfile() {
    document.getElementsByName("pp")[0].click();
  }

  uploadPhoto(e) {}

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true) {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    this.props.profile();
  }

  render() {
    const { data } = this.props.dataProfile;
    return (
      <>
        <Header />
        <div className="content">
          <ChangePwd />
          <Row className="profileInfo">
            <Col sm={6}>
              <h3>Personal Info</h3>
              <ApersonalInfo
                icon="user"
                dataValue={data.fullName}
                dataName="Full Name"
              />
              <ApersonalInfo
                icon="envelope"
                dataValue={data.email}
                dataName="Email Address"
              />
              <ApersonalInfo
                icon="lock"
                dataValue="Password"
                dataName="Change Password"
                reqModalPwd={() => {
                  this.props.modalPassword();
                }}
              />
              <ApersonalInfo
                icon="home"
                dataValue={data.asId === "0" ? "Doctor" : "Patient"}
                dataName="Status"
              />
              <ApersonalInfo
                icon="venus-mars"
                dataValue={data.gender}
                dataName="Gender"
              />
              <ApersonalInfo
                icon="phone"
                dataValue={data.phone}
                dataName="Phone Number"
              />
              <ApersonalInfo
                icon="map-marker"
                dataValue={data.address}
                dataName="Address"
              />
            </Col>
            <Col sm={6} className="profilePicture">
              <div>
                <Image
                  src={require(`../images/${
                    data.asId === "1" ? "khabib_nurmagomedov.jpg" : "doctor.png"
                  }`)}
                  height="300px"
                  width="300px"
                  style={{ borderRadius: 5 }}
                />
                <Button
                  style={{ marginTop: 7 }}
                  onClick={this.handlePhotoProfile}
                  variant="danger"
                  block
                >
                  Change Photo Profile
                </Button>
                <input
                  type="file"
                  className="uploadPhotoProfile"
                  name="pp"
                  onChange={this.uploadPhoto}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.profile,
    sign: state.dataSign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profile: (token) => dispatch(getProfile(token)),
    modalPassword: () => dispatch(clickModalPassword()),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailProfile));
