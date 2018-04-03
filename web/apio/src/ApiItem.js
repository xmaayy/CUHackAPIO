// JavaScript source code
import React, { Component } from 'react';
import request from 'request';

class ApiItem extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {bodydata : []}
    }

    

    render() {
        return (
            <div className="Api_Entry">
            <hr></hr>
            <span class="right"><h3><b>Cost: ${this.props.cost}</b></h3></span><span class="left"><h3><b></b></h3></span>
                <img src={this.props.img_url} className="Api_Company_logo" alt="Company_logo" />
            <div className="Api_Description">
            <p align="left"><b>API Type:</b> {this.props.type} </p>
            <p align="left"><b>Description:</b>{this.props.desc}</p>
            </div>
            <div class="rating">
            <span>Rating:</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div>
            </div>
                <span>How to call : {this.props.example}</span>
            </div>
        );
    }
}

export default ApiItem;