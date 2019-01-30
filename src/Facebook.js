import React, { Component } from 'react';
import { addFacebookScript } from './scripts';

export default class Facebook extends Component {

  async componentDidMount() {
    try {
      await addFacebookScript()
      const params = {
        appId: 630443254080483,
        cookie: false,
        xfbml: false,
        version: 'v3.2'
       }
       window.FB.init(params)
    } catch (error) {
      console.log(error.name, ':', error.message)
    }
  }

  onFacebookLogin = (success) => {
    window.FB.login( (response) => {
      if ( response.status === 'connected' ) {
        success()
        // this.updateScore( this.state.score, 10 )
        // this.setState({ facebookButtonDisabled: true })
      } else {
        console.log( 'Not authenticated' )
      }
    })
  }

  render() {
    return (
      <button 
        className='button button--facebook'
        onClick={() => this.onFacebookLogin(this.props.onSuccess)}
        disabled={ this.props.disabled }
      >Facebook
      </button>
     
    )
  }
}