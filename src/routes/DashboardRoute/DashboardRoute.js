import React, { Component } from 'react'
import UserContext from './../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Api from '../../services/Api.service';
import './Dashboard.css';

class DashboardRoute extends Component {
  state = {
    lang:{name:'loading...'},
    words: [],
    head: {id:null,language_id:null,original:null,translation:null,next:0,memory_value:0},
    score:0
  }
  static contextType = UserContext;
  componentDidMount(){
    Api.doFetch('language')
    .then(res=> this.setState({lang: res.language, words: res.words},()=>{
      if(this.state.words.length > 1){
        let total = 0;
    
        this.state.words.forEach(word=>total += word.correct_count - word.incorrect_count);
        this.setState({score:total});
      }

    }))
    .catch(e => console.log(e));
  }
  render(){
    return (

        <section className='dashboard-container'>

          <h2>Dashboard for: {this.state.lang.name}</h2>


          <div className='progress-bar'>
          <p>Total correct answers: {this.state.score} </p>
            <div>
              <label htmlFor="progress">{this.state.lang.name} Progress:</label>
              <progress value={((this.state.lang.head-1) - this.state.words.length) * 100} max={100}/>
            </div>
          </div>

          <div>
            <h3>Words to practice</h3>
            <ul>
              <li>{'words'}</li>
            </ul>
          </div>

          <div className='button-container-dashboard'>
            <button><a href="/learn">Start practicing</a></button>
          </div>

        </section>)
  }
}

export default DashboardRoute
