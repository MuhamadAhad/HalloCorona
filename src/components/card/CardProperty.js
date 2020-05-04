import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardProperty extends Component {
  render() {
    const { id, title, description, attach } = this.props.data;
    return (
      <div className="cardContainer">
        <div className="cardPro">
          <Link to={`/article/${id}`}>
            <div>
              <img src={attach} className="imageCard" alt="" />
            </div>
          </Link>
          <div
            style={{
              padding: 15,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              <strong>{title}</strong>
            </div>
            <div>
              <small className="text-muted">
                {description && description.substr(0, 120).concat("... ")}
                <Link
                  to={`/article/${id}`}
                  style={{ textDecoration: "none", color: "#dc3545" }}
                  className="titleColor"
                >
                  baca selengkapnya
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardProperty;
