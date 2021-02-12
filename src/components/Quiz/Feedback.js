import React from 'react';

import './Quiz.css'

const FeedbackNo = (props) => {
  
  return (
    <div className="feedback">
      <div className="feedbackBox">
        <p>Sacre Bleu! You did not get this one right. </p>
        <p>{props.previousWord} actually means {props.answer} and you guessed {props.guess}!</p>
        <button onClick={props.handleNextWord} className="NEXT">Next Word</button>
      </div>
    </div>
  );
}

export default FeedbackNo;