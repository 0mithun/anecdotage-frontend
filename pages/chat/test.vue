<template>
	<div class="window-container">
		<div class="chat-forms">

		</div>

		<chat-window
			height="calc(100vh - 80px)"
			:show-add-room="false"
			:show-files="false"
			:show-audio="false"
			:theme="theme"
			:styles="styles"
			:current-user-id="currentUserId"
			:rooms="loadingRooms ? [] : rooms"
			:loading-rooms="loadingRooms"
			:messages="messages"
			:messages-loaded="messagesLoaded"
			@fetch-messages="fetchMessages"
			@send-message="sendMessage"
			@delete-message="deleteMessage"

			@message-action-handler="messageActionHandler"
			@send-message-reaction="sendMessageReaction"
			@typing-message="typingMessage"
		>
		</chat-window>
	</div>
</template>

<script>
// import {
// 	firebase,
// 	roomsRef,
// 	messagesRef,
// 	usersRef,
// 	filesRef,
// 	deleteDbField
// } from '@/firestore'
import { parseTimestamp, isSameDay } from '@/utils/dates'

// import ChatWindow from 'vue-advanced-chat'
// import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {

	data() {
		return {
      theme:'light',
			perPage: 20,
			rooms: [],
			allUsers: [],
			loadingRooms: true,
			loadingLastMessageByRoom: 0,
			selectedRoom: null,
			messages: [],
			messagesLoaded: false,
			roomMessage: '',
			start: null,
			end: null,
			roomsListeners: [],
			listeners: [],
			typingMessageCache: '',
			disableForm: false,
			styles: { container: { borderRadius: '4px' } }
			// ,dbRequestCount: 0
		}
  },
  computed:{
    currentUserId(){
      return 1;
    }
  },

	mounted() {
		this.fetchRooms()
		// this.updateUserOnlineStatus()
	},

	destroyed() {
		// this.resetRooms()
	},

	methods: {
		resetRooms() {
			this.loadingRooms = true
			this.loadingLastMessageByRoom = 0
			this.rooms = []
			this.roomsListeners.forEach(listener => listener())
			this.resetMessages()
		},

		resetMessages() {
			// this.messages = []
			// this.messagesLoaded = false
			// this.start = null
			// this.end = null
			// this.listeners.forEach(listener => listener())
			// this.listeners = []
		},

		async fetchRooms() {
			// this.resetRooms()

			const rooms = await this.$axios.$get('/chat/rooms')
      this.rooms = rooms;
			this.loadingRooms = false;
		},

		listenLastMessage(room, index) {

		},

		formatLastMessage(message) {
			if (!message.timestamp) return
			const date = new Date(message.timestamp.seconds * 1000)
			const timestampFormat = isSameDay(date, new Date()) ? 'HH:mm' : 'DD/MM/YY'

			let timestamp = parseTimestamp(message.timestamp, timestampFormat)
			if (timestampFormat === 'HH:mm') timestamp = `Today, ${timestamp}`

			let content = message.content
			if (message.file) content = `${message.file.name}.${message.file.type}`

			return {
				...message,
				...{
					content,
					timestamp,
					date: message.timestamp.seconds,
					seen: message.sender_id === this.currentUserId ? message.seen : null,
					new:
						message.sender_id !== this.currentUserId &&
						(!message.seen || !message.seen[this.currentUserId])
				}
			}
		},

		async fetchMessages({ room, options = {} }) {
			try{
				const messages = await this.$axios.$get(`chat/rooms/${room.roomId}`)
        this.messages = messages;
        console.log(messages)
			}catch(e){

			} finally{
				this.messagesLoaded = true;
			}

			// this.loadingRooms = false;
		},

		listenMessages(messages, room) {

		},

		markMessagesSeen(room, message) {

		},

		formatMessage(room, message) {

		},

		async sendMessage({ content, roomId, file, replyMessage }) {
			console.log(content)
			console.log(roomId)
			console.log(file)
			console.log(replyMessage)
		},

		async deleteMessage({ messageId, roomId }) {

		},

		messageActionHandler() {
			// do something
		},

		textareaActionHandler({ message, roomId }) {
			this.roomMessage = 'Implement your own action!'
		},

		async sendMessageReaction({ reaction, remove, messageId, roomId }) {

		},

		typingMessage({ message, roomId }) {

		},

		async listenRoomsTypingUsers(query) {

		},

		updateUserOnlineStatus() {

		},

		listenUsersOnlineStatus() {

		},

		resetForms() {
			this.disableForm = false
			this.addNewRoom = null
			this.addRoomUsername = ''
			this.inviteRoomId = null
			this.invitedUsername = ''
			this.removeRoomId = null
			this.removeUserId = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.window-container {
	width: 100%;
}

.chat-forms {
	padding-bottom: 20px;

	form {
		padding-top: 20px;
	}

	input {
		padding: 5px;
		width: 180px;
		height: 21px;
		border-radius: 4px;
		border: 1px solid #d2d6da;
		outline: none;
		font-size: 14px;
		vertical-align: middle;

		&::placeholder {
			color: #9ca6af;
		}
	}

	button {
		background: #1976d2;
		color: #fff;
		outline: none;
		cursor: pointer;
		border-radius: 4px;
		padding: 8px 12px;
		margin-left: 10px;
		border: none;
		font-size: 14px;
		transition: 0.3s;
		vertical-align: middle;

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 0.6;
		}

		&:disabled {
			cursor: initial;
			background: #c6c9cc;
			opacity: 0.6;
		}
	}

	.button-cancel {
		color: #a8aeb3;
		background: none;
		margin-left: 5px;
	}

	select {
		vertical-align: middle;
		height: 33px;
		width: 120px;
		font-size: 13px;
	}
}
</style>
