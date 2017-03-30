import React from 'react';
import style from './ListBtn.css';
import Icon  from './Icon.js';

const ListBtn = ({isShowList, dispatch})=> {

  const toggleList = ()=>{
    dispatch({
      type: 'playerState/toggleList'
    })
  }

  return(
    //<Icon iconType="listBtn" iconClick={toggleList}/>
    <a className={`${style['listBtn']} ${isShowList?style['to-right']:''}`} onClick={toggleList}>
      <i className={style['i-listBtn']}></i>
    </a>
  );

}
export default ListBtn;
