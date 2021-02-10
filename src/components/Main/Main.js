import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import config from '../../config'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext';
import './Main.css';



// function WordList (props) {

//   const rows = props.data.map((w) => {
//     return (
//       <li key={w.id}>
//         <h4>{w.original}</h4>
//         <p>correct answer count: <span className="correct">{w.correct_count}</span></p>
//         <p>incorrect answer count: <span className="incorrect">{w.incorrect_count}</span></p>
//       </li>
//     );
//   });

//   return (
//     <ul className="WordList">{ rows }</ul>
//   );
// }

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
    return (
      <div className="Main">

        <div className="quizStart">
        
        <Link to="/Quiz"><button className="mainButton">Begin Quiz!</button></Link>
        </div>

        {/* <p>Total correct answers: {this.context.language.total_score}</p> */}
        

       <div className="sideNav">
        <p>Words To Practice:</p>
        {/* <WordList data={this.context.words} /> */}
       </div>

        {/* <div className="imgQuiz">
          <img src="https://images.unsplash.com/photo-1569072712109-6206fa3505b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" alt="blue walled restaraunt with brown chairs"></img>
        </div> */}


      </div>
    );
  }
}

export default Main