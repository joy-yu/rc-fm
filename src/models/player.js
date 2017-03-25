
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
    start(state, { order:od }) {
      return {...state, isPlaying:true}
    },
    pause(state) {
      return {...state, isPlaying:false}
    },
    listClick(state,{runOrder:od}){
      return {...state, preOrder:state.runOrder, runOrder:od}
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },


};
