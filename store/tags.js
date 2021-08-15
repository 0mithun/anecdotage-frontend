// import axios from '@nuxtjs/axios'

export const state = () => ({
  tag: null,
  threads: [],
  pageinateData: null,
  totalThreadsCount: 0
})

export const getters = {
}

export const mutations = {
  setTags: (state, data)=>{
    state.tag = data
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
