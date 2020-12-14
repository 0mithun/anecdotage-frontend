// import axios from '@nuxtjs/axios'

export const state = () => ({
  replies: [],
})

export const getters = {
}

export const mutations = {

  setReplies: (state, data)=>{
    state.replies = data
  },

  replyAdd: (state, data) => {
      state.replies = [...state.replies, data]
  },

  replyDelete: (state, data) => {
    let replies = state.replies.filter(item=>{
      return item.id !== data.id;
    })

    state.replies = replies;
  }

}

export const actions = {

}
