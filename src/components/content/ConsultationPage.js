import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  responseConsultation,
  getConsultations,
} from "../../_actions/consultation";
import { dataSign } from "../../_actions/user";
import FormatDate from "../../function/FormatDate";

class ConsultationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
    };
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true) {
      this.props.history.push("/");
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  getContent = (status) => {
    if (status === "waiting") {
      return (
        <>
          <div>
            <Form>
              <Form.Group>
                <Form.Label>
                  <strong>Give Response</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  name="response"
                  value={this.state.response}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "30%",
                marginRight: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    this.handleClick("cancel");
                  }}
                >
                  <strong>Cancel</strong>
                </Button>
                <Button
                  variant="success"
                  onClick={async () => {
                    const data = {
                      response: this.state.response,
                      status: "approve",
                    };
                    await this.props.responConsul(data, this.props.consul.id);
                    await this.props.getConsuls();
                  }}
                >
                  <strong>Approve</strong>
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    } else if (status === "approve") {
      return <div>{this.props.consul.Reply.response}</div>;
    }
  };

  render() {
    const { consul } = this.props;
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
            }}
          >
            <div>
              <h3>{consul.subject}</h3>
            </div>
            <div>
              <small>
                <p>{consul.description}</p>
              </small>
            </div>
          </div>
          <div style={{ display: "flex", width: "30%", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "30%",
                alignItems: "center",
              }}
            >
              <div>
                <i className="fas fa-dot-circle"></i>
              </div>
              <div className="verticalLine"></div>
              <div>
                <i className="fas fa-circle"></i>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <div>
                <h6 style={{ marginBottom: 0 }}>Date of Complaint</h6>
                <small className="text-muted">
                  {FormatDate.convertDate(consul.createdAt)}
                </small>
              </div>
              <div style={{ height: 30 }}></div>
              <div style={{ marginTop: 20 }}>
                <h6 style={{ marginBottom: 0 }}>Live consultation</h6>
                <small className="text-muted">
                  {FormatDate.convertDate(consul.liveConsul)}
                </small>
              </div>
            </div>
          </div>
          <br />
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Height</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-muted">1</td>
              <td className="text-muted">{consul.fullName}</td>
              <td className="text-muted">{consul.gender}</td>
              <td className="text-muted">{consul.phone}</td>
              <td className="text-muted">{consul.age}</td>
              <td className="text-muted">{consul.height}</td>
              <td className="text-muted">{consul.weight}</td>
            </tr>
          </tbody>
        </table>
        {this.getContent(consul.status)}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    consul: state.consultation.data,
    sign: state.dataSign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    responConsul: (data, id) => dispatch(responseConsultation(data, id)),
    dataSign: () => dispatch(dataSign()),
    getConsuls: () => dispatch(getConsultations()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationPage);
