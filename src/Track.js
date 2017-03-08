import React, {Component} from 'react';
import './Track.css';


export default class Track extends Component {

  static propTypes = {
    isPlaying: React.PropTypes.bool,
    runOrder: React.PropTypes.number,
    source: React.PropTypes.array,
  }

  static defaultProps = {
    isPlaying: false,
    runOrder: 0,
    source:[]
  }

  render(){
    return(
      <div className="music-info">
        <img 
          className="music-pic"
          src={this.props.source[this.props.runOrder].picUrl}
          alt="专辑图找不到了..."
          style={this.props.isPlaying?{animationPlayState:''}:{animationPlayState:'paused'}}/>

        <p className="music-name">
          {this.props.source[this.props.runOrder].name}
        </p>
        <p className="author-name">
          {this.props.source[this.props.runOrder].artists}
        </p>
      </div>
    );
  }
}
