// import axios from '@nuxtjs/axios'

export const state = () => ({
  threads: [],
  pageinateData: null,
  thread: null,
  loading:true,
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
   loading(state){
    return state.loading;
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
  },
  SET_LOADING: (state, loading)=>{
    state.loading = loading
  },
}

// export const actions = {

// }




export const actions = {
  async getThreads({commit}, {term, query}){
    try{
      query.q = term

      const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

      const response = await this.$axios.$get(`admin/bookbuilder?${q}`);

      commit('setThreads', response.threads.data);
      commit('setPageinateData', response.threads.meta);

      commit('SET_LOADING', false);
    }catch(e){
      console.log(e)
    }
  },


}



