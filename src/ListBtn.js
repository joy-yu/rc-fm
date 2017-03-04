import React, { Component } from 'react';
import './ListBtn.css';

export default class ListBtn extends Component {
  render(){
    return(
      <a id="listBtn" onClick={this.props.toggleList}>
        <i className="list-icon"></i>
      </a>
    );
  }
}
