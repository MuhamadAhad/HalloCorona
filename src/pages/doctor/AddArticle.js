import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, InputGroup, Button } from "react-bootstrap";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";

import { createArticle } from "../../_actions/article";
import { haveValue } from "../../function/FormatNumber";
import Header from "../../components/Header";
import { dataSign } from "../../_actions/user";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
    this.state = {
      validated: false,
      title: "",
      description: "",
      attach: "",
      tags: "",
    };
  }

  mdParser = new MarkdownIt();

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn !== true || this.props.sign.level !== "0") {
      this.props.history.push("/");
    }
  };

  handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    this.setState({ validated: true });
    const { title, description, attach, tags } = this.state;
    if (
      haveValue(title) &&
      haveValue(description) &&
      haveValue(attach) &&
      haveValue(tags)
    ) {
      const data = {
        title,
        description,
        attach,
        tags,
      };
      await this.props.createArticle(data);
      if (this.props.loading === false) {
        this.props.history.push(`/article/${this.props.article.id}`);
      }
    }
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({ description: text });
  };

  render() {
    const { validated } = this.state;
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainContent mainShadow">
            <h3 className="titleColor">
              <i className="fas fa-file-medical"></i> Add Article
            </h3>
            <br />
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Group controlId="validationCustom10">
                <Form.Label>Title</Form.Label>

                <Form.Control
                  required
                  type="text"
                  placeholder="enter the title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom10">
                <Form.Label>Tags</Form.Label>

                <Form.Control
                  required
                  type="text"
                  placeholder="separate tags using space"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom11">
                <Form.Label>upload Image</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">
                      Image URL :
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="text"
                    name="attach"
                    placeholder=""
                    value={this.state.upload}
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <MdEditor
                  value={this.state.description}
                  style={{ height: "500px" }}
                  renderHTML={(text) => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
                />
              </Form.Group>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button type="submit" variant="danger" style={{ width: 250 }}>
                  <strong>Post</strong>
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sign: state.dataSign,
    loading: state.article.loading,
    article: state.article.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dataSign: () => dispatch(dataSign()),
    createArticle: (data) => dispatch(createArticle(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddArticle));
