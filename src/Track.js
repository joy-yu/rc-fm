import React, {Component} from 'react';
import './Track.css';
import  {tracks} from '../public/data.json';

export default class Track extends Component {
  render(){
    return(
      <div className="music-info">
        <img 
          className="music-pic"
          src={tracks[this.props.runOrder].picUrl}
          alt="专辑图找不到了..."
          style={this.props.isPlaying?{animationPlayState:''}:{animationPlayState:'paused'}}/>

        <p className="music-name">
          {tracks[this.props.runOrder].name}
        </p>
        <p className="author-name">
          {tracks[this.props.runOrder].artists}
        </p>
      </div>
    );
  }
}
