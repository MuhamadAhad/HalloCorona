import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import ReactMarkdown from "react-markdown";
import FormatDate from "../../function/FormatDate";

class Consultation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  mdParser = new MarkdownIt();

  stylingStatus = (status) => {
    if (status === "approve") {
      return (
        <small className="alert alert-success" style={{ padding: 5 }}>
          Approved
        </small>
      );
    } else if (status === "cancel") {
      return (
        <small className="alert alert-danger" style={{ padding: 5 }}>
          Canceled
        </small>
      );
    }
  };

  render() {
    const { consul } = this.props;
    const dateConsul = FormatDate.convertDate(consul.createdAt);
    const dateUpdate = FormatDate.convertDate(consul.updatedAt);
    return (
      <div className="consulShadow">
        <div className="mainConsul">
          <div className="avatarContainer">
            <div>
              <img
                src={require("../../images/khabib_nurmagomedov.jpg")}
                alt="avatar"
                width="70px"
                height="70px"
                className="avatar"
              />
            </div>
          </div>
          <div className="consulDesc">
            <div>
              <h4>{consul.subject}</h4>
            </div>
            <div>
              <span className="text-muted">{dateConsul}</span>
            </div>
            <div>
              <span className="text-muted">Keluhan : {consul.description}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "15%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{dateUpdate}</strong>
            </div>
          </div>
        </div>
        <hr />
        {consul && consul.Reply !== null ? (
          <div className="mainConsul">
            <div
              style={{
                width: "12%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {consul.status &&
                consul.Reply &&
                consul.Reply.response !== "" &&
                this.stylingStatus(consul.status)}
            </div>
            <div className="avatarContainer">
              <div>
                <img
                  src={require("../../images/doctor.png")}
                  alt="avatar"
                  width="70px"
                  height="70px"
                  className="avatar"
                />
              </div>
            </div>

            <div className="consulDesc">
              <div>
                <span className="text-muted">
                  {consul.Reply && consul.Reply.response !== "" ? (
                    <ReactMarkdown
                      escapeHtml={false}
                      source={this.mdParser.render(consul.Reply.response)}
                    />
                  ) : (
                    this.stylingStatus(consul.status)
                  )}
                </span>
              </div>
              <div>
                <small className="text-muted">
                  Dr. {consul && consul.Reply && consul.Reply.User.fullName}
                </small>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <h5 className="text-muted"> Waiting reply </h5>
          </div>
        )}
      </div>
    );
  }
}

export default Consultation;
