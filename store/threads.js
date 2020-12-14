// import axios from '@nuxtjs/axios'

export const state = () => ({
  threads: [],
  pageinateData: null,
  thread: null,
})

export const getters = {
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
