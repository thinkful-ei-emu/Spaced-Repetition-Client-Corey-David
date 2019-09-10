import React, { Component } from 'react'
import UserContext from './../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Api from '../../services/Api.service';
import './Dashboard.css';

class DashboardRoute extends Component {
  state = {
    lang:'loading...'
  }
  static contextType = UserContext;
  componentDidMount(){
    Api.doFetch('language')
    .then(res=> this.setState({lang: res}))
    .catch(e => console.log(e));
  }
  render(){
    return (
        <div>
          the DashBoard
          <h2>Language: (TODO)</h2>
          <label htmlFor="progress">progress</label>
          <progress className='progress-bar' value={50} max={100}/>
        </div>)
  }
}

export default DashboardRoute
