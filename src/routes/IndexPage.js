import React, { Component } from 'react';
import { connect } from 'dva';
import style from './IndexPage.css';

import Track from '../components/Track.js';
import Control from '../components/Control.js';
import RunType from '../components/RunType.js';
import List from '../components/List.js';
import Volume from '../components/Volume.js';
import ListBtn from '../components/ListBtn.js';
import { tracks } from '../data.json';

class App extends Component{

  constructor(props) {
    super(props);
    this.player = null;
  }


  componentDidMount = () => {
    const {dispatch,playerState} = this.props;
    this.player = document.getElementById('player');
    this.player.pause();

    setTimeout(()=>{
      dispatch({
        type: 'playerState/reStart',
        player:this.player
      });
    },1000);

    //监听播放结束
    this.player.addEventListener('ended', () => {
      this.player.pause();
      if (playerState.runType === 2)
        dispatch({
          type: 'playerState/start',
          player: this.player
        });
      else {
        dispatch({
          type: 'playerState/nextClick',
          trackLen:tracks.length
        });
      }
    });

    //监听播放时间更新(顶部滚动条)
    this.player.addEventListener('timeupdate', () => {
      let progressNow = document.getElementById('progressNow');
      let totalTime = this.player.duration;
      progressNow.style.width = `${this.player.currentTime/totalTime*100}%`;
    });

    //监听加载错误
    this.player.addEventListener('error', () => {
      alert('脚滑的网易云不让你听了。。')
    });

    //临时写的歌曲进度选择
    const progress = document.querySelector(`.${style['progress']}`);
    const progressW = progress.getBoundingClientRect().width;
    progress.addEventListener('click', (e) => {
      this.player.currentTime = e.offsetX/progressW*this.player.duration;
    });

  }



  render(){
    const {
      dispatch,
      playerState
    } = this.props;

    return (
      <div className={style.App}>
        
        <audio autoPlay id="player" src={tracks[playerState.runOrder].mp3Url} />

        {/*顶层进度条*/}
        <div className={style['progress']}>
          <p id="progressNow" className={style['progressNow']}></p>
        </div>

        {/*模糊背景*/}
        <div className={style.blur}>
          <img className={style.bgPic} alt="背景" src={tracks[playerState.runOrder].picUrl} />
        </div>

        {/*歌曲信息*/}
        <Track
          {...playerState}
          source={tracks} />

        {/*底部播放控制*/}
        <Control
          {...playerState}
          source={tracks}
          player={this.player}
          dispatch={dispatch} />

        {/*左部列表*/}
        <List
          {...playerState}
          source={tracks}
          dispatch={dispatch}
          />

        {/*左下列表按钮*/}
        <ListBtn
          isShowList={playerState.isShowList}
          dispatch={dispatch} />

        {/*中下播放类型*/}
        <RunType
          runType={playerState.runType}
          dispatch={dispatch} />

        {/*右下音量控制*/}
        <Volume player={this.player} />

      </div>
    );
  }
}


export default connect(
  ({playerState}) => ({playerState})
)(App);
