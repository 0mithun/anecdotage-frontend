// import axios from '@nuxtjs/axios'

export const state = () => ({
  channels: [],
  emojis: []
})

export const getters = {
  chanels: state => state.channels,
  emojis: state => state.emojis
}

export const mutations = {
  setChannels: (state, data)=>{
    state.channels = data;
  },
  setEmojis: (state, data)=>{
    state.emojis = data;
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, $axios }) {
    const channelResponse = await $axios.$get('channels');
    const emojiResponse = await $axios.$get('emojis')
    commit('setChannels', channelResponse);
    commit('setEmojis', emojiResponse.data);
  }
}
