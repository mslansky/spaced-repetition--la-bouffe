import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext';
import './Main.css';

const Words = (props) => {
  if(!props.words) {
    return "";
  }
  return (
    <ul>
      {props.words.map((word) => {
        return (
          <div key={word.id}>
            <li className ="word">{word.original}</li>
            <li className = "correctWord">Correct: {word.correct_count}</li>
            <li className = "incorrectWord">Incorrect: {word.incorrect_count}</li>
          </div>
        );
      })}
    </ul>
  )
}

class Main extends Component {

  static contextType = UserContext;

  componentDidMount() {

    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json();
    })
    .then((json) => {
      this.context.setLanguage(json.language);
      this.context.setWords(json.words);
    })
    .catch(res => {
      this.context.setError(res.error);
    });
  }

  render() {
    console.log(this.context); //TODO
    return (
      <div className="Main">

        <div className="quizStart">
        
        <Link to="/Quiz"><button className="mainButton">Begin Quiz!</button></Link>
        </div>

       <div className="sideNav">
         <p>Current Score: {this.context.language ? this.context.language.total_score : ""}</p>
        <p>Words To Practice:</p>
        <Words words={this.context.words} />
       </div>



      </div>
    );
  }
}

export default Main