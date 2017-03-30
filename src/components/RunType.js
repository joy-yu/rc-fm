import React from 'react';
import style from './RunType.css';
import Icon  from './Icon.js';

const RunType = ({runType,dispatch})=> {

  const iconClass = ['i-loop','i-rand', 'i-loop-one' ];

  const changeRunType  = ()=>{
    dispatch({
      type: 'playerState/changeRunType',
      iconClass
    })
  }

  return(
    //<Icon iconType="previous" iconClick={previousClick}/>
    <a className={style.type} onClick={changeRunType} >
      <i className={style[iconClass[runType]]}></i>
    </a>
  );
}

export default RunType;
