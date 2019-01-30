import React, { Component } from 'react';
import { addLinkedInScript } from './scripts';

export default class LinkedIn extends Component {

  async componentDidMount() {
    try {
      await addLinkedInScript()
      window.IN.init({ api_key: '7721znq5saewz1' })
    } catch (error) {
      console.log(error.name, ':', error.message)
    }
  }


  onLinkedInLogin = (success) => {
    window.IN.User.authorize(function(){
      window.IN.API.Raw("/people/~")
        .result(() => console.log( success() ))
        .error(() => console.log( 'error' )) 
    })
  }

  render() {
    return (
      <button 
        className='button button--linkedin'
        onClick={() => this.onLinkedInLogin(this.props.onSuccess)}
        disabled={ this.props.disabled }
      >Linkedin
      </button>
     
    );
  }
}