import React, { Component } from 'react';
import './App.scss';
import LinkedIn from './Linkedin.js';
import Facebook from './Facebook.js';

class App extends Component {

  state = { 
    score: 0, 
    facebookButtonDisabled: false,
    linkedinButtonDisabled: false
  }

  onFacebookShare = () => {
    window.FB.ui({
      method: 'share',
      display: 'popup',
      href: 'https://google.com',
      quote: `You have a reputation score of ${this.state.score}\nShare it with the world`
    }, function(response){})
  }

  updateScore = (curr, added, button) => {
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

        <div className='container container--social-media'>
          <div className='social-media__item'>
            <a
              href='/'
              onClick={() => this.onFacebookShare() }
            >
              <i className='fa fa-facebook'></i>
            </a>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
