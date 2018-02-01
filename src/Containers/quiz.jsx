import React, { Component } from "react";
import "./quiz.scss";
import Questions from "./questions";
import megathonLogo from "../../images/megathon.png";
import {
  Grid,
  Row,
  Col,
  Image,
  FormGroup,
  FormControl,
  Label,
  Button,
  Alert
} from "react-bootstrap";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isQuestionaire: false,
      Username: "",
      mailId: "",
      showAlert: false,
      alertType: "danger",
      alertMessage: ""
    };
  }

  resetLogin = () => {
    this.setState({
      isLogin: true,
      isQuestionaire: false,
      alertType: "success",
      showAlert: true,
      alertMessage:
        "Your response has been recorded. Thank You for your participation"
    });
  };
  handleUserNameChange = e => {
    this.setState({ Username: e.target.value, showAlert: false });
  };

  handleMailIdChange = e => {
    this.setState({ mailId: e.target.value, showAlert: false });
  };

  submitLogin = () => {
    if (this.state.Username && this.state.mailId) {
      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.mailId)
      ) {
        this.setState({
          isLogin: false,
          isQuestionaire: true
        });
      } else {
        this.setState({
          showAlert: true,
          alertMessage: "You have entered an invalid email address!"
        });
      }
    } else {
      this.setState({
        showAlert: true,
        alertMessage: "Please enter all the details"
      });
    }
  };

  handleDismiss = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col lg={12} className="quiz-banner">
              <Image src={megathonLogo} rounded />
              <h1>MEGATHON QUIZ</h1>
            </Col>
          </Row>
          {this.state.isLogin && (
            <Row>
              <Col lg={4} />
              <Col lg={4} className="login-banner">
                <form>
                  <FormGroup controlId="formBasicText">
                    <h3>
                      <Label>Enter your Team Name</Label>
                    </h3>
                    <FormControl
                      type="text"
                      placeholder="Username"
                      onChange={this.handleUserNameChange}
                    />
                    <h3>
                      <Label>Enter your Deloitte MailId</Label>
                    </h3>
                    <FormControl
                      type="text"
                      placeholder="EmailId"
                      onChange={this.handleMailIdChange}
                    />
                  </FormGroup>
                  <div className="button-div">
                    <Button bsStyle="success" onClick={this.submitLogin}>
                      Start Quiz
                    </Button>
                  </div>
                </form>
              </Col>
              <Col lg={4} />
            </Row>
          )}
          {this.state.isQuestionaire && (
            <Row>
              <Col lg={12} className="questions-banner">
                <Questions
                  userName={this.state.Username}
                  mailId={this.state.mailId}
                  resetLogin={this.resetLogin}
                />
              </Col>
            </Row>
          )}
          {this.state.showAlert && (
            <Alert
              bsStyle={this.state.alertType}
              onDismiss={this.handleDismiss}
            >
              <h4>MEGATHON QUIZ</h4>
              <p>{this.state.alertMessage}</p>
            </Alert>
          )}
        </Grid>
      </div>
    );
  }
}
