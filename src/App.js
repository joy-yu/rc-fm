import React, { Component } from 'react';
import './App.css';
import  ml from '../public/data.json';


class App extends Component {

  constructor(props) {
    super(props);
    this.player = new Audio();
    this.timer = null;
    this.state = {
      runOrder: 0,
      runType: 0,  //0顺序，1随机，2单曲
      preOrder: 0
    };
  }

  //切换播放列表显示
  toggleList(){
    let list = document.getElementById('list');
    let listIcon = document.querySelector('.list-icon');
    if(!list.className){
      list.classList.add('to-right');
      listIcon.classList.add('to-right');
    } else{
      list.classList.remove('to-right');
      listIcon.classList.remove('to-right');
    }
  }

  //开始播放
  start(od) {
    clearInterval(this.timer);
    let list = document.getElementById('list');
    let listAll = [].slice.call(list.querySelectorAll('li'));
    let progressNow = document.getElementById('progressNow');
    let bgPic = document.querySelector('.bgPic');
    setTimeout(()=>{
      bgPic.src=ml.tracks[this.state.runOrder].picUrl;
    },1000);
    progressNow.style.width = 0;
    listAll.forEach((v,i)=>v.classList.remove('list-on'));
    listAll[od].classList.add('list-on');
    this.player.src = ml.tracks[od].mp3Url;
    this.player.play();
  };

  //播放列表点击
  listClick(od){
    this.setState({
      preOrder: this.state.runOrder,
      runOrder: od
    });
    this.toggleList();
    this.start(od);
  }

  //播放类型切换
  handleRunType() {
    let runType = document.getElementById('runType');

    if (this.state.runType === 0) {
      this.setState({
        runType: this.state.runType + 1
      });
      runType.querySelector('i').className = 'rand';
    } else if (this.state.runType === 1) {
      this.setState({
        runType: this.state.runType + 1
      });
      runType.querySelector('i').className = 'loop-one';
    } else if (this.state.runType === 2) {
      this.setState({
        runType: 0
      });
      runType.querySelector('i').className = 'loop';
    }
  };

  //切换显示音量条
  handleShowVol() {
    let vControl = document.querySelector('.vc-box');
    if (vControl.style.display === '') {
      vControl.style.display = 'block';
    } else {
      vControl.style.display = '';
    }
  }

  //暂停播放切换
  handleToggleRun() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  componentDidMount() {
    let play = document.getElementById('play');
    let previous = document.getElementById('previous');
    let next = document.getElementById('next');
    let pic = document.querySelector('.music-pic');
    let progressNow = document.getElementById('progressNow');
    let list = document.getElementById('list');

    setTimeout(()=>{
      this.start(this.state.runOrder);
    },2000);

    //监听播放结束
    this.player.addEventListener('ended',()=>{
      if(this.state.runType === 2)
        this.start(this.state.runOrder);
      else {
        next.click();
      }
    });
    //监听播放
    this.player.addEventListener('playing', () => {
      clearInterval(this.timer);
      pic.style['animation-play-state'] = '';
      play.firstElementChild.className = 'pause';

      let totalTime = this.player.duration;
      this.timer = setInterval(() => {
        progressNow.style.width = `${this.player.currentTime/totalTime*100}%`;
      }, 1000);

    });
    //监听暂停
    this.player.addEventListener('pause',()=>{
        clearInterval(this.timer);
        pic.style['animation-play-state'] = 'paused';
        play.firstElementChild.className = 'start';
    });
    this.player.addEventListener('error',()=>{
      alert('脚滑的网易云不让你听了。。')  
    });




    //上一首
    previous.addEventListener('click', () => {

      //顺序播放或单曲循环
      if (!this.state.runType || this.state.runType === 2) {
        if (this.state.runOrder !== 0) {
          this.setState({
            runOrder: this.state.runOrder - 1,
            preOrder: this.state.runOrder
          });
          this.start(this.state.runOrder);
        } else {
          this.setState({
            runOrder: 0
          });
          this.start(this.state.runOrder);
        }
      //随机播放
      } else {
        let randomNumber = parseInt(255 * Math.random(), 10);
        this.setState({
          runOrder: this.state.preOrder,
          preOrder: randomNumber
        });
        this.start(this.state.runOrder);
      }
    });

    //下一首
    next.addEventListener('click', () => {
      let trackLen = ml.tracks.length;

      //顺序播放或单曲循环
      if (!this.state.runType || this.state.runType === 2) {
        if (this.state.runOrder !== trackLen - 1) {
          this.setState({
            runOrder: this.state.runOrder + 1,
            preOrder: this.state.runOrder
          });
          this.start(this.state.runOrder);
        } else {
          this.setState({
            runOrder: 0
          });
          this.start(this.state.runOrder);
        }
        //随机播放
      } else {
        let randomNumber = parseInt(255 * Math.random(), 10);
        this.setState({
          runOrder: randomNumber,
          preOrder: this.state.runOrder
        });
        this.start(this.state.runOrder);
      }
    });



    //音量调节
    let vControl = document.querySelector('.vc-box');
    let currVol = document.querySelector('.curr-vol');
    let dragging = null;

    let handleControl = (e) => {
      switch (e.type) {

        case 'mousedown':
          dragging = e.target;
          let rect = vControl.getBoundingClientRect();
          let volValue = (100 - e.clientY + rect.top) > 100 ? 100 : (100 - e.clientY + rect.top);
          currVol.style.height = volValue + 'px';
          this.player.volume = volValue * 0.01;
          break;

        case 'mousemove':
          if (dragging !== null) {
            let rect = vControl.getBoundingClientRect();
            let volValue = (100 - e.clientY + rect.top) > 100 ? 100 : (100 - e.clientY + rect.top);
            currVol.style.height = volValue + 'px';
            this.player.volume = volValue * 0.01;
          }
          break;

        case 'mouseup':
          dragging = null;
          break;
        default:
          dragging = null;
          break;
      }
    }
    vControl.addEventListener('mousedown', handleControl);
    vControl.addEventListener('mousemove', handleControl);
    vControl.addEventListener('mouseup', handleControl);


    //播放列表滑动事件
    let firstPos;
    list.addEventListener('touchstart', (e)=> {
      firstPos = e.touches[0].clientX;
    });
    list.addEventListener('touchend', (e)=> {
      let endPos = e.changedTouches[0].clientX;
      if(Math.abs(firstPos-endPos)>50){
        this.toggleList();
      }
    });

  }


  render() {
    return (
      <div className="App">
        
        <div id="progress">
          <p id="progressNow"></p>
        </div>
        <div className="blur"><img className="bgPic" alt="背景"></img></div>
        <div className="music-info">
          <img className="music-pic" src={ml.tracks[this.state.runOrder].picUrl} alt="专辑图"/>

          <p className="music-name">
            {ml.tracks[this.state.runOrder].name}
          </p>
          <p className="author-name">
            {ml.tracks[this.state.runOrder].artists}
          </p>
        </div>

        <div id="control">

          <a id="previous">
          </a>

          <a id="play" onClick={this.handleToggleRun.bind(this)}>
            <i className="pause"></i>
          </a>

          <a id="next">
          </a>

        </div>

        <div id="list">
          <ul>
            {
              ml.tracks.map((v, i) => {
                return(
                  <li className="clearfix list-item" key={`ml${i}`} onClick={this.listClick.bind(this,i)}>
                    <div className="col col-1">
                      <span title={v.name}>{`${i}.${v.name}`}</span>
                    </div>
                    <div className="col col-2">
                      <span title={v.artists}>{v.artists}</span>
                    </div>
                  </li>
                );
              })
            }
          </ul>

        </div>
          <a id="tright" onClick={this.toggleList}>
            <svg className="list-icon">
              <rect x="6" y="9" rx="2" ry="2" width="26" height="4"></rect>
              <rect x="6" y="18" rx="2" ry="2" width="26" height="4"></rect>
              <rect x="6" y="27" rx="2" ry="2" width="26" height="4"></rect>
            </svg>
          </a>


       <a id="runType" onClick={this.handleRunType.bind(this)} >
          <i className="loop"></i>
        </a>

        <a id="volume">
          <div className="vc-box">
            <div className="curr-vol"></div>
          </div>
          <i className="unmute" onClick={this.handleShowVol}></i>
        </a>

      </div>
    );
  }
}

export default App;
