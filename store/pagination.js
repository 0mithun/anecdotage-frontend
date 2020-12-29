// import axios from '@nuxtjs/axios'

export const state = () => ({
  q: {}
})

export const getters = {
  q(state){
    return state.q;
  },

}

export const mutations = {
  SET_QUERY_STRING: (state, q)=>{
    state.q = q
  },

}

export const actions = {

}
