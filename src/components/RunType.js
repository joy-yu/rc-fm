import React from 'react';
import style from './RunType.css';

const RunType = ({changeRunType})=> {
  return(
    <a id="runType" className={style.runType} onClick={changeRunType/*.bind(null, RunType.refs['typeIcon'])*/} >
      <i className={style['i-loop']} /*ref="typeIcon"*/></i>
    </a>
  );
}

export default RunType;
