// import axios from '@nuxtjs/axios'

export const state = () => ({
  threads: [],
  pageinateData: null,
  thread: null,
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
  }
}

export const actions = {

}
