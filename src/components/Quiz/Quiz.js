import React, {useContext} from 'react';
import UserContext from '../../contexts/UserContext';
import './Quiz.css'

const Quiz = (props) => {
  const context = useContext(UserContext);
  return (
    <div className="quizPage">
    {"Quiz"}


    </div>
  );
}

export default Quiz;