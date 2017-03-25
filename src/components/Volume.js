import React from 'react';
import style from './Volume.css';

 const Volume = ({changeVolume}) => {

  /*切换显示音量条
  showVol = () => {
    if (this.refs['vcBox'].style.display === 'none') {
      this.refs['vcBox'].style.display = 'block';
    } else {
      this.refs['vcBox'].style.display = 'none';
    }
  }
  */
  return(
    <a id="volume" className={style['volume']}>
      <div className={style['vc-box']} /*ref="vcBox"*/ style={{display:'none'}} onMouseDown={changeVolume}>
        <div className={style['curr-vol']} /*ref="currVol"*/></div>
      </div>
      <i className={style['i-unmute']} /*onClick={this.showVol}*/></i>
    </a>
  );
}
export default Volume;
