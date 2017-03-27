
const randomNumber = (n) => {
  return parseInt(n * Math.random(), 10);
};
export default {

  namespace: 'playerState',

  state: {
    isPlaying: false,
    isShowList: false,
    runOrder: 0,
    preOrder: 0,
    runType: 0, //0顺序，1随机，2单曲
    volume: 1
  },

  reducers: {
    start(state, { runOrder,player }) {
      player.play();
      return {...state, isPlaying:true, runOrder:runOrder}
    },
    reStart(state,{player}) {
      player.play();
      return {...state, isPlaying:true}
    },
    pause(state,{player}) {
      player.pause();
      return {...state, isPlaying:false}
    },
    listClick(state,{runOrder}){
      return {...state, preOrder:state.runOrder, runOrder}
    },
    previousClick(state,{trackLen}){

      //顺序播放或单曲循环
      if (!state.runType || state.runType === 2) {

        if (state.runOrder !== 0) {
          return {...state, runOrder: state.runOrder - 1, preOrder: state.runOrder}

        } else {
          return {...state, runOrder: 0}
        }
      //随机播放
      } else {
        let rdNum = randomNumber(trackLen);
        return {...state, runOrder: state.preOrder, preOrder: rdNum}
      }
    },
    nextClick(state, {trackLen}){
      //顺序播放或单曲循环
      if (!state.runType || state.runType === 2) {
        if (state.runOrder !== trackLen - 1) {
          return {...state, runOrder: state.runOrder + 1, preOrder: state.runOrder}
        } else {
          return {...state, runOrder: 0}
        }
      //随机播放
      } else {
        let rdNum = randomNumber(trackLen);
        return {...state, runOrder: rdNum, preOrder: state.runOrder}
      }
    },
    toggleList(state){
      return {...state, isShowList:!state.isShowList}
    },
    changeRunType(state){
      let iconClass = ['i-loop','i-rand', 'i-loop-one' ],
          iconLen = iconClass.length - 1;
      let runType = state.runType;
      return {...state,runType: runType !== iconLen ? runType + 1 : 0}
    },
    changeVolume(state){
      
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'save' });
    },
  },


};
