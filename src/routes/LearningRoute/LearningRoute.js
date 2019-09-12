import React, { Component } from 'react'
import Api from '../../services/Api.service';
import Button from '../../components/Button/Button';
import './Learning.css'

class LearningRoute extends Component {

  state = {
    nextWord : {
      nextWord : '',
      wordCorrectCount : 0,
      wordIncorrectCount : 0,
      totalScore : 0,
      answer : '',
      isCorrect : null
    },
    currentWord : {
      word : '',
      wordCorrectCount : 0,
      wordIncorrectCount : 0,
      totalScore : 0,
      answer : '',
      isCorrect : null
    }
  }

  componentDidMount(){
    Api.doFetch('language/head')
    .then(res => {
      res.isCorrect = null
      console.log(res.nextWord)
      this.setState({
        // word : res.nextWord,
        currentWord : res
      })
    })
    .catch(e => console.log(e));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('test for learning submit');
    let guess = e.target['answer-input'].value;
    Api.doFetch('language/guess', 'POST', {guess})
      .then(res => {
        let newCurrentWord = {...this.state.currentWord}
        newCurrentWord.isCorrect = res.isCorrect
        res.isCorrect = null
        this.setState({
          nextWord : res,
          currentWord : newCurrentWord
        })
      });
    e.target['answer-input'].value = '';
  }

  handleNextWord = (e) => {
    //todo
  }


  render() {
    return (
      <section className='learning-container'>
        
        <h2>Translate the word:</h2>
        {this.state.currentWord === null && <p>nothing</p>}
        {this.state.currentWord !== null && this.state.currentWord.isCorrect && <p>You got it!</p>}
        {this.state.currentWord !== null && this.state.currentWord.isCorrect === false && <p>Sorry! The answer is: {this.state.currentWord.answer}</p>}
        <p></p>
        <div className='next-word-container'>
        <span id='next-word'>{this.state.currentWord.nextWord}</span>
        </div>
        <p>Your total score is: {this.state.currentWord.totalScore}</p>
        <p>You have answered this word correctly {this.state.currentWord.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.currentWord.wordIncorrectCount} times.</p>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input name='answer-input' id='learn-guess-input' type='text' required></input>
          {/* <button type='submit'>Submit your answer</button> */}
          <Button type='submit'>Submit your answer</Button>
        </form>
        <Button>Next word</Button>

      </section>
    );
  }
}

export default LearningRoute;
