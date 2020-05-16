import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import {
  responseConsultation,
  getConsultations,
} from "../../_actions/consultation";
import { dataSign } from "../../_actions/user";
import FormatDate from "../../function/FormatDate";
import { haveValue } from "../../function/FormatNumber";

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

  mdParser = new MarkdownIt();

  handleEditorChange = ({ html, text }) => {
    this.setState({ response: text });
  };

  stylingStatus = (status) => {
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
  };

  stylingResponse = (status, doctor) => {
    if (status === "approve") {
      return (
        <small className="alert alert-success" style={{ padding: 5 }}>
          Approved by Dr. {doctor}
        </small>
      );
    } else if (status === "cancel") {
      return (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Canceled by Dr. {doctor}
        </small>
      );
    }
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
                <MdEditor
                  value=""
                  style={{ height: "200px" }}
                  renderHTML={(text) => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
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
                  onClick={async () => {
                    if (haveValue(this.state.response)) {
                      const data = {
                        response: this.state.response,
                        status: "cancel",
                      };
                      await this.props.responConsul(data, this.props.consul.id);
                      await this.props.getConsuls();
                    }
                  }}
                >
                  <strong>Cancel</strong>
                </Button>
                <Button
                  variant="success"
                  onClick={async () => {
                    if (haveValue(this.state.response)) {
                      const data = {
                        response: this.state.response,
                        status: "approve",
                      };
                      await this.props.responConsul(data, this.props.consul.id);
                      await this.props.getConsuls();
                    }
                  }}
                >
                  <strong>Approve</strong>
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    } else if (status !== "waiting") {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            {
              <ReactMarkdown
                source={
                  this.props.consul.Reply.response &&
                  this.mdParser.render(this.props.consul.Reply.response)
                }
                escapeHtml={false}
              />
            }
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="text-muted">
              {this.stylingResponse(
                this.props.consul.status,
                this.props.consul.Reply.User.fullName
              )}
            </span>
          </div>
        </div>
      );
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
              justifyContent: "space-between",
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
            <div>{this.stylingStatus(consul.status)}</div>
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
        <table className="table" style={{ textAlign: "center" }}>
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
              <td className="text-muted">{`${consul.age} years old`}</td>
              <td className="text-muted">{`${consul.height} cm`}</td>
              <td className="text-muted">{`${consul.weight} kg`}</td>
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
