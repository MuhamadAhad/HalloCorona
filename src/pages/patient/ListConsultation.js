import React, { Component } from "react";
import Consultation from "../../components/content/Consultation";
import Header from "../../components/Header";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getConsultations } from "../../_actions/consultation";
import { dataSign } from "../../_actions/user";

class ListConsultation extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "1") {
      this.props.history.push("/");
    }
    await this.props.getConsuls();
  };

  render() {
    const { consuls } = this.props;
    const consul =
      consuls &&
      consuls.data &&
      consuls.data.length > 0 &&
      consuls.data.map((rec, idx) => {
        return <Consultation key={idx} consul={rec} />;
      });
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent">
            <h3>
              <i className="fas fa-comment-medical"></i> Consultation
            </h3>
            <div style={{ padding: 15 }}>
              {" "}
              {consuls && consuls.loading ? "" : consul}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
    consuls: state.consultations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    getConsuls: () => dispatch(getConsultations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListConsultation));
