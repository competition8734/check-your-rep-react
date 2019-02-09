import React, { Component } from 'react';
import './App.scss';
import LinkedIn from './Linkedin.js';
import Facebook from './Facebook.js';

class App extends Component {

  componentDidMount () {
    let url = window.location.href
    let re = /score=(.*)/
    const score = url.match(re)
    if(score !== null) 
      this.setState({ score: score[1] })
  }

  state = { 
    score: 0, 
    facebookButtonDisabled: false,
    linkedinButtonDisabled: false
  }

  shareScore = () => {
    let url = `http://localhost:3000?name=greg&score=${this.state.score}`
    const textField = document.createElement('textarea')
    textField.innerText = url
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  updateScore = (curr, added) => {
    let end = curr + added
    let ticks = 20
    let speed = 40

    let randomNumbers = [end]

    for (let i = 0; i < ticks - 1; i++) {
      randomNumbers.unshift(
        Math.floor( Math.random() * ( end - curr + 1 ) + curr )
      )
    }

    randomNumbers.sort((a, b) => {return a - b})

    let x = 0
    let interval = setInterval( () => {
      let number = randomNumbers.shift()
      this.setState({ score: number })
      if (++x === ticks) {
        window.clearInterval(interval)
      }

    }, speed)

    this.setState({ score: end })
  }

  onSuccess = (button) => {
    this.updateScore( this.state.score, 10 )
    const b = `${button}ButtonDisabled`
    this.setState({[b]: true });
  }

  render () {
    return (
      
      <div className='container container--wrapper'>
        
        <div className='container container--user'>
          <div className='user__name'>
            Reputation Score
          </div>  
          <div className='user__score'>
            <span className='score'>{ this.state.score }</span>
          </div>
        </div>

        <div className='container container--buttons'>
          <Facebook
            onSuccess={() => this.onSuccess( 'facebook' ) }
            disabled={this.state.facebookButtonDisabled}
          >
          </Facebook>
          <LinkedIn
            onSuccess={() => this.onSuccess( 'linkedin' ) }
            disabled={this.state.linkedinButtonDisabled}
          >
          </LinkedIn>
        </div>

        <div className='container container--footer'>
          <button 
            className='button button--share'
            onClick={() => this.shareScore()}
          >Share with your friends
          </button>
        </div>

      </div>
    );
  }
}

export default App;
