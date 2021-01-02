import _  from 'lodash';

export const state = () => ({
  onlineUsers: [],
  friendLists: [],
  friendMessages: [],
})

export const getters = {
  onlineUsers(state){
    return state.onlineUsers;
  },
  friendLists(state){
    return state.friendLists;
  },
  friendMessages(state){
    return state.friendMessages;
  }
}

export const mutations = {
  SET_ONLINE_USERS: (state, users)=>{
    state.onlineUsers = users
  },
  ADD_USER_TO_ONLINE: (state, user)=>{
    let status = _.find(state.onlineUsers, { 'id': user.id });
    if (!status) {
        return state.onlineUsers.push(user)
    }
  },
  REMOVE_USER_FROM_ONLINE: (state, user)=>{
    let onlineUsers = _.remove(state.onlineUsers, (n) => {
      return n.id != user.id
    })
    state.onlineUsers = onlineUsers;
  },
  SET_CHAT_LISTS : (state, lists)=>{
    state.friendLists = lists;
  }
}

export const actions = {
  async getChatUserLists({commit}){
    try{
      const chatLists = await this.$axios.get('chat/chat-users-list');
      commit('SET_CHAT_LISTS', chatLists.data.data)
    }catch(e){

    }
  }
}




