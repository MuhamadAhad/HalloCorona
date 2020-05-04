import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import DetailProfile from "./pages/DetailProfile";
import ListReservation from "./pages/doctor/ListReservation";
import AddArticle from "./pages/doctor/AddArticle";
import AddConsultation from "./pages/patient/AddConsultation";
import ListConsultation from "./pages/patient/ListConsultation";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/article/:id">
            <Article />
          </Route>

          <Route exact path="/detailprofile">
            <DetailProfile />
          </Route>
          <Route exact path="/addarticle">
            <AddArticle />
          </Route>
          <Route exact path="/listreservation">
            <ListReservation />
          </Route>

          <Route exact path="/addconsultation">
            <AddConsultation />
          </Route>
          <Route exact path="/listconsultation">
            <ListConsultation />
          </Route>

          <Route exact path="*" component={() => "404 FILE NOT FOUND"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
