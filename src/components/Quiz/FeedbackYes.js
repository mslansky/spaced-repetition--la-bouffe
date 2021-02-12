import React from 'react';

import './Quiz.css'




const FeedbackYes = (props) => {
  
  return (
    <div className="feedbackYes">
      <div className="feedbackBoxYes">
        <p>Bravo! You got it right! </p>
        <p>The correct translation for {props.previousWord} was {props.answer} and you chose {props.guess}!</p>
        <button onClick={props.handleNextWord} className="NEXT">Next Word</button>
        
      </div>
    </div>
  );
}

export default FeedbackYes;