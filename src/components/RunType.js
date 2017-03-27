import React from 'react';
import style from './RunType.css';

const RunType = ({runType,dispatch})=> {

  const changeRunType  = ()=>{
    dispatch({
      type: 'playerState/changeRunType'
    })
  }

  return(
    <a id="runType" className={style.runType} onClick={changeRunType/*.bind(null, RunType.refs['typeIcon'])*/} >
      <i className={runType===0?style['i-loop']:runType===1?style['i-rand']:style['i-loop-one']} /*ref="typeIcon"*/></i>
    </a>
  );
}

export default RunType;
