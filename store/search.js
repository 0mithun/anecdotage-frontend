// import axios from '@nuxtjs/axios'

export const state = () => ({
  tags: [],
  threads: [],
  pageinateData: null
})

export const getters = {
  tags(state){
    return state.tags;
  },
  threads(state){
    return state.threads;
  },
  threadsCount(state){
    return state.pageinateData.total;
  },
  pageinateData(state){
    return state.pageinateData;
  }
}

export const mutations = {
  SET_TAGS: (state, tags)=>{
    state.tags = tags
  },
  SET_THREADS: (state, threads)=>{
    state.threads = threads
  },
  SET_PAGINATE_DATA: (state, pageinateData)=>{
    state.pageinateData = pageinateData
  }
}

export const actions = {

}
