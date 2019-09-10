import React, { Component } from 'react'
import UserContext from './../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Api from '../../services/Api.service';
import './Dashboard.css';

class DashboardRoute extends Component {
  state = {
    lang:'loading...',
    words: [],
    head: {id:null,language_id:null,original:null,translation:null,next:0,memory_value:0},
    score:0
  }
  static contextType = UserContext;

  words;

  componentDidMount(){
    Api.doFetch('language')
    .then(res=> this.setState({lang: res.language, words: res.words},()=>{
      if(this.state.words.length > 1){
        let total = 0;
    
        this.state.words.forEach(word=>total += word.correct_count);
        this.setState({score:total});
      }

      this.words = this.state.words.map(word => (
        <tr><td>{word.original}</td> <td>{word.correct_count}</td> <td>{word.incorrect_count}</td></tr>
      ))

    }))
    .catch(e => console.log(e));
  }


  render(){
    return (

        <div className='dashboard-container'>

          <h2>Dashboard for: {this.state.lang.name}</h2>


          <div className='progress-bar'>
          <p>Words Correct:{this.state.score} </p>
            <div>
              <label htmlFor="progress">{this.state.lang.name} Progress:</label>
              <progress value={((this.state.lang.head-1) - this.state.words.length) * 100} max={100}/>
            </div>
          </div>

          <div className='toLearn-container'>
            <h2>Words To Learn</h2>
            <div>
              <table className='table-container'>
                <tr id='row'>
                  <th id='word'>
                    Word
                  </th>
                  <th id='correct'>
                    Correct
                  </th>
                  <th id='incorrect'>
                    Incorrect
                  </th>
                </tr>
                  {this.words} 
              </table>
            </div>
          </div>

          <div className='button-container-dashboard'>
            <button>Start Learning</button>
          </div>

        </div>)
  }
}

export default DashboardRoute
