import React, { Component } from 'react';
import logo from './api.png';
import profile from './User2.png';
import './App.css';
import ApiItem from './ApiItem';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_results : 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    event.preventDefault();
    console.log("Clicked")
    this.setState({show_results:1})
  }

  render() {
    var results = this.state.show_results ? <ApiItem/> : null;
      return (
      <div className="App">
          <div className="CxInfo">
              <p><img src={profile} alt="Customer Profile Picture" height="45" width="45"></img>
                  <b> Welcome:</b> %CUSTOMER% <b>! Credits:</b> $0.00</p>
          </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">API storefront project</h1>
        </header>
        <p className="Api_Search">Search for an API</p>
        <input type="search" name="googlesearch"/>
        <button onClick={this.handleClick} >Search</button>
        { results }
      </div>
    );
  }
}

export default App;
