// import axios from '@nuxtjs/axios'

export const state = () => ({
  threads: [],
  pageinateData: null
})

export const getters = {
}

export const mutations = {
  setThreads: (state, data)=>{
    state.threads = data
  },
  setPageinateData: (state, data)=>{
    state.pageinateData = data
  }
}

export const actions = {

}
