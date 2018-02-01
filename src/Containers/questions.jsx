import React, { Component } from "react";
import axios from "axios";
import "./questions.scss";
import {
  Grid,
  Row,
  Col,
  Label,
  Button,
  FormGroup,
  Radio,
  Alert
} from "react-bootstrap";

const QUESTIONS_DATA_URL = "http://localhost:3000/questions";
const CORRECT_ANSWERS_DATA_URL = "http://localhost:3000/correctAnswers";

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsData: [],
      answersData: [],
      userName: props.userName,
      emailId: props.mailId,
      correctAnswersData: []
    };
  }
  componentDidMount() {
    axios
      .get(QUESTIONS_DATA_URL)
      .then(response => {
        console.log(response.data[0].QuestionAnswers);
        this.setState({ questionsData: response.data[0].QuestionAnswers });
      })
      .catch(function(error) {});
  }

  questionAnswer(questionNumber, answer) {
    const answerArray = this.state.answersData || [];
    const ansExist = answerArray.filter(
      ansIndex => ansIndex.questionNumber === questionNumber
    );
    if (ansExist.length) {
      answerArray[0].answer = answer;
    } else {
      answerArray.push({
        questionNumber,
        answer: answer
      });
    }
    this.setState({
      answersData: answerArray
    });
  }

  submitAnswers = () => {
    const userData = {
      UserName: this.state.userName,
      EmailId: this.state.emailId,
      Answers: this.state.answersData
    };
    axios
      .post("/answers", userData)
      .then(response => {
        this.setState({
          showAlert: true
        });
        this.postSubmitProcess();
      })
      .catch(function(error) {
        this.setState({
          showAlert: true,
          alertType: "danger",
          alertMessage: "Something went wrong. Sorry for the inconvenience"
        });
      });
  };

  postSubmitProcess = () => {
    const answers = this.state.answersData;
    axios
      .get(CORRECT_ANSWERS_DATA_URL)
      .then(response => {
        this.checkCorrectAnswers(response.data[0], answers);
      })
      .catch(function(error) {});

    this.props.resetLogin();
  };

  checkCorrectAnswers = ({ correctAnswers }, enteredAnswers) => {
    let correctAnsCount = 0;
    enteredAnswers.map(enteredAnswer => {
      const matchedAns = correctAnswers.filter(
        correctAnswerIndex =>
          correctAnswerIndex.questionNumber === enteredAnswer.questionNumber
      );
      if (matchedAns.length) {
        correctAnsCount =
          matchedAns[0].answer === enteredAnswer.answer
            ? correctAnsCount + 1
            : correctAnsCount;
      }
    });
    const UserData = {
      UserData: {
        participantName: this.state.userName,
        participantMailId: this.state.emailId,
        correctAnswersCount: correctAnsCount,
        timestamp: new Date()
      }
    };
    axios
      .post("/userData", UserData)
      .then(response => {
        console.log("Response Submitted Successfully");
      })
      .catch(function(error) {
        alert("Something went wrong, please try again");
      });
  };

  rendercheckbox = () => {
    return (
      <div>
        {this.state.questionsData.map((question, questionindex) => (
          <Col lg={6} className={"question-block"} key={questionindex}>
            <h2>{question.Question}</h2>
            <FormGroup>
              {question.Answers.map((answer, index) => (
                <Radio
                  name={questionindex}
                  key={index}
                  inline
                  onClick={e => this.questionAnswer(questionindex, answer)}
                >
                  {answer}
                </Radio>
              ))}
            </FormGroup>
          </Col>
        ))};
      </div>
    );
  };

  handleDismiss = () => {
    this.setState({
      showAlert: false
    });
  };
  render() {
    return (
      <div>
        <Grid fluid={true} />
        <Row>
          {this.state.questionsData.length > 0 && this.rendercheckbox()}
        </Row>
        <Row>
          <Col lg={12}>
            <div className="button-div">
              <Button bsStyle="success" onClick={this.submitAnswers}>
                SUBMIT
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
