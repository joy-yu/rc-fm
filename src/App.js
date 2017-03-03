import React, { Component } from 'react';
import './App.css';
import  ml from '../public/data.json';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.player = new Audio();
    this.timer = null;
    this.state = {
      isPlaying: false,
      runOrder: 0,
      preOrder: 0,
      runType: 0,  //0顺序，1随机，2单曲
      firstPosX: 0,
      endPosX: 0,
    };
  }




  //开始播放
  start(od) {
    this.setState({isPlaying: true});
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


  //切换播放列表显示
  toggleList(){
    let list = document.getElementById('list');
    let listBtn = document.getElementById('listBtn');
    if(list.className.indexOf('to-right') === -1){
      list.classList.add('to-right');
      listBtn.classList.add('to-right');
    } else{
      list.classList.remove('to-right');
      listBtn.classList.remove('to-right');
    }
  }

  //播放列表点击
  listClick(od) {
    this.setState({
      preOrder: this.state.runOrder,
      runOrder: od
    }, () => {
      this.toggleList();
      this.start(this.state.runOrder);
    });
  }

  //播放类型切换
  changeRunType() {
    let runType = document.getElementById('runType');

    if (this.state.runType === 0) {
      this.setState({
        runType: this.state.runType + 1
      },()=>{runType.querySelector('i').className = 'i-rand';});

    } else if (this.state.runType === 1) {
      this.setState({
        runType: this.state.runType + 1
      },()=>{runType.querySelector('i').className = 'i-loop-one';});

    } else if (this.state.runType === 2) {
      this.setState({
        runType: 0
      },()=>{runType.querySelector('i').className = 'i-loop';});
    }
  };

  //切换显示音量条
  showVol() {
    let vControl = document.querySelector('.vc-box');
    if (vControl.style.display === 'none') {
      vControl.style.display = 'block';
    } else {
      vControl.style.display = 'none';
    }
  }

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
      let randomNumber = parseInt(255 * Math.random(), 10);
      this.setState({
        runOrder: this.state.preOrder,
        preOrder: randomNumber
      }, () => {
        this.start(this.state.runOrder);
      });
    }
  }

  //播放下一首
  nextClick() {
    let trackLen = ml.tracks.length;

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
      let randomNumber = parseInt(255 * Math.random(), 10);
      this.setState({
        runOrder: randomNumber,
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
    console.log();
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

    //监听播放
    this.player.addEventListener('playing', () => {
      clearInterval(this.timer);
      
      let totalTime = this.player.duration;
      this.timer = setInterval(() => {
        progressNow.style.width = `${this.player.currentTime/totalTime*100}%`;
      }, 1000);
    });

    //监听暂停
    this.player.addEventListener('pause', () => {
      clearInterval(this.timer);
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
          <img className="bgPic" alt="背景"></img>
        </div>

        {/*歌曲信息*/}
        <div className="music-info">
          <img 
            className="music-pic"
            src={ml.tracks[this.state.runOrder].picUrl}
            alt="专辑图"
            style={{display:'none'}}
            style={this.state.isPlaying?{animationPlayState:''}:{animationPlayState:'paused'}}/>

          <p className="music-name">
            {ml.tracks[this.state.runOrder].name}
          </p>
          <p className="author-name">
            {ml.tracks[this.state.runOrder].artists}
          </p>
        </div>

        {/*底部播放控制*/}
        <div id="control">

          <a id="previous" onClick={this.previousClick.bind(this)}>
            <i className="i-previous"></i>
          </a>

          <a id="play" onClick={this.toggleRun.bind(this)}>
            <i className={this.state.isPlaying?'i-pause':'i-start'}></i>
          </a>

          <a id="next" onClick={this.nextClick.bind(this)}>
            <i className="i-next"></i>
          </a>

        </div>

        {/*左部列表*/}
        <div id="list" onTouchStart={this.handleListTouch.bind(this)} onTouchEnd={this.handleListTouch.bind(this)}>
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

        {/*左下列表按钮*/}
        <a id="listBtn" onClick={this.toggleList}>
          <i className="list-icon"></i>
        </a>


        {/*中下播放类型*/}
       <a id="runType" onClick={this.changeRunType.bind(this)} >
          <i className="i-loop"></i>
        </a>

        {/*右下音量控制*/}
        <a id="volume">
          <div className="vc-box" style={{display:'none'}} onMouseDown={this.changeVolume.bind(this)}>
            <div className="curr-vol"></div>
          </div>
          <i className="i-unmute" onClick={this.showVol}></i>
        </a>

      </div>
    );
  }
}


