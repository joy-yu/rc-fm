import React, { Component } from 'react';
import './App.css';
import Track from './Track.js';
import Control from './Control.js';
import RunType from './RunType.js';
import List from './List.js';
import Volume from './Volume.js';
import ListBtn from './ListBtn.js';
import  { tracks } from '../public/data.json';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.player = new Audio();
    this.state = {
      isPlaying: false,
      runOrder: 0,
      preOrder: 0,
      runType: 0,  //0顺序，1随机，2单曲
      firstPosX: 0,
      endPosX: 0,
    };
  }

  randomNumber(n){
    return parseInt(n * Math.random(), 10);
  }


  //开始播放
  start(od) {
    this.setState({isPlaying: true});
    this.player.src = tracks[od].mp3Url;
    this.player.play();
  };


  //切换播放列表显示
  toggleList(){
    let list = document.getElementById('list');
    let listBtn = document.getElementById('listBtn');
    if(list.className.indexOf('to-right') === -1){
      list.className +=' to-right';
      listBtn.className +=' to-right';
    } else{
      list.className = (list.className.replace('to-right', '')).trim();
      listBtn.className = (listBtn.className.replace('to-right', '')).trim();
    }
  }

  //播放列表点击
  listClick(od, e) {
    this.setState({
      preOrder: this.state.runOrder,
      runOrder: od
    }, () => {
      this.toggleList();
      this.start(this.state.runOrder);
    });
  }

  //播放类型切换
  changeRunType(typeIcon) {

    if (this.state.runType === 0) {
      this.setState({
        runType: this.state.runType + 1
      }, () => {
        typeIcon.className = 'i-rand';
      });

    } else if (this.state.runType === 1) {
      this.setState({
        runType: this.state.runType + 1
      }, () => {
        typeIcon.className = 'i-loop-one';
      });

    } else if (this.state.runType === 2) {
      this.setState({
        runType: 0
      }, () => {
        typeIcon.className = 'i-loop';
      });
    }
  };


  //暂停播放切换
  toggleRun() {
    if (this.player.paused) {
      this.setState({isPlaying: true});
      this.player.play();
    } else {
      this.setState({isPlaying: false});
      this.player.pause();
    }
  }

  //播放前一首
  previousClick() {
    //顺序播放或单曲循环
    if (!this.state.runType || this.state.runType === 2) {
      if (this.state.runOrder !== 0) {
        this.setState({
          runOrder: this.state.runOrder - 1,
          preOrder: this.state.runOrder
        }, () => {
          this.start(this.state.runOrder);
        });

      } else {
        this.setState({
          runOrder: 0
        }, () => {
          this.start(this.state.runOrder);
        });
      }
      //随机播放
    } else {
      let rdNum = this.randomNumber(tracks.length);
      this.setState({
        runOrder: this.state.preOrder,
        preOrder: rdNum
      }, () => {
        this.start(this.state.runOrder);
      });
    }
  }

  //播放下一首
  nextClick() {
    let trackLen = tracks.length;

    //顺序播放或单曲循环
    if (!this.state.runType || this.state.runType === 2) {
      if (this.state.runOrder !== trackLen - 1) {
        this.setState({
          runOrder: this.state.runOrder + 1,
          preOrder: this.state.runOrder
        }, () => {
          this.start(this.state.runOrder);
        });
      } else {
        this.setState({
          runOrder: 0
        }, () => {
          this.start(this.state.runOrder);
        });
      }
      //随机播放
    } else {
      let rdNum = this.randomNumber(tracks.length);
      this.setState({
        runOrder: rdNum,
        preOrder: this.state.runOrder
      }, () => {
        this.start(this.state.runOrder);
      });
    }
  }



  //音量调节
  changeVolume(e) {
    let currVol = document.querySelector('.curr-vol');
    let vControl = document.querySelector('.vc-box');
    let rect = vControl.getBoundingClientRect();

    let volValue = (100 - e.clientY + rect.top) > 100 ? 100 : (100 - e.clientY + rect.top);
    currVol.style.height = volValue + 'px';
    this.player.volume = volValue * 0.01;


    let moveVol = (e1) => {
      volValue = (100 - e1.clientY + rect.top) > 100 ? 100 : (100 - e1.clientY + rect.top);
      currVol.style.height = volValue + 'px';
      this.player.volume = volValue * 0.01;
    };

    vControl.addEventListener('mousemove', moveVol);
    vControl.addEventListener('mouseup', () => {
      vControl.removeEventListener('mousemove', moveVol);
    });
  }

  //播放列表触摸事件
  handleListTouch(e){

    if (e.type === 'touchstart') {
      this.setState({
        firstPosX: e.touches[0].clientX
      });
    }
    if (e.type === 'touchend') {
      this.setState({
        endPosX: e.changedTouches[0].clientX
      }, () => {
        if (Math.abs(this.state.firstPosX - this.state.endPosX) > 50) {
          this.toggleList();
        }
      });
    }
  }

  componentDidMount() {
    let progressNow = document.getElementById('progressNow');

    setTimeout(()=>{
      this.start(this.state.runOrder);
    },1000);

    //监听播放结束
    this.player.addEventListener('ended', () => {
      if (this.state.runType === 2)
        this.start(this.state.runOrder);
      else {
        this.nextClick();
      }
    });

    //监听播放时间更新
    this.player.addEventListener('timeupdate', () => {
      let totalTime = this.player.duration;
      progressNow.style.width = `${this.player.currentTime/totalTime*100}%`;

    });

    //监听加载错误
    this.player.addEventListener('error', () => {
      alert('脚滑的网易云不让你听了。。')
    });
  }



  render() {
    return (
      <div className="App">
        
        {/*顶层进度条*/}
        <div id="progress">
          <p id="progressNow"></p>
        </div>

        {/*模糊背景*/}
        <div className="blur">
          <img className="bgPic" alt="背景" src={tracks[this.state.runOrder].picUrl} />
        </div>

        {/*歌曲信息*/}
        <Track {...this.state}/>

        {/*底部播放控制*/}
        <Control
          {...this.state}
          previousClick={this.previousClick.bind(this)}
          toggleRun={this.toggleRun.bind(this)}
          nextClick={this.nextClick.bind(this)} />

        {/*左部列表*/}
        <List
          {...this.state}
          listClick={this.listClick.bind(this)}
          handleListTouch={this.handleListTouch.bind(this)}/>

        {/*左下列表按钮*/}
        <ListBtn toggleList={this.toggleList.bind(this)}/>

        {/*中下播放类型*/}
        <RunType changeRunType={this.changeRunType.bind(this)}/>

        {/*右下音量控制*/}
        <Volume changeVolume={this.changeVolume.bind(this)}/>

      </div>
    );
  }
}

