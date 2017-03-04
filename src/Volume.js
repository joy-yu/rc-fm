import React, { Component } from 'react';
import './Volume.css';

export default class Volume extends Component {
  constructor(props) {
    super(props);
    this.showVol = this.showVol.bind(this);
  }

  //切换显示音量条
  showVol() {
    if (this.refs['vcBox'].style.display === 'none') {
      this.refs['vcBox'].style.display = 'block';
    } else {
      this.refs['vcBox'].style.display = 'none';
    }
  }
  render(){
    return(
      <a id="volume">
        <div className="vc-box" ref="vcBox" style={{display:'none'}} onMouseDown={this.props.changeVolume}>
          <div className="curr-vol"></div>
        </div>
        <i className="i-unmute" onClick={this.showVol}></i>
      </a>
    );
  }
}
