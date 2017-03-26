import React from 'react';
import style from './Control.css';
import Icon from './Icon.js';

const Control = ({runOrder,...props})=> {
  const ControlProps = {...props};

  const previousClick = ()=>{
    ControlProps.dispatch({
      type: 'playerState/previousClick'
    });
    ControlProps.start(runOrder);
  }
    
  const nextClick = ()=>{
    ControlProps.dispatch({
      type: 'playerState/nextClick',
      trackLen:ControlProps.source.length
    });
  console.log(runOrder);
    ControlProps.start(runOrder);
  }

  const toggleRunClick = ()=>{
    if (ControlProps.player.paused) {
      ControlProps.dispatch({
        type: 'player/start'
      });
      ControlProps.player.play();
    } else {
      ControlProps.dispatch({
        type: 'player/pause'
      });
      ControlProps.player.pause();
    }
  }

  return(
    <div id="control" className={style.control}>

      <Icon iconType="previous" iconClick={previousClick}/>
      <Icon iconType={ControlProps.isPlaying?'pause':'start'} iconClick={toggleRunClick}/>
      <Icon iconType="next" iconClick={nextClick}/>
      {/*
      <a id="previous" onClick={previousClick}>
        <i className={style['i-previous']}></i>
      </a>

      <a id="play" onClick={toggleRun}>
        <i className={isPlaying?style['i-pause']:style['i-start']}></i>
      </a>

      <a id="next" onClick={nextClick}>
        <i className={style['i-next']}></i>
      </a>
      */}
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
