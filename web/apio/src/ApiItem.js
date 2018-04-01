// JavaScript source code
import React, { Component } from 'react';
import logo from './api.png';
import request from 'request';

class ApiItem extends Component {
    constructor(props){
        super(props)
        this.state = {bodydata : []}
    }
    render() {
        var mongostring = "findall|api_listings"
        request.post({url:'http://localhost:8170/xmaayy/api-store/', 
        form: {api_type:'search',data:mongostring}},
        (err,httpResponse,body) => {
            this.setState({bodydata:JSON.parse(body)})
            console.log(Object.prototype.toString.call(this.state.bodydata))
        })
        this.state.bodydata.map( (item, i) => {
            console.log(item)
            return (
                <div className="Api_Entry">
                <hr></hr>
                <span class="right"><h3><b>Cost: $0.00</b></h3></span><span class="left"><h3><b>%NAME%</b></h3></span>
                    <img src={logo} className="Api_Company_logo" alt="Company_logo" />
                <div className="Api_Description">
                <p align="left"><b>API Type:</b> %TYPE% </p>
                <p align="left"><b>Description:</b> Lorem ipsum dolor sit amet, aeterno hendrerit no sit, mea saepe tation ei. Fugit dicat propriae eu ius, sumo magna albucius usu at, mea eu partem sensibus. Vix cu viris periculis. At eam modus possit mediocritatem, graece patrioque laboramus his eu, has melius perfecto eu. Has an doming instructior, euismod deseruisse nam eu. Et mei persius repudiare dignissim, quod intellegam in eam.</p>
                </div>
                <div class="rating">
                <span>Rating:</span><span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span>
                </div>
                </div>
            );
        })
        return(<span/>);
    }
}

export default ApiItem;