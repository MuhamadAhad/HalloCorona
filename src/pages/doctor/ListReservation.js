import React, { Component } from "react";
import Header from "../../components/Header";
import { getConsultations, getConsultation } from "../../_actions/consultation";
import { connect } from "react-redux";
import { clickModalApproval } from "../../_actions/modal";
import ApprovalConsultation from "../../components/modal/ApprovalConsultation";
import { dataSign } from "../../_actions/user";
import { withRouter } from "react-router-dom";
import FormatDate from "../../function/FormatDate";

class ListReservation extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "0") {
      this.props.history.push("/");
    }
  };

  stylingStatus(status) {
    if (status === "approve") {
      return (
        <small className="alert alert-success" style={{ padding: 5 }}>
          Waiting live consultation
        </small>
      );
    } else if (status === "waiting") {
      return (
        <small className="alert alert-warning" style={{ padding: 5 }}>
          Pending
        </small>
      );
    } else if (status === "cancel") {
      return (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Cancel
        </small>
      );
    }
  }

  handleAction = (id) => {
    this.props.getConsul(id);
    this.props.clickModal();
  };

  componentDidMount() {
    this.props.getConsuls();
  }

  render() {
    const { consuls } = this.props;
    const list =
      consuls &&
      consuls.length > 0 &&
      consuls.map((ls, idx) => {
        return (
          <tr key={idx}>
            <td>{++idx}</td>
            <td>{ls.fullName}</td>
            <td>{ls.subject}</td>
            <td>{FormatDate.convertDate(ls.createdAt)}</td>
            <td>{this.stylingStatus(ls.status)}</td>
            <td>
              <i
                className={`fas fa-search`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.handleAction(ls.id);
                }}
              ></i>
            </td>
          </tr>
        );
      });
    return (
      <>
        <Header />
        <ApprovalConsultation />
        <div className="content">
          <div className="mainContent mainShadow">
            <h3 className="titleColor">
              <i className="fas fa-file-medical-alt"></i> Reservasi Data
            </h3>
            <br />
            <table
              className="table table-striped"
              style={{ textAlign: "center" }}
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Users</th>
                  <th>Subject</th>
                  <th>Date of Complaint</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    consuls: state.consultations.data,
    loading: state.consultations.loading,
    sign: state.dataSign,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getConsuls: () => dispatch(getConsultations()),
    getConsul: (idcons) => dispatch(getConsultation(idcons)),
    clickModal: () => dispatch(clickModalApproval()),
    dataSign: () => dispatch(dataSign()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListReservation));
