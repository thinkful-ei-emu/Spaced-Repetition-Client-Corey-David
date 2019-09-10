import React, { Component } from 'react'
import UserContext from './../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Api from '../../services/Api.service';
import './Dashboard.css';

class DashboardRoute extends Component {
  state = {
    lang:'loading...',
    words: [],
    head: {id:null,language_id:null,original:null,translation:null,next:0,memory_value:0}
  }
  static contextType = UserContext;
  componentDidMount(){
    Api.doFetch('language')
    .then(res=> this.setState({lang: res.language, words: res.words}))
    .catch(e => console.log(e));
  }
  render(){
    return (

        <div className='dashboard-container'>

          <h2>Dashboard for: {this.state.lang.name}</h2>


          <div className='progress-bar'>
          <p>Words Correct: {'TODO'}</p>
            <div>
              <label htmlFor="progress">{this.state.lang.name} Progress:</label>
              <progress value={((this.state.lang.head-1) - this.state.words.length) * 100} max={100}/>
            </div>
          </div>

          <div>
            <p>Words To Learn:</p>
            <ul>
              <li>{'words'}</li>
            </ul>
          </div>

          <div className='button-container-dashboard'>
            <button>Start Learning</button>
          </div>

        </div>)
  }
}

export default DashboardRoute
