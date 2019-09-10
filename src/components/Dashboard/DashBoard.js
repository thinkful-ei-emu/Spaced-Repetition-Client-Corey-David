import React from 'react';


export default class DashBoard extends React.Component{
  user = this.context;
  componentDidMount(){
    alert(this.user);
  }
  render(){
    return (
        <div>
          the DashBoard
          <h2>Language: (TODO)</h2>
          <label htmlFor="progress">progress</label>
          <progress value={50} max={100}/>
        </div>)
  }
}