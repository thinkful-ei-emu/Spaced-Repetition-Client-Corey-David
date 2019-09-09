import React from 'react';

export default function DashBoard(){
  return (
  <div>
    the DashBoard
    <h2>Language: (TODO)</h2>
    <label htmlFor="progress">progress</label>
    <progress value={50} max={100}/>
  </div>)
}