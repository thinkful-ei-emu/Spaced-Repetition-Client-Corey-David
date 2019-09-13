import React, { Component } from 'react'
import Api from '../../services/Api.service';
import Button from '../../components/Button/Button';
import './Learning.css'

class LearningRoute extends Component {

  state = {
  guess : '',
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
      res.word = res.nextWord
      console.log(res.nextWord)
      this.setState({
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
        console.log(newCurrentWord)
        newCurrentWord.isCorrect = res.isCorrect
        newCurrentWord.answer = res.answer
        res.isCorrect = null
        this.setState({
          nextWord : res,
          currentWord : newCurrentWord,
          guess
        })
      });
    e.target['answer-input'].value = '';
  }

  handleNextWord = (e) => {
    //next word => this.state.current.word
    e.preventDefault();
    let nextQ = {...this.state.nextWord}
    nextQ.answer = '';
    nextQ.isCorrect = null;
    this.setState({
      currentWord : nextQ,
      nextWord : {},
      guess : ''
    })
    
  }


  render() {
    let answer = this.state.currentWord.isCorrect ? 
      <h2 className='DisplayFeedback'>You were correct!</h2> : 
      <h2>Good try, but not quite right.</h2>

    return (
      <section className='learning-container'>
        
        {this.state.guess === '' && <div className='next-word-container'>
          <h2>Translate the word:</h2>
          <span id='next-word'>{this.state.currentWord.nextWord}</span>
        </div>}

        {this.state.currentWord === null && <p>nothing</p>}
        {this.state.currentWord.isCorrect !== null && answer}
        
        <div className='DisplayFeedback'>
          {this.state.currentWord.isCorrect === false && <p className='DisplayFeedback'>The correct translation for {this.state.currentWord.word} was {this.state.currentWord.answer} and you chose {this.state.guess}!</p>}

          {this.state.currentWord.isCorrect === true && <p className='DisplayFeedback'>The correct translation for {this.state.currentWord.word} was {this.state.currentWord.answer} and you chose {this.state.guess}!</p>}
        </div>

        <div className='DisplayScore'>
          <p>Your total score is: {this.state.currentWord.totalScore}</p>
        </div>
        <p>You have answered this word correctly {this.state.currentWord.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.currentWord.wordIncorrectCount} times.</p>

        {this.state.guess === '' && <form onSubmit={(e)=>this.handleSubmit(e)}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input name='answer-input' id='learn-guess-input' type='text' required></input>
          <Button type='submit'>Submit your answer</Button>
        </form>}

          {this.state.guess !== '' && <Button onClick={(e)=>this.handleNextWord(e)}type='submit'>Try another word!</Button>}
        

      </section>
    );
  }
}

export default LearningRoute;
