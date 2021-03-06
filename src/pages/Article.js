import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownIt from "markdown-it";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../components/Header";
import { getArticle } from "../_actions/article";
import { dataSign } from "../_actions/user";
import FormatDate from "../function/FormatDate";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkSign = async () => {
    await this.props.dataSign();
  };

  componentDidMount = () => {
    this.props.gArticle(this.props.match.params.id);
  };

  mdParser = new MarkdownIt();

  render() {
    const { article } = this.props;
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent">
            <div>
              <h1
                className="text-muted"
                style={{ textShadow: "0.05em 0.05em 2px #6c757d" }}
              >
                {article.title}
              </h1>
            </div>
            <div style={{ marginTop: 10, marginBottom: 15 }}>
              {article.tags &&
                article.tags.split(" ").map((data, idx) => (
                  <span key={idx} className="labelImg">
                    {data}
                  </span>
                ))}
            </div>
            <div>
              <span
                className="text-muted"
                style={{ textShadow: "0.05em 0.05em 2px #6c757d" }}
              >
                {FormatDate.convertDate(article.createdAt)}
              </span>
            </div>
            <div>
              <span
                className="text-muted"
                style={{ textShadow: "0.05em 0.05em 2px #6c757d" }}
              >
                Author :{" "}
              </span>
              <span
                style={{
                  color: "#dc3545",
                  textShadow: "0.05em 0.05em 2px #6c757d",
                }}
              >
                Dr. {article.User && article.User.fullName}
              </span>
            </div>
            <br />
            <div className="articleContainer">
              <div>
                <img
                  className="d-block w-100 mainImage"
                  src={article.attach}
                  alt="article"
                />
              </div>
              <div style={{ padding: 10, marginTop: 10 }}></div>
              <div>
                <ReactMarkdown
                  source={
                    article.description &&
                    this.mdParser.render(article.description)
                  }
                  escapeHtml={false}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.article.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    gArticle: (id) => dispatch(getArticle(id)),
    dataSign: () => dispatch(dataSign()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Article));
