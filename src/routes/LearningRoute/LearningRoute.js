import React, { Component } from 'react'
import Api from '../../services/Api.service';

class LearningRoute extends Component {

  state = {
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0
  }

  componentDidMount(){
    Api.doFetch('language/head')
    .then(res => {
      this.setState({//res
        nextWord : res.nextWord,
        wordCorrectCount : res.wordCorrectCount,
        wordIncorrectCount : res.wordIncorrectCount,
        totalScore : res.totalScore
      })
    })
    .catch(e => console.log(e));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('test');
    let input = e.target['answer-input'].value
    // Api.doFetch('language/guess', 'POST', input)
      
    e.target['answer-input'].value = '';
  }


  render() {
    return (
      <section>
        
        <h2>Translate the word:</h2>
        <span id='next-word'>{this.state.nextWord}</span>
        <p>Your total score is: {this.state.totalScore}</p>
        <p>You have answered this word correctly {this.state.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input name='answer-input' id='learn-guess-input' type='text' required></input>
          <button type='submit'>Submit your answer</button>
        </form>
      </section>
    );
  }
}

export default LearningRoute
