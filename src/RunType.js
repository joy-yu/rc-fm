import React, { Component } from 'react';
import './RunType.css';

export default class RunType extends Component {

  render(){
    return(
      <a id="runType" onClick={this.props.changeRunType} >
        <i className="i-loop" ref="typeIcon"></i>
      </a>
    );
  }
}
