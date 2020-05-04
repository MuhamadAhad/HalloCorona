import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ConsultationPage from "../content/ConsultationPage";
import { connect } from "react-redux";
import { clickModalApproval } from "../../_actions/modal";

class ApprovalConsultation extends Component {
  render() {
    const { modal, clickModal, loading } = this.props;
    return (
      <Modal
        show={modal}
        onHide={() => {
          clickModal();
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {loading ? (
            <div> your response in process</div>
          ) : (
            <ConsultationPage />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

const mapstateToProps = (state) => {
  return {
    modal: state.modal.modalApproval,
    loading: state.consultation.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickModal: () => dispatch(clickModalApproval()),
  };
};

export default connect(
  mapstateToProps,
  mapDispatchToProps
)(ApprovalConsultation);
