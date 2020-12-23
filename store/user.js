// import axios from '@nuxtjs/axios'

export const state = () => ({
  profileUser: null,
  profileUserPrivacy: null,
  threads: [],
  favorites: [],
  likes: [],
  is_friend: false,
  is_follow: false,



})

export const getters = {
  profileUser(state){
    return state.profileUser;
  },
  profileUserPrivacy(state){
    return state.profileUserPrivacy;
  },
  is_friend(state){
    return state.is_friend;
  },
  is_follow(state){
    return state.is_follow;
  },
  threads(state){
    return state.threads;
  },
  threadsCount(state){
    return state.threads.length;
  },
  favorites(state){
    return state.favorites;
  },
  favoritesCount(state){
    return state.favorites.length;
  },
  likes(state){
    return state.likes;
  },
  likesCount(state){
    return state.likes.length;
  },

}

export const mutations = {
  SET_USER: (state, user)=>{
    state.profileUser = user
  },
  SET_USER_PRIVACY: (state, privacy)=>{
    state.profileUserPrivacy = privacy
  },
  SET_THREADS: (state, threads)=>{
    state.threads = threads
  },
  SET_FAVORITES: (state, favorites)=>{
    state.favorites = favorites
  },
  SET_LIKES: (state, likes)=>{
    state.likes = likes
  },
  SET_IS_FRIEND: (state, is_friend)=>{
    state.is_friend = is_friend
  },
  SET_IS_FOLLOW: (state, is_follow)=>{
    state.is_follow = is_follow
  },
  FOLLOW_USER(state, user){
    state.is_follow = true;
  },
  UNFOLLOW_USER(state, user){
    state.is_follow = false;
  }


}

export const actions = {
  async follow({commit}, user){
    const response = await this.$axios.$post(`users/${user.username}/follow`)
    commit('FOLLOW_USER', user);
    commit('friends/ADD_FOLLOWERS', this.$auth.user, {root:true});
  },
  async unfollow({commit}, user){
    try{
      const response = await this.$axios.$delete(`users/${user.username}/follow`)
      commit('UNFOLLOW_USER', user);
      commit('friends/REMOVE_FOLLOWERS', this.$auth.user, {root:true});
    }catch(e){

    }
  }
}
