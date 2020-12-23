// import axios from '@nuxtjs/axios'

export const state = () => ({
  friends: [],
  friendRequests: [],
  blockLists: [],
  followers: [],
  followings: [],
  sentRequst: false,
  sentUserRequst: false,
})

export const getters = {
  friends(state){
    return state.friends;
  },
  friendsCount(state){
    return state.friends.length;
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
  sentRequst(state){
    return state.sentRequst;
  },
  sentUserRequst(state){
    return state.sentUserRequst;
  }
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

  UNFRIEND(state, friend){
    const friends = state.friends.filter(item=>{
      return item.username !== friend.username;
    })
    state.friends = friends;
  },
  UNBLOCK(state, friend){
    const blockLists = state.blockLists.filter(item=>{
      return friend.username !== item.username;
    })
    state.blockLists = blockLists;
  },
  UNFOLLOW(state, friend){
    const followings = state.followings.filter(item=>{
      if(friend.follow_type === item.follow_type && friend.id == item.id){
        return false
      }
      return true;
    })
    state.followings = followings;
  },
  ACCEPT(state, friend){
    state.friends.push(friend);
  },
  REMOVE_FRIEND_REQUEST(state, friend){
    const friendRequests = state.friendRequests.filter(item=>{
      return friend.username !== item.username;
    })
    state.friendRequests = friendRequests;
  },

  REMOVE_FOLLOWERS(state, friend){
    const followers = state.followers.filter(item=>{
      return friend.username !== item.username;
    })
    state.followers = followers;
  },
  ADD_FOLLOWERS(state, friend){
    state.followers.push(friend);
  },

  SET_FRIEND_REQUEST(state, status){
    state.sentRequst = status;
  },
  SET_USER_FRIEND_REQUEST(state, status){
    state.sentUserRequst = status;
  }


}

export const actions = {
  async unfriend({commit}, friend){
   try{
    const response = await this.$axios.$post(`user/${friend.username}/friends/unfriend`);
    commit('UNFRIEND', friend);
   }catch(err){

   }
  },

  async unblock({commit}, friend){
    try{
     const response = await this.$axios.$post(`user/${friend.username}/friends/unblock`);
     commit('UNBLOCK', friend);
    }catch(err){

    }
  },

  async unfollow({commit}, friend){
    try{
      if(friend.follow_type == 'user'){
        const response = await this.$axios.$delete(`users/${friend.username}/follow`);
        commit('UNFOLLOW', friend);
      }else if(friend.follow_type == 'tag'){
        const response = await this.$axios.$delete(`tags/${friend.slug}/follow`);
        commit('UNFOLLOW', friend);
      }
    }catch(err){

    }
  },

  async accept({commit, rootState}, friend){
    try{
      const response = await this.$axios.$post(`user/${friend.username}/friends/accept`);
      commit('REMOVE_FRIEND_REQUEST', friend);
      const profileUser = rootState.user.profileUser;
     if(profileUser.username !== friend.username){
        commit('ACCEPT', friend);
     }
    }catch(err){

    }
  },

  async block({commit}, friend){
    try{
     const response = await this.$axios.$post(`user/${friend.username}/friends/block`);
     this.$router.push({name:'index'})
    }catch(err){

    }
  },
  async addFriend({commit}, friend){
    try{
     const response = await this.$axios.$post(`user/${friend.username}/friends/sent`);
      commit('SET_FRIEND_REQUEST', true)
    }catch(err){

    }
  },
  async checkSentRequest({commit}, friend){
    try{
      const response = await this.$axios.$post(`user/${friend.username}/friends/check-request-to`);

       commit('SET_FRIEND_REQUEST', response.sent_friend_request_to)
     }catch(err){

     }
  },
  async checkUserSentRequest({commit}, friend){
    try{
      const response = await this.$axios.$post(`user/${friend.username}/friends/check-request-from`);
       commit('SET_USER_FRIEND_REQUEST', response.sent_friend_request_from)
     }catch(err){

     }
  },

  async cancelRequest({commit}, friend){
    try{
      ///user/{user}/friends/cancel
      const response = await this.$axios.$post(`user/${friend.username}/friends/cancel`);
      commit('SET_FRIEND_REQUEST', false)
     }catch(err){

     }
  }



}
