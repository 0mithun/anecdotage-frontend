<template>
  <div :id="'reply-' + id" class="single-reply">
    <div class="row reply-heading">

        <div class="thread_creator">
          <nuxt-link :to="{name:'profile.show', params:{username:reply.owner.username}}"  class="creator_name">
            <img
              :src="reply.owner.photo_url"
              :alt="reply.owner.name"
              width="25"
              height="25"
              class="avatar-photo"
            />
            <!-- <user-online :user="reply.owner"></user-online> -->
            <span>

              {{ reply.owner.name }}
            </span>
          </nuxt-link>
          <span v-text="ago" class="reply_created_at"></span>
        </div>

      <div class="col-md-4 reply-edit-delete-btn" v-if="isAdmin || owns">
        <div class="form-g">
          <button class="btn btn-xs btn-primary" @click="editing = true">  Edit</button>
          <button class="btn btn-xs btn-danger"  @click="destroy">Delete</button>
        </div>
      </div>
    </div>

    <div class="row reply-body">
      <div class="col-md-12">
        <div v-html="body" class="reply-body"></div>
        <div class="nested-reply-btn">
          <button
            class="btn btn-link add-nested-reply-btn"
            @click="
              addNested = true;
              showLoadMore = false;
            "

          >
            Reply
          </button>
          <!-- <a
            :href="redirectToLogin"
            class="btn btn-link add-nested-reply-btn"

            >Reply</a
          > -->

          <div class="edit-reply" v-if="editing">
            <div>
              <form action @submit.prevent="update">
                <div class="form-group">
                  <input
                    @keyup="addReplySuggest"
                    type="text"
                    class="form-control"
                    aria-label="..."
                    :id="'bodyedit-' + reply.id"
                    v-model="editBody"
                    placeholder="Add a comment"
                  />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-xs" type="submit">
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-xs"
                    @click="editing = false"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="edit-reply" v-if="addNested">
            <div>
              <form action @submit.prevent="addNestedReply">
                <div class="form-group">
                  <input
                    @keyup="addNestedReplySuggest"
                    type="text"
                    class="form-control"
                    aria-label="..."
                    :id="'addNested-' + reply.id"
                    v-model="nestedbody"
                    placeholder="Add a comment"
                  />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary btn-xs" type="submit">
                    Add
                  </button>
                  <button
                    class="btn btn-danger btn-xs"
                    @click="
                      addNested = false;
                      showLoadMore = true;
                    "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="more-reply" v-if="showLoadMore && replies_count > 0">
          <button
            class="btn btn-xs btn-link show-nested-replies-btn"
            @click="toggleNestedReplies"
          >
            <div v-if="showNested">
              <span class="glyphicon glyphicon-triangle-top"></span> Hide Reply
            </div>
            <div v-else>
              <span class="glyphicon glyphicon-triangle-bottom"></span>
              {{ `View ${replies_count} Reply` }}
            </div>
          </button>

          <template v-if="showNested">
            <NestedReplies
              :reply="reply"
              v-for="(reply, index) in replies"
              :key="index"
            ></NestedReplies>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "jquery.caret";
// import "at.js";

import moment from 'moment';
import userStatus from '@/mixins/userStatus'
export default {
  props: ["reply"],
  name: 'nestedReplies',
  mixins: [userStatus],
  components: {
    NestedReplies: () => import("./NestedReplies.vue"),
  },

  data() {
    return {
      editing: false,
      id: this.reply.id,
      body: this.reply.body,
      editBody: this.reply.body,
      replies: [],
      replies_count: this.reply.replies_count,
      showNested: false,
      addNested: false,
      nestedbody: "",
      showLoadMore: true,
    };
  },
  created() {
    this.$nuxt.$on("nested_delete-" + this.reply.id, (id) => {
      let newReplies = this.replies.filter((item) => {
        return item.id != id;
      });
      this.replies = newReplies;
      this.replies_count = this.replies_count - 1;
      this.$nuxt.$emit("nested_delete-" + this.reply.parent_id, this.reply.id);

    });
  },

  computed: {
    ago() {
      return (
        moment(this.reply.created_at, "YYYY-MM-DD HH:mm:ss").fromNow() + "..."
        // '2018-11-20'
      );
    },
    thread(){
      return this.$store.state.threads.thread;
    },
     owns () {
      if(this.signedIn){
          return this.$store.state.auth.user.id == this.reply.owner.id;
      }

      return false;
    },
  },

  methods: {
    toggleNestedReplies() {
      if (this.showNested) {
        this.showNested = false;
      } else {
        this.loadNestedReply();
        this.showNested = true;
      }
    },

    addReplySuggest() {
      // $("#bodyedit-" + this.reply.id).atwho({
      //   at: "@",
      //   delay: 750,
      //   callbacks: {
      //     remoteFilter: function(query, callback) {
      //       $.getJSON("/api/users", { name: query }, function(usernames) {
      //         callback(usernames);
      //       });
      //     },
      //   },
      // });

      // $("#addNested-" + this.reply.id).atwho({
      //   at: "@",
      //   delay: 750,
      //   callbacks: {
      //     remoteFilter: function(query, callback) {
      //       $.getJSON("/api/users", { name: query }, function(usernames) {
      //         callback(usernames);
      //       });
      //     },
      //   },
      // });
    },
    addNestedReplySuggest() {
      // $("#addNested-" + this.reply.id).atwho({
      //   at: "@",
      //   delay: 750,
      //   callbacks: {
      //     remoteFilter: function(query, callback) {
      //       $.getJSON("/api/users", { name: query }, function(usernames) {
      //         callback(usernames);
      //       });
      //     },
      //   },
      // });
    },
    loadNestedReply() {
      this.$axios.$get(`threads/${this.thread.slug}/replies/${this.reply.id}/childs`)
      .then(res=>{
          this.replies = res;
      })
      .catch(err=>{
        console.log(err)
      })
    },
    update() {
      this.$axios.$put(`threads/${this.thread.slug}/replies/${this.reply.id}`,{
        body: this.editBody
      })
      .then(res=>{
        this.body = this.editBody;
        this.editing = false;
        this.$toast.open({
          type:'success',
          position: 'bottom-right',
          message: 'Reply Update Successfully'
        });
      })
      .catch(err=>{
        console.log(err)
      })
    },

    destroy() {
      if (this.replies_count > 0) {
        this.$toast.open({
          type:'warning',
          position: 'top-right',
          message: 'Your reply has many replies.'
        });
        return;
      }

      this.$swal({
          title: "Are you sure?",
          // text: "Are you sure delete this reply",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.$axios.$delete(`threads/${this.thread.slug}/replies/${this.reply.id}`)
              .then(res=>{
                  console.log('deleteing nested')
                  this.$nuxt.$emit("nested_delete-" + this.reply.parent_id, this.reply.id);
                  this.$nuxt.$emit('commentDeleted-'+ this.reply.thread_id)
                  this.$toast.open({
                    type:'success',
                    position: 'top-right',
                    message: 'Reply Delete Successfully.'
                  });
              })
              .catch(err=>{
                console.log(err)
              })
          } else {
            // console.log('no Delete')
          }
        });
    },
    addNestedReply() {
      this.$axios.$post(`threads/${this.thread.slug}/replies`,{
        parent_id: this.reply.id,
        body:this.nestedbody,
      })
        .then(res=>{
          this.nestedbody = "";
          this.replies.push(res);
          this.replies_count = this.replies_count + 1;
          this.addNested = false;
          this.showLoadMore = true;
          this.showNested = true;

          this.$nuxt.$emit('commentAdded-'+ this.reply.thread_id)

          this.$toast.open({
          type:'success',
          position: 'top-right',
          message: 'Reply Add Successfully'
        });

        })
        .catch(err=>{
          console.log(err)
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.single-reply {
  margin: 5px;
}
.comment-body {
  resize: vertical !important;
}

.reply_created_at {
  color: #92959e;
  font-size: 12px;
  font-style: italic;
  margin-right: 10px;
}
.reply-body {
  padding: 0;
  margin-left: 20px;
  margin-top: -5px;
  color: #92959e;
}
.nested-reply-btn {
  margin-left: 10px;
}
.more-reply {
  margin-left: 5x;
}

.add-nested-reply-btn {
  color: #92959e;
}
.add-nested-reply-btn:hover {
  color: #92959e;
  text-decoration: none;
}
.add-nested-reply-btn:focus {
  outline: none;
  text-decoration: none;
}
.reply-edit-delete-btn {
  display: flex;
  justify-content: flex-end;
}
.show-nested-replies-btn {
  /* color: black; */
  color: #92959e;
}

.show-nested-replies-btn:focus {
  outline: none;
  text-decoration: none;
}
.show-nested-replies-btn:hover {
  color: #92959e;
  text-decoration: none;
}
.glyphicon-triangle-top,
.glyphicon-triangle-bottom {
  margin-right: 5px;
  font-size: 10px;
}

.btn-xs{
      padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
}

.avatar-photo {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.thread_creator {
    color: #ff4301;
}

.creator_name{
  color: #ff4301;
}
a.creator_name {
    display: flex;
    justify-content: normal;
    align-items: center;

    * {
      margin-right: 5px;
    }
}

.thread_creator{
    color: #ff4301;
    display: flex;
    align-items: center;
    justify-content: normal;
}

.reply-heading {
    display: flex;
    justify-content: space-between;
}

.more-reply {
  margin-left: 5px;
}

button.btn.btn-link.add-nested-reply-btn {
    font-size: 12px;
    padding: 0px 5px;
}
</style>
