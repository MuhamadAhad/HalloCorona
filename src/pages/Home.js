import React, { Component } from "react";
import Header from "../components/Header";
import CardArticle from "../components/card/CardArticle";
import { connect } from "react-redux";
import { getArticles } from "../_actions/article";
import { withRouter } from "react-router-dom";
import { dataSign } from "../_actions/user";
import { Button } from "react-bootstrap";
import { clickModalSignin } from "../_actions/modal";
//import {dateNow} from "../function/countDate";

class Home extends Component {
  constructor(props) {
    super(props);
    this.checkSign();
  }

  checkSign = async () => {
    await this.props.dataSign();
    if (this.props.sign.signIn === true && this.props.sign.level === "0") {
      this.props.history.push("/listreservation");
    }
  };

  componentDidMount = () => {
    //await this.props.getArticles(dateNow());
    this.props.getArticles(null);
  };

  render() {
    const { articles, sign, clickSignin, history } = this.props;
    return (
      <>
        <Header />
        <div className="content">
          <div className="mainImageContainer">
            <div
              style={{ display: "flex", width: "50%", flexDirection: "column" }}
            >
              <div>
                <img
                  src={require("../images/secondImg.png")}
                  alt="mainImg"
                  width="100%"
                />
              </div>
              <div className="buttonHomeContainer">
                <div
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderRadius: 5,
                  }}
                >
                  <Button
                    variant="outline-danger"
                    size="lg"
                    onClick={() => {
                      if (sign.signIn === true && sign.level === "1") {
                        history.push("/addconsultation");
                      } else if (this.props.sign.signIn !== true) {
                        clickSignin();
                      }
                    }}
                  >
                    <img
                      src={require("../images/picButtonHome.png")}
                      alt="mainImg"
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                    />{" "}
                    <strong>Konsultasi dengan dokter</strong>
                  </Button>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", width: "50%" }}>
              <img
                src={require("../images/mainImg.png")}
                alt="mainImg"
                width="100%"
              />
            </div>
          </div>
        </div>
        <div className="homeTitle">
          <h1 className="titleColor" style={{ padding: 0, margin: 0 }}>
            <strong>Artikel Hari ini</strong>
          </h1>
        </div>
        <div className="mainHomeContent">
          {articles.data &&
            articles.data.length > 0 &&
            articles.data.map((rec, idx) => (
              <CardArticle data={rec} key={idx} />
            ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    sign: state.dataSign,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (date) => dispatch(getArticles(date)),
    dataSign: () => dispatch(dataSign()),
    clickSignin: () => dispatch(clickModalSignin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
