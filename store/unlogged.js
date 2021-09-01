// import axios from '@nuxtjs/axios'

export const state = () => ({
  favorites: [5,6,7,10000,8787],
})

export const getters = {
  favorites(state){
    return state.favorites;
  },

}

export const mutations = {
  SET_FAVORITES: (state, thread)=>{
    if(state.favorites.includes(thread)){
      state.favorites = state.favorites.filter(item=> item != thread)
    }else{
      state.favorites = [...state.favorites, thread]
    }
  },
  EMPTY_FAVORITES: (state)=>{
    state.favorites = []
  }
}

export const actions = {
  async favorites({commit, state}, user_id){
    try {
      const res =  await this.$axios.$post(`threads-batch-favorites`,{ids: state.favorites, user_id: user_id })
      commit('EMPTY_FAVORITES')
      console.log(res);
    } catch (error) {

    }
  }
}
