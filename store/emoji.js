// import axios from '@nuxtjs/axios'

export const state = () => ({
  emoji: null,
  tags: [],
  threads: [],
  pageinateData: null,
  loading:true,
  totalThreadsCount: 0
})

export const getters = {
  emoji(state){
    return state.emoji;
  },
  tags(state){
    return state.tags;
  },
  threads(state){
    return state.threads;
  },
  pageinateData(state){
    return state.pageinateData;
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
  }
}

export const mutations = {
  SET_EMOJI: (state, emoji)=>{
    state.emoji = emoji
  },
  SET_TAGS: (state, tags)=>{
    state.tags = tags
  },
  SET_THREADS: (state, threads)=>{
    state.threads = threads
  },
  SET_PAGINATE_DATA: (state, data)=>{
    state.pageinateData = data
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
