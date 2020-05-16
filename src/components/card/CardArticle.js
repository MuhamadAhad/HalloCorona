import React, { Component } from "react";
import { Button } from "react-bootstrap";
//import MarkdownIt from "markdown-it";
//import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

class CardArticle extends Component {
  render() {
    const { id, title, description, attach, tags } = this.props.data;
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
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong>{title}</strong>
            </div>
            <div>
              <p>
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
              </p>
            </div>
            <div>
              {tags &&
                tags.split(" ").map((data, idx) => (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    style={{ marginRight: 5, padding: 3, marginTop: 10 }}
                  >
                    <small>{data}</small>
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardArticle;
