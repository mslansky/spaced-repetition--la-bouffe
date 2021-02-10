import React, { Component } from 'react'

import config from '../../config';
import TokenService from '../../services/token-service';

import './LearningRoute.css';

class LearningRoute extends Component {

  state = {

    word: null,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,

    nextWord: null,
    nextWordCorrectCount: 0,
    nextWordIncorrectCount: 0,

    totalScore: 0,

    guess: null,
    answer: null,
    correct: null,
  }

  componentDidMount() {

    this.getNextWord();
  }

  handleFormSubmit = (ev) => {

    ev.preventDefault();

    const  { guessInput } = ev.target;

    if (guessInput) {
      this.makeGuess(guessInput.value);
    } else {
      this.setState({
        word: this.state.nextWord,
        wordCorrectCount: this.state.nextWordCorrectCount,
        wordIncorrectCount: this.state.nextWordIncorrectCount,
        guess: null,
        answer: null,
        correct: null,
      });
    }
  }

  makeGuess = (guess) => {

    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({guess})
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(json => {

      let correctCount = this.state.wordCorrectCount;
      let incorrectCount = this.state.wordIncorrectCount;
      if (json.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }

      this.setState({
        guess: guess,
        correct: json.isCorrect,
        answer: json.answer,
        nextWord: json.nextWord,
        nextWordCorrectCount: json.wordCorrectCount,
        nextWordIncorrectCount: json.wordIncorrectCount,
        totalScore: json.totalScore,
        wordCorrectCount: correctCount,
        wordIncorrectCount: incorrectCount,

      })

      guess = '';
    });
  };

  getNextWord = () => {

    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then((json) => {

      this.setState({
        word: json.nextWord,
        wordCorrectCount: json.wordCorrectCount,
        wordIncorrectCount: json.wordIncorrectCount,

        nextWordCorrectCount: 0,
        nextWordIncorrectCount: 0,

        totalScore: json.totalScore,

        guess: null,
        answer: null,
        correct: null,
      });
    })
  };

  renderPrompt = () => {

    return (
      <section id="LearningRoute">

        <h2>Translate the word:</h2>

        <span className="word">{this.state.word}</span>

        <div className="CenterFormContainer">
          <form onSubmit={this.handleFormSubmit}>
            <label className="Label" htmlFor="learn-guess-input">What's the translation for this word?</label><br />
            <input className="Input" id="learn-guess-input" name="guessInput" type="text" defaultValue="" required/><br />
            <button className="Button" type="submit">Submit your answer</button>
          </form>
        </div>

        <div className="DisplayScore"><p>Your total score is: {this.state.totalScore}</p></div>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>

      </section>
    );
  }

  renderFeedback = () => {

    let outcome;
    let button = <button className="Button" type="submit">Submit your answer</button>;
    let header = <h2>Translate the word:</h2>;

    if (this.state.correct === true) {
      header = (
        <h2>You were correct! :D</h2>
      )
      outcome = (
        <div className="DisplayFeedback">
          <p>The correct translation for {this.state.word} was <strong>{this.state.answer}</strong> and you chose <strong>{this.state.guess}</strong>!</p>
        </div>
      )
      button = (
        <button className="Button" type="submit">Try another word!</button>
      )
    }

    if (this.state.correct === false) {
      header = (
        <h2>Good try, but not quite right :(</h2>
      )
      outcome = (
        <div className="DisplayFeedback">
          <p>The correct translation for {this.state.word} was <strong>{this.state.answer}</strong> and you chose <strong>{this.state.guess}</strong>!</p>
        </div>
      );

      button = (
        <button className="Button" type="submit">Try another word!</button>
      )
    }

    return (
      <section id="LearningRoute">

        { header }

        { outcome }

        <div className="CenterFormContainer">
          <form onSubmit={this.handleFormSubmit}>
            {button}
          </form>
        </div>

        <div className="DisplayScore"><p>Your total score is: {this.state.totalScore}</p></div>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>

      </section>
    );
  }

  render() {

    if (this.state.correct === true || this.state.correct === false) {
      return this.renderFeedback();
    }

    return this.renderPrompt();
  }
}

export default LearningRoute