import React from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import FeedbackNo from './Feedback';
import { Link } from 'react-router-dom'
import './Quiz.css'
import FeedbackYes from './FeedbackYes';

class Quiz extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      guess: '',
      nextWord: null,
      previousWord: null,
      totalScore: null,
      wordIncorrectCount: null,
      wordCorrectCount: null,
      answer: null,
      isCorrect: null,
      displayFeedback: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGuessChange = this.handleGuessChange.bind(this);
    this.handleNextWord = this.handleNextWord.bind(this);
  }

  componentDidMount() {
    this.fetchWords();
  }

  fetchWords(){
      fetch(`${config.API_ENDPOINT}/language/head`, 
      { headers: {'Authorization': `Bearer ${TokenService.getAuthToken()}`}})
    .then(response => {
      if(!response.ok)
        return response.json().then(e => Promise.reject(e))
      return response.json()
    }).then(Json => {
      this.setState(state => ({
        nextWord: Json.nextWord,
        totalScore: Json.totalScore,
        wordCorrectCount: Json.wordCorrectCount,
        wordIncorrectCount: Json.wordIncorrectCount
      }))
    })
    .catch(error => {
      console.error({ error })
    })
  }

  handleGuessChange(evt){
    this.setState({guess: evt.target.value, displayFeedback: false});
  }

  handleNextWord(){
    this.setState({displayFeedback: false, guess: ''});
  }
  
  handleFormSubmit(evt){
    evt.preventDefault();
    fetch(`${config.API_ENDPOINT}/language/guess`, 
    { method: 'POST',
      body: JSON.stringify({guess: this.state.guess}),
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'}})
    .then(response => {
      if(!response.ok)
        return response.json().then(e => Promise.reject(e))
      return response.json()
    }).then(Json => {
      this.setState(state => ({
        nextWord: Json.nextWord,
        totalScore: Json.totalScore,
        wordCorrectCount: Json.wordCorrectCount,
        wordIncorrectCount: Json.wordIncorrectCount,
        isCorrect: Json.isCorrect,
        answer: Json.answer,
        previousWord: this.state.nextWord,
        displayFeedback: true
      }))
    })
    .catch(error => {
      console.error({ error })
    })
  }
  

  render(){

    return (
      <div className="quizPage">
      <div className="quizbox">

        <div className="dashlink">
        <Link onClick={this.handleLogoutClick} to='/login'>Back to Dashboard</Link>
        </div>

      { this.state.displayFeedback ? 
      <Feedback guess={this.state.guess} previousWord={this.state.previousWord} handleFormSubmit={this.handleFormSubmit} handleGuessChange={this.handleGuessChange} isCorrect={this.state.isCorrect} handleNextWord={this.handleNextWord} answer={this.state.answer} /> 
      : 
      <Guess nextWord={this.state.nextWord} handleFormSubmit={this.handleFormSubmit} guess={this.state.guess} handleGuessChange={this.handleGuessChange} totalScore={this.state.totalScore} wordCorrectCount={this.state.wordCorrectCount} wordIncorrectCount={this.state.wordIncorrectCount}/>}

      </div>
      </div>
    );
  }
}

const Feedback = (props) => {
  if(props.isCorrect){
    return (<FeedbackYes previousWord={props.previousWord} answer={props.answer} guess={props.guess} handleNextWord={props.handleNextWord}/>);
  } else {
    return (<FeedbackNo previousWord={props.previousWord} answer={props.answer} guess={props.guess} handleNextWord={props.handleNextWord}/>);
  }
}

const Guess = (props) => {
  return (
    <>
      <p>Translate this word: </p>
        <div className="frenchWord">
        {props.nextWord}
        </div>
        
        <form onSubmit={props.handleFormSubmit}>
            <input className="quiz-input" id="quiz-input" name="quiz-input" type="text" required value={props.guess} onChange={props.handleGuessChange}/>
            <button className="submit" type="submit">Submit</button>
        </form>

        <div className="counterScore">
          <p>Your Total Score: {props.totalScore}</p>
          <p>Félicitations! You have answered this word correctly {props.wordCorrectCount} times.</p>
          <p>C'est Dommage! You have answered this word incorrectly {props.wordIncorrectCount} times.</p>
        </div>
    </>
  );
}

export default Quiz;







