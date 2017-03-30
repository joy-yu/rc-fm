import React from 'react';
import style from './Icon.css';


const Icon = ({iconType,iconClick})=> {
  return(
    <a className={style[iconType]} onClick={iconClick}>
      <i className={style[`i-${iconType}`]}></i>
    </a>
  );
};

export default Icon;
