
const randomNumber = (n) => {
  return parseInt(n * Math.random(), 10);
};
export default {

  namespace: 'playerState',

  state: {
    isPlaying: false,
    runOrder: 0,
    preOrder: 0,
    runType: 0, //0顺序，1随机，2单曲
    firstPosX: 0,
    endPosX: 0,
  },

  reducers: {
    start(state, { runOrder }) {
      return {...state, isPlaying:true, runOrder:runOrder}
    },
    pause(state) {
      return {...state, isPlaying:false}
    },
    listClick(state,{runOrder:od}){
      return {...state, preOrder:state.runOrder, runOrder:od}
    },
    previousClick(state,{runOrder:rod,preOrder:pod}){
      //顺序播放或单曲循环
      if (!state.runType || state.runType === 2) {
        if (state.runOrder !== 0) {
          return {...state, runOrder: state.runOrder - 1, preOrder: state.runOrder}
          //this.start(this.props.playerState.runOrder);

        } else {
          return {...state, runOrder: 0}
          //this.start(this.props.playerState.runOrder);
        }
      //随机播放
      } else {
        let rdNum = randomNumber(tracks.length);
        return {...state, runOrder: state.preOrder, preOrder: rdNum}
        //this.start(this.props.playerState.runOrder);
      }
    },
    nextClick(state, {trackLen}){
      //顺序播放或单曲循环
      if (!state.runType || state.runType === 2) {
        if (state.runOrder !== trackLen - 1) {
console.log({...state, runOrder:state.runOrder+1});
          return {...state, runOrder: state.runOrder + 1, preOrder: state.runOrder}
          //this.start(state.runOrder);
        } else {
          return {...state, runOrder: 0}
          //this.start(state.runOrder);
        }
      //随机播放
      } else {
        let rdNum = randomNumber(tracks.length);
        return {...state, runOrder: state.preOrder, preOrder: rdNum}
        //this.start(this.props.playerState.runOrder);
      }
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },


};
