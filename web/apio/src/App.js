import React, { Component } from 'react';
import logo from './api.png';
import profile from './User2.png';
import './App.css';
import ApiItem from './ApiItem';
import request from 'request';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_results : false,
      bodydata : [],
      inputValue:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
    console.log(this.state.inputValue)
  }

  handleClick(event){
    event.preventDefault();
    console.log("Clicked")
    this.setState({show_results:true})

    var mongostring = "findall|api_listings"
    request.post({url:'http://localhost:8170/xmaayy/api-store/', 
    form: {api_type:'search', data:mongostring}},
    (err,httpResponse,body) => {
        this.setState({bodydata:JSON.parse(body)})
        console.log(Object.prototype.toString.call(this.state.bodydata))
    })
  }

  render() {
      return (
      <div className="App">
          <div className="CxInfo">
              <p><img src={profile} alt="Customer Profile Picture" height="45" width="45"></img>
                  <b> Welcome:</b> Kris <b>! Credits:</b> $0.00</p>
          </div>
        <header className="App-header">
          <h1 className="App-title"></h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="Api_Search">Search for an API</p>
        <input onChange={this.handlechange} type="search" name="googlesearch"/>
        <button onClick={this.handleClick}>Search</button>
        <div>
          { this.state.bodydata.map(
            listing => <ApiItem cost={listing.PPC} 
                                name={listing.Name} 
                                desc={listing.Description}
                                img_url = {listing.imgUrl}
                                type = {listing.type}
                                example = {listing.exampleCall} />) }
        </div>
      </div>
    );
  }
}

export default App;
