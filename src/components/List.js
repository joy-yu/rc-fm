import React from 'react';
import style from './List.css';


const List = ({isShowList,...props})=> {
  let firstPosX = 0;
  let endPosX = 0;
  let ListProps = {...props};

    //播放列表触摸事件
  const handleListTouch = (e)=>{
    if (e.type === 'touchstart') {
      firstPosX = e.touches[0].clientX
    }
    if (e.type === 'touchend') {
      endPosX = e.changedTouches[0].clientX
      if (Math.abs(firstPosX - endPosX) > 50) {
        ListProps.dispatch({
          type: 'playerState/toggleList'
        });
      }
    }
  }

  return (
    <div id="list" className={`${style['list']} ${isShowList?style['to-right']:''}`} onTouchStart={handleListTouch} onTouchEnd={handleListTouch}>
      <ListItem {...ListProps}/>
    </div>
  );
}

const ListItem = ({source,runOrder,dispatch})=> {

  const listClick = (od, e) => {
    dispatch({
      type: 'playerState/listClick',
      runOrder: od
    });
    dispatch({
      type: 'playerState/toggleList'
    });
  }

  return(
    <ul>{
    source.map((v, i) => {
      return(
        <li className={`${style['clearfix']} ${style['list-item']} ${runOrder===i?style['list-on']:''}`} key={`ml${i}`} onClick={listClick.bind(this,i)} >
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
