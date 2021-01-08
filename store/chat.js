import _  from 'lodash';

export const state = () => ({
  onlineUsers: [],
  friendLists: [],
  friendMessages: [],
  selectedUser:null
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
  },
  selectedUser(state){
    return state.selectedUser;
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
  },
  SET_FRIEND_MESSAGES: (state, messages)=>{
    state.friendMessages = messages;
  },
  SET_SELECTED_USER: (state, user)=>{
    state.selectedUser = user;
  },
  ADD_NEW_MESSAGE: (state, message)=>{
    state.friendMessages.push(message)
  }
}

export const actions = {
  async getChatUserLists({commit}){
    try{
      const chatLists = await this.$axios.get('chat/chat-users-list');
      commit('SET_CHAT_LISTS', chatLists.data)
    }catch(e){

    }
  },
  async getUserMessages({commit}, friend){
    try{
      const messages = await this.$axios.get(`chat/user/${friend.username}/messages`);
      commit('SET_FRIEND_MESSAGES', messages.data)
    }catch(e){

    }
  },
  async sendMessage({commit}, {selectedUser, chatForm}){
    try{
      const message = await this.$axios.$post(`chat/user/${selectedUser.username}/messages`,{
        message: chatForm.message,
        reply_id: chatForm.replyId,
        reply_message: chatForm.replyMessage,
      });
      commit('ADD_NEW_MESSAGE', message)
      this.$nuxt.$emit('MESSAGE_SEND_COMPLETE');
    }catch(e){

    }
  },

}




