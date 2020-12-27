// import axios from '@nuxtjs/axios'

export const state = () => ({
  emoji: null,
  threads: [],
  pageinateData: null
})

export const getters = {
  emoji(state){
    return state.emoji;
  },
  threads(state){
    return state.threads;
  },
  pageinateData(state){
    return state.pageinateData;
  },
}

export const mutations = {
  SET_EMOJI: (state, emoji)=>{
    state.emoji = emoji
  },
  SET_THREADS: (state, threads)=>{
    state.threads = threads
  },
  SET_PAGINATE_DATA: (state, data)=>{
    state.pageinateData = data
  }
}

export const actions = {

}
