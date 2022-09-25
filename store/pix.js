// import axios from '@nuxtjs/axios'

export const state = () => ({
  pixes: [],
  pageinateData: null,
  devicePixelRatio: null,
  totalPixesCount: 0
})

export const getters = {
  pageinateData(state){
    return state.pageinateData
  },
  pixes(state){
    return state.pixes;
  },
  pix(state){
    return state.pix;
  },
  totalPixesCount(state){
    return state.totalPixesCount;
  },
}

export const mutations = {
  setCurrentPix: (state, data)=>{
    state.pix = data
  },

  setPixes: (state, data)=>{
    state.pixes = data
  },
  setPageinateData: (state, data)=>{
    state.pageinateData = data
  },
  setTotalPixesCount: (state, data)=>{
    state.totalPixesCount = data
  }
}

export const actions = {

}
