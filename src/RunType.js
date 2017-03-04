import React, { Component } from 'react';
import './RunType.css';

export default class RunType extends Component {

  render(){
    return(
      <a id="runType" onClick={this.props.changeRunType.bind(null, this.refs['typeIcon'])} >
        <i className="i-loop" ref="typeIcon"></i>
      </a>
    );
  }
}
