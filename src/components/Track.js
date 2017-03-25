import React from 'react';
import style from './Track.css';

const Track = ({source,runOrder,isPlaying}) => {

  return (
    <div className={style['music-info']}>
      <img 
        className={style['music-pic']}
        src={source[runOrder].picUrl}
        alt="专辑图找不到了..."
        style={isPlaying?{animationPlayState:''}:{animationPlayState:'paused'}}/>

      <p className={style['music-name']}>
        {source[runOrder].name}
      </p>
      <p className={style['author-name']}>
        {source[runOrder].artists}
      </p>
    </div>
  );
}

Track.propTypes = {
  isPlaying: React.PropTypes.bool,
  runOrder: React.PropTypes.number,
  source: React.PropTypes.array,
}

Track.defaultProps = {
  isPlaying: false,
  runOrder: 0,
  source: []
}

export default Track;
