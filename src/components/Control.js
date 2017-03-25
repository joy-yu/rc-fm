import React from 'react';
import style from './Control.css';


const Control = ({isPlaying, previousClick, toggleRun, nextClick})=> {

  return(
    <div id="control" className={style.control}>

      <a id="previous" onClick={previousClick}>
        <i className={style['i-previous']}></i>
      </a>

      <a id="play" onClick={toggleRun}>
        <i className={isPlaying?style['i-pause']:style['i-start']}></i>
      </a>

      <a id="next" onClick={nextClick}>
        <i className={style['i-next']}></i>
      </a>
    </div>
  );
}


Control.propTypes = {
  isPlaying: React.PropTypes.bool,
  previousClick: React.PropTypes.func,
  toggleRun: React.PropTypes.func,
  nextClick: React.PropTypes.func,
}

Control.defaultProps = {
  isPlaying: false,
}

export default Control;
