import React, { Component } from "react";
import FormatDate from "../../function/FormatDate";

class Consultation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
            <div style={{ width: "12%" }}></div>
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
                  {consul && consul.Reply && consul.Reply.response}
                </span>
              </div>
              <div>
                <span className="text-muted">
                  {consul && consul.Reply && consul.Reply.User.fullName}
                </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Consultation;
