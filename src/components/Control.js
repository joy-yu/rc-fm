import React from 'react';
import style from './Control.css';
import Icon from './Icon.js';

const Control = ({...props})=> {
  const {
    dispatch,
    player,
    source,
    isPlaying
  } = {...props};

  const previousClick = ()=>{
    dispatch({
      type: 'playerState/previousClick',
      trackLen:source.length
    });
  }
    
  const nextClick = ()=>{
    dispatch({
      type: 'playerState/nextClick',
      trackLen:source.length
    });
  }

  const toggleRunClick = ()=>{
    const playState = isPlaying;
    if (!playState) {
      dispatch({
        type: 'playerState/reStart',
        player: player
      });
    } else {
      dispatch({
        type: 'playerState/pause',
        player: player
      });
    }
  }

  return(
    <div className={style.control}>

      <Icon iconType="previous" iconClick={previousClick}/>
      <Icon iconType={isPlaying?'pause':'start'} iconClick={toggleRunClick}/>
      <Icon iconType="next" iconClick={nextClick}/>

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
