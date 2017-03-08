import React, { Component } from 'react';
import './List.css';


export default class List extends Component {
  render() {
    return (
      <div id="list" ref="list" onTouchStart={this.props.handleListTouch} onTouchEnd={this.props.handleListTouch}>
        <ListItem {...this.props}/>
      </div>
    );
  }
}

class ListItem extends Component{
  render(){
    return(
      <ul>{
      this.props.source.map((v, i) => {
        return(
          <li className={`clearfix list-item ${this.props.runOrder===i?'list-on':''}`} key={`ml${i}`} onClick={this.props.listClick.bind(this,i)} >
            <div className="col col-1">
              <span title={v.name}>{`${i}.${v.name}`}</span>
            </div>
            <div className="col col-2">
              <span title={v.artists}>{v.artists}</span>
            </div>
          </li>
        );
      })
      }</ul>
    );
  }
}
