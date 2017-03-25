import React from 'react';
import style from './List.css';


const List = ({...props})=> {
  let ListProps = {...props};
  return (
    <div id="list" className={style.list} /*ref="list"*/ onTouchStart={ListProps.handleListTouch} onTouchEnd={ListProps.handleListTouch}>
      <ListItem {...ListProps}/>
    </div>
  );
}

const ListItem = ({source,runOrder,listClick})=> {
  return(
    <ul>{
    source.map((v, i) => {
      return(
        <li className={`clearfix ${style['list-item']} ${runOrder===i?style['list-on']:''}`} key={`ml${i}`} onClick={listClick.bind(this,i)} >
          <div className={`${style['col']} ${style['col-1']}`}>
            <span title={v.name}>{`${i}.${v.name}`}</span>
          </div>
          <div className={`${style['col']} ${style['col-2']}`}>
            <span title={v.artists}>{v.artists}</span>
          </div>
        </li>
      );
    })
    }</ul>
  );
}

export default List;
