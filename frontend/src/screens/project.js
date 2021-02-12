

import axios from 'axios'
import React, { Component } from 'react'

export default class Project extends Component {
    constructor(props){
        super(props)
        let pid=this.props.location.state.id



    }
    componentDidMount=()=>{
        console.log("jjj",)
    }
    getprobug=()=>{
       let uri=`http://${window.location.hostname}:5000/api/getbug/`
        axios.get()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
