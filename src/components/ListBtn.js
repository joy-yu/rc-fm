import React from 'react';
import style from './ListBtn.css';

const ListBtn = ({toggleList})=> {

  return(
    <a id="listBtn" className={style.listBtn} onClick={toggleList} /*ref="listBtn"*/>
      <i className={style['list-icon']}></i>
    </a>
  );

}
export default ListBtn;
