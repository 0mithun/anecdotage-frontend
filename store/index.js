// import axios from '@nuxtjs/axios'

export const state = () => ({
  channels: [],
  emojis: [],
  trendings: [],
  settings:null,
})

export const getters = {
  chanels: state => state.channels,
  emojis: state => state.emojis,
  trendings: state => state.trendings,
  settings: state => state.settings,
}

export const mutations = {
  setChannels: (state, data)=>{
    state.channels = data;
  },
  setEmojis: (state, data)=>{
    state.emojis = data;
  },
  setTrendings: (state, data)=>{
    state.trendings = data;
  },
  SET_SETTINGS: (state, data)=> {
    state.settings = data;
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, $axios }) {
    const channelResponse = await $axios.$get('channels');
    const emojiResponse = await $axios.$get('emojis')
    const trendingResponse = await $axios.$get('trending/threads')
    const settings = await $axios.$get(`settings`)

    commit('setChannels', channelResponse);
    commit('setEmojis', emojiResponse.data);
    commit('setTrendings', trendingResponse.data)
    commit('SET_SETTINGS', settings)
  }
}
