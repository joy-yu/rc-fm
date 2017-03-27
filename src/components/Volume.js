import React from 'react';
import style from './Volume.css';

class Volume extends React.Component{
 //const Volume = ({}) => {

  //音量调节
  changeVolume=(e)=>{
    let currVol = this.refs['currVol'];
    let vControl = this.refs['vcBox'];
    let rect = vControl.getBoundingClientRect();

    let volValue = (100 - e.clientY + rect.top) > 100 ? 100 : (100 - e.clientY + rect.top);
    currVol.style.height = volValue + 'px';
    this.props.player.volume = volValue * 0.01;


    let moveVol = (e1) => {
      volValue = (100 - e1.clientY + rect.top) > 100 ? 100 : (100 - e1.clientY + rect.top);
      currVol.style.height = volValue + 'px';
      this.props.player.volume = volValue * 0.01;
    };

    vControl.addEventListener('mousemove', moveVol);
    vControl.addEventListener('mouseup', () => {
      vControl.removeEventListener('mousemove', moveVol);
    });
  }

  showVol() {
    if (this.refs['vcBox'].style.display === 'none') {
      this.refs['vcBox'].style.display = 'block';
    } else {
      this.refs['vcBox'].style.display = 'none';
    }
  }

  render(){
  return(
    <a id="volume" className={style['volume']} /*onClick={showVol}*/>
      <div className={style['vc-box']} ref="vcBox"  onMouseDown={this.changeVolume}>
        <div className={style['curr-vol']} ref="currVol"></div>
      </div>
      <i className={style['i-unmute']} ></i>
    </a>
  )
  }
}
export default Volume;
