import React, { Component } from 'react';
import './Control.css';

export default class Control extends Component {

  static propTypes = {
    isPlaying: React.PropTypes.bool,
    previousClick: React.PropTypes.func,
    toggleRun: React.PropTypes.func,
    nextClick: React.PropTypes.func,
  }

  static defaultProps = {
    isPlaying: false,
  }

  render(){
    return(
      <div id="control">

        <a id="previous" onClick={this.props.previousClick}>
          <i className="i-previous"></i>
        </a>

        <a id="play" onClick={this.props.toggleRun}>
          <i className={this.props.isPlaying?'i-pause':'i-start'}></i>
        </a>

        <a id="next" onClick={this.props.nextClick}>
          <i className="i-next"></i>
        </a>
      </div>
    );
  }
}
