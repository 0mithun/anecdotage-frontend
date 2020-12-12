// import axios from '@nuxtjs/axios'

export const state = () => ({
  channels: [],
  emojis: [],
  trendings: []
})

export const getters = {
  chanels: state => state.channels,
  emojis: state => state.emojis,
  trendings: state => state.trendings,
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
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, $axios }) {
    const channelResponse = await $axios.$get('channels');
    const emojiResponse = await $axios.$get('emojis')
    const trendingResponse = await $axios.$get('trending/threads')

    commit('setChannels', channelResponse);
    commit('setEmojis', emojiResponse.data);
    commit('setTrendings', trendingResponse.data)
  }
}
