// import axios from '@nuxtjs/axios'

export const state = () => ({
  profileUser: null,
  profileUserPrivacy: null,

  threads: [],
  threadsCount: 0,
  threads_paginate: null,

  favorites: [],
  favoritesCount: 0,
  favorites_paginate: null,

  likes: [],
  likesCount: 0,
  likes_paginate: null,

  subscriptions: [],
  subscriptionsCount: 0,
  subscriptions_paginate: null,

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
  threads_paginate(state){
    return state.threads_paginate;
  },
  threadsCount(state){
    return state.threadsCount;
  },
  favorites(state){
    return state.favorites;
  },
  favorites_paginate(state){
    return state.favorites_paginate;
  },
  favoritesCount(state){
    return state.favoritesCount;
  },

  likes(state){
    return state.likes;
  },
  likes_paginate(state){
    return state.likes_paginate;
  },
  likesCount(state){
    return state.likesCount;
  },
  subscriptions(state){
    return state.subscriptions;
  },
  subscriptions_paginate(state){
    return state.subscriptions_paginate;
  },
  subscriptionsCount(state){
    return state.subscriptionsCount;
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
  SET_THREADS_PAGINATE: (state, meta)=>{
    state.threads_paginate = meta
  },
  SET_THREADS_COUNT: (state, count)=>{
    state.threadsCount = count
  },


  SET_FAVORITES: (state, favorites)=>{
    state.favorites = favorites
  },
  SET_FAVORITES_PAGINATE(state, meta){
    state.favorites_paginate = meta;
  },
  SET_FAVORITES_COUNT: (state, count)=>{
    state.favoritesCount = count
  },

  SET_LIKES: (state, likes)=>{
    state.likes = likes
  },
  SET_LIKES_PAGINATE(state, meta){
    state.likes_paginate = meta;
  },
  SET_LIKES_COUNT: (state, count)=>{
    state.likesCount = count
  },

  SET_SUBSCRIPTIONS: (state, likes)=>{
    state.subscriptions = likes
  },
  SET_SUBSCRIPTIONS_PAGINATE(state, meta){
    state.subscriptions_paginate = meta;
  },
  SET_SUBSCRIPTIONS_COUNT: (state, count)=>{
    state.subscriptionsCount = count
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
