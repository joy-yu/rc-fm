import React from 'react';
import style from './ListBtn.css';

const ListBtn = ({isShowList, dispatch})=> {

  const toggleList = ()=>{
    dispatch({
      type: 'playerState/toggleList'
    })
  }

  return(
    <a id="listBtn" className={`${style['listBtn']} ${isShowList?style['to-right']:''}`} onClick={toggleList} /*ref="listBtn"*/>
      <i className={style['list-icon']}></i>
    </a>
  );

}
export default ListBtn;
