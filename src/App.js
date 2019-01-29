import React, { Component } from 'react';
import './App.scss';

class App extends Component {

  componentDidMount () {
  }

  state = { 
    score: 0, 
    facebookButtonDisabled: false,
    linkedinButtonDisabled: false
  }

  onFacebookLogin = () => {
    window.FB.login( (response) => {
      if ( response.status === 'connected' ) {
        this.updateScore( this.state.score, 10 )
        this.setState({ facebookButtonDisabled: true })
      } else {
        console.log( 'Not authenticated' )
      }
    })
  }

  onLinkedInLogin = () => {
    window.IN.User.authorize(() => {
      window.IN.Event.on(
        window.IN, 
        "auth", 
        window.IN.API.Raw("/people/~")
          .result( this.updateScore( this.state.score, 10 ) )
          .error( console.log( 'error' )) 
      )
    })
  }

  onFacebookShare = () => {
    window.FB.ui({
      method: 'share',
      display: 'popup',
      href: 'https://google.com',
      quote: `You have a reputation score of ${this.state.score}`
    }, function(response){});
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
          <button 
            className='button button--facebook'
            onClick={() => { this.onFacebookLogin() }}
            disabled={ this.state.facebookButtonDisabled }
          >Facebook
          </button>
          <button 
            className='button button--linkedin' 
            onClick={() => { this.onLinkedInLogin() }}
            disabled={ this.state.linkedinButtonDisabled }
          >Linkedin
          </button>
        </div>

        <div className='container container--social-media'>
          <div className='social-media__item'>
            <a
              href='/'
              onClick={() => { this.onFacebookShare() }}
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
