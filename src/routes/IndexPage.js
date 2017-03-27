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

    this.player = document.getElementById('player');
    this.player.pause();

    setTimeout(()=>{
      this.props.dispatch({
        type: 'playerState/reStart',
        player:this.player
      });
    },1000);

    //监听播放结束
    this.player.addEventListener('ended', () => {
      console.log(this.props.playerState);
      if (this.props.playerState.runType === 2)
        this.start(this.props.playerState.runOrder);
      else {
        this.props.dispatch({
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

  }



  render(){
    return (
      <div className={style.App}>
        
        <div>
          <audio autoPlay id="player" src={tracks[this.props.playerState.runOrder].mp3Url} ></audio>
        </div>

        {/*顶层进度条*/}
        <div className={style['progress']}>
          <p id="progressNow" className={style['progressNow']}></p>
        </div>

        {/*模糊背景*/}
        <div className={style.blur}>
          <img className={style.bgPic} alt="背景" src={tracks[this.props.playerState.runOrder].picUrl} />
        </div>

        {/*歌曲信息*/}
        <Track
          {...this.props.playerState}
          source={tracks} />

        {/*底部播放控制*/}
        <Control
          {...this.props.playerState}
          start={this.start}
          source={tracks}
          player={this.player}
          dispatch={this.props.dispatch} />

        {/*左部列表*/}
        <List
          {...this.props.playerState}
          isShowList={this.props.playerState.isShowList}
          source={tracks}
          handleListTouch={this.handleListTouch}
          dispatch={this.props.dispatch}
          />

        {/*左下列表按钮*/}
        <ListBtn
          isShowList={this.props.playerState.isShowList}
          dispatch={this.props.dispatch} />

        {/*中下播放类型*/}
        <RunType
          dispatch={this.props.dispatch}
          runType={this.props.playerState.runType}/>

        {/*右下音量控制*/}
        <Volume player={this.player} />

      </div>
    );
  }
}


export default connect(
  ({playerState}) => ({playerState})
)(App);
