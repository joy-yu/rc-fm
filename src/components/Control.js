import React from 'react';
import style from './Control.css';
import Icon from './Icon.js';

const Control = ({runOrder,...props})=> {
  const ControlProps = {...props};

  const previousClick = ()=>{
    ControlProps.dispatch({
      type: 'playerState/previousClick',
      trackLen:ControlProps.source.length
    });
  }
    
  const nextClick = ()=>{
    ControlProps.dispatch({
      type: 'playerState/nextClick',
      trackLen:ControlProps.source.length
    });
  }

  const toggleRunClick = (playState)=>{
    if (!playState) {
      ControlProps.dispatch({
        type: 'playerState/reStart',
        player: ControlProps.player
      });
    } else {
      ControlProps.dispatch({
        type: 'playerState/pause',
        player: ControlProps.player
      });
    }
  }

  return(
    <div id="control" className={style.control}>

      <Icon iconType="previous" iconClick={previousClick}/>
      <Icon iconType={ControlProps.isPlaying?'pause':'start'} iconClick={toggleRunClick.bind(null,ControlProps.isPlaying)}/>
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
