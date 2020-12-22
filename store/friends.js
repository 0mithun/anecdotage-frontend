// import axios from '@nuxtjs/axios'

export const state = () => ({
  friends: [],
  friendRequests: [],
  blockLists: [],
  followers: [],
  followings: [],
})

export const getters = {
  friends(state){
    return state.friends;
  },

  friendRequests(state){
    return state.friendRequests;
  },

  blockLists(state){
    return state.blockLists;
  },

  followers(state){
    return state.followers;
  },
  followings(state){
    return state.followings;
  },
}

export const mutations = {
  SET_FRIENDS: (state, friends)=>{
    state.friends = friends
  },
  SET_FOLLOWERS: (state, followers)=>{
    state.followers = followers
  },
  SET_FOLLOWINGS: (state, followings)=>{
    state.followings = followings
  },
  SET_BLOCK_LISTS: (state, blockLists)=>{
    state.blockLists = blockLists
  },
  SET_FRIEND_REQUESTS: (state, friendRequests)=>{
    state.friendRequests = friendRequests
  },

}

export const actions = {

}
