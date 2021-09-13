// import axios from '@nuxtjs/axios'

export const state = () => ({
  threads: [],
  pageinateData: null,
  thread: null,
  totalThreadsCount: 0
})

export const getters = {
  pageinateData(state){
    return state.pageinateData
  },
  threads(state){
    return state.threads;
  },
  thread(state){
    return state.thread;
  },
  totalThreadsCount(state){
    return state.totalThreadsCount;
  },
}

export const mutations = {
  setCurrentThread: (state, data)=>{
    state.thread = data
  },

  setThreads: (state, data)=>{
    state.threads = data
  },
  setPageinateData: (state, data)=>{
    state.pageinateData = data
  },
  setTotalThreadsCount: (state, data)=>{
    state.totalThreadsCount = data
  }
}

export const actions = {

}
