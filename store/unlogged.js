// import axios from '@nuxtjs/axios'

export const state = () => ({
  favorites: [],
  likes: [],
  dislikes: [],
})

export const getters = {
  favorites(state){
    return state.favorites;
  },
  likes(state){
    return state.likes;
  },
  dislikes(state){
    return state.dislikes;
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

  //Likes & Dislikes
  SET_LIKES: (state, thread)=>{
    if(state.likes.includes(thread)){
      state.likes = state.likes.filter(item=> item != thread)
    }else{
      if(state.dislikes.includes(thread)){
        state.dislikes = state.dislikes.filter(item=> item != thread)
      }
      state.likes = [...state.likes, thread]
    }
  },
  SET_DISLIKES: (state, thread)=>{
    if(state.dislikes.includes(thread)){
      state.dislikes = state.dislikes.filter(item=> item != thread)
    }else{
      if(state.likes.includes(thread)){
        state.likes = state.likes.filter(item=> item != thread)
      }
      state.dislikes = [...state.dislikes, thread]
    }
  },



  EMPTY_FAVORITES: (state)=>{
    state.favorites = []
  },

  EMPTY_LIKES: (state)=>{
    state.likes = []
  },
  EMPTY_DISLIKES: (state)=>{
    state.dislikes = []
  },
}

export const actions = {
  async saveUnloggedUserInfo({commit, state}, user_id){
    try {
      const res =  await this.$axios.$post(`save-unlogged-user-info`,{
        favorite_ids: state.favorites,
        like_ids: state.likes,
        dislike_ids: state.dislikes,
        user_id: user_id
      })
      commit('EMPTY_FAVORITES')
      commit('EMPTY_LIKES')
      commit('EMPTY_DISLIKES')
      console.log(res);
    } catch (error) {

    }
  },



}
