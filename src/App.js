import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      
      <div className='container container--wrapper'>
        
        <div className='container container--user'>
          <div className='user__name'>
            Reputation Score
          </div>  
          <div className='user__score'>
            <span className='score'>0</span>
          </div>      
        </div>

        <div className='container container--buttons'>
          <button className='button button--facebook'>Facebook</button>
          <button className='button button--linkedin'>Linkedin</button>
          /*
          <button className='button button--twitter'>Twitter</button>
          <button className='button button--github'>Github</button>
          <button className='button button--instagram'>Instagram</button>
          <button className='button button--ebay'>Ebay</button>
          <button className='button button--stackoverflow'>Stackoverflow</button>
          <button className='button button--trustpilot'>Trustpilot</button>
          <button className='button button--reddit'>Reddit</button>
          */
        </div>

        <div className='container container--share'>
          
        </div>

      </div>
    );
  }
}

export default App;
