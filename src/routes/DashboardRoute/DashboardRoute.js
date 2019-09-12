import React, { Component } from 'react'
import UserContext from './../../contexts/UserContext';
//import AuthApiService from '../../services/auth-api-service';
import Api from '../../services/Api.service';
import Button from '../../components/Button/Button';
import './Dashboard.css';

class DashboardRoute extends Component {
  state = {
    lang:{name:'loading...'},
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
    
        this.state.words.forEach(word=>total += word.correct_count - word.incorrect_count);
        this.setState({score:total});
      }

      this.words = this.state.words.map(word => (
        <tr><td className="original">{word.original}</td><td className="correct">{word.correct_count}</td><td className="incorrect">{word.incorrect_count}</td></tr>
      ))

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
              <div>
                <progress value={((this.state.lang.head-1) - this.state.words.length) * 100} max={100}/>
              </div>
            </div>
          </div>

          <div className='toLearn-container'>
            <h3>Words to practice</h3>
            <div>
              <table className='table-container'>
                <tbody>
                  <tr key='key'>
                    <th>
                      Word
                    </th>
                    <th>
                      Correct
                    </th>
                    <th>
                      Incorrect
                    </th>
                  </tr>
                    {this.words} 
                </tbody>
              </table>
            </div>
          </div>

          <div className='button-container-dashboard'>
            <Button><a href="/learn">Start practicing</a></Button>
          </div>

        </section>)
  }
}

export default DashboardRoute
