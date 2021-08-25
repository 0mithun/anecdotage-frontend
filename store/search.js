// import axios from '@nuxtjs/axios'

export const state = () => ({
  tags: [],
  threads: [],
  pageinateData: null,
  loading:true,
  totalThreadsCount: 0
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
  totalThreadsCount(state){
    return state.totalThreadsCount;
  },
  pageinateData(state){
    return state.pageinateData;
  },
  loading(state){
    return state.loading;
  },

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
  },
  SET_LOADING: (state, loading)=>{
    state.loading = loading
  },
  setTotalThreadsCount: (state, data)=>{
    state.totalThreadsCount = data
  }
}

export const actions = {

}
