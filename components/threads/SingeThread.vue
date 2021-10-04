<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12 tags">
          <nuxt-link
            class="tag-name"
            :to="{ name: 'tags', params: { slug: thread.channel.slug } }"
          >
            #{{ thread.channel.name }}
          </nuxt-link>

          <AdminButtons :thread="thread" />
        </div>
      </div>
      <div class="row thread-title-row">
        <div class="col-md-12">
          <nuxt-link
            :to="{ name: 'threads.show', params: { slug: thread.slug } }"
            class="thread-title"
          >
            <span v-html="thread.title"></span>
          </nuxt-link>
        </div>
      </div>
      <div class="row count-items-row">
        <div class="col-md-12">
          <div
            class="count-items d-flex justify-content-between align-items-center flex-wrap"
          >
            <view-counts :thread="thread"></view-counts>
            <point-counts :thread="thread"></point-counts>
            <comment-counts :thread="thread"></comment-counts>
            <favorite-counts :thread="thread"></favorite-counts>

            <emoji-counts :thread="thread"></emoji-counts>
            <div class="thread-map-icon">
              <map-location
                :location="thread.location"
                :address="thread.formatted_address"
              ></map-location>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="thread.thread_image_path != ''">
        <div
          class="thread-thumbnail"
          :style="threadThumbStyle"
          @click="openThreadUrl"
        >
          <nuxt-link
            :to="{}"
          >
            <!-- <img
              :src="thread.thread_image_path"
              :alt="thread.title"
              class="thread-image thread_thumb_image"
            /> -->

            <img  title="" v-lazy-load
              :data-src="thread.thread_image_path"
              :alt="stripTagTitle"
              class="thread-image thread_thumb_image"
              heigh="240"
              width="auto"
              style="width:auto;height:240px"
            >

          </nuxt-link>
        </div>
      </div>
      <div class="row image-description-row">
         <image-description :thread="thread"></image-description>
      </div>
      <div class="row thread-body-row">
        <div class="col-md-12">
          <div class="thread-body" v-html="thread.excerpt"></div>
        </div>
      </div>
      <div class="row thread-tools-row">
        <div class="col-md-12">
          <div
            class="thread-footer-menu d-flex justify-content-between align-items-center"
          >
            <vote-emoji-list
              :thread="thread"
              size="small"
              position="top"
            ></vote-emoji-list>
            <div class="social-share-btn">
              <fb-share :thread="thread"></fb-share>
              <twitter-share :thread="thread"></twitter-share>
            </div>
            <div
              class="thread-show-tools d-flex justify-content-between align-items-center"
            >
              <up-votes :thread="thread" size="small"></up-votes>
              <down-votes :thread="thread" size="small"></down-votes>
              <go-to-comment :thread="thread" size="small"></go-to-comment>
              <favorite-thread :thread="thread" size="small"></favorite-thread>
              <vote-emojis
                :thread="thread"
                size="small"
                position="top"
              ></vote-emojis>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="`edit-title-${thread.id}`"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      v-if="isAdmin"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="" class="control-label">Title</label>
              <input type="text" class="form-control" v-model="form.title" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="submit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewCounts from '@/components/counts/ViewCounts';
import CommentCounts from '@/components/counts/CommentCounts';
import PointCounts from '@/components/counts/PointCounts';
import FavoriteCounts from '@/components/counts/FavoriteCounts';
import EmojiCounts from '@/components/counts/EmojiCounts';
import MapLocation from '@/components/gmap/MapLocation';

import FbShare from '@/components/social/FbShare';
import TwitterShare from '@/components/social/TwitterShare';

import VoteEmojiList from '@/components/emojis/VoteEmojiList';
import VoteEmojis from '@/components/emojis/VoteEmojis';

import FavoriteThread from '@/components/votes/FavoriteThread';
import UpVotes from '@/components/votes/UpVotes';
import DownVotes from '@/components/votes/DownVotes';

import GoToComment from '@/components/comments/GoToComment';
import AdminButtons from '@/components/threads/AdminButtons';
import ImageDescription from '~/components/threads/ImageDescription';
import swal from '@/mixins/swal'
export default {
  mixins: [swal],
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: this.$vform({
        title: '',
      }),

      duplicateForm: this.$vform({
        channel: '',
        tags: [],
        title: '',
        body: '',
        source: '',
        location: '',
        cno: {
          famous: false,
          celebrity: false,
        },
        main_subject: '',
        scrape_image: false,
        age_restriction: 0,
        anonymous: 0,
        isDuplicate: true,
      }),
    };
  },
  mounted() {
    this.form.title = this.thread.title;
    let p = document.querySelectorAll('p');

    for (let i = 0; i < p.length; i++) {
      // x[i].style.backgroundColor = "red";
      p[i].style.marginTop = '.5rem';
    }

    p[0].style.marginTop = '0';
  },

  computed: {
    threadThumbStyle() {
      return `background: rgba(${this.thread.image_path_pixel_color});cursor:pointer;`;
    },

    stripTagTitle() {
      return this.thread.title.replace(/(<([^>]+)>)/gi, '');
    },

    signedIn() {
      return this.$auth.loggedIn;
    },
    isAdmin() {
      if (this.signedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
  },
  components: {
    ViewCounts,
    CommentCounts,
    PointCounts,
    FavoriteCounts,
    EmojiCounts,
    MapLocation,
    TwitterShare,
    FbShare,
    VoteEmojis,
    VoteEmojiList,
    UpVotes,
    DownVotes,
    FavoriteThread,
    GoToComment,
    AdminButtons,
    ImageDescription
  },
  methods: {
    openThreadUrl() {
      this.$router.push({
        name: 'threads.show',
        params: { slug: this.thread.slug },
      });
    },

    submit() {
      this.form
        .put(`admin/threads/${this.thread.slug}`, this.form)
        .then((res) => {
          this.$toast.open({
            type: 'success',
            position: 'top-right',
            message: 'Title Update Successfully',
          });

          // edit-title-${thread.id}

          $(`#edit-title-${this.thread.id}`).modal('hide');
        })
        .catch((error) => {
          console.log(error);
        });
    },

    submitDuplicate() {
      this.duplicateForm
        .post('threads', this.duplicateForm)
        .then((res) => {
          this.submitDuplicateImage(res.data.slug);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitDuplicateImage(newThread) {
      this.$axios
        .$post(`threads/${newThread}/duplicateImage`, {
          old_thread: this.thread.slug,
        })
        .then((res) => {
          this.$router.push({
            name: 'threads.edit',
            params: { slug: res.slug },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    duplicateItem() {
      this.$axios
        .$get(`threads/${this.thread.slug}`)
        .then((res) => {
          const thread = res.data;
          this.form.channel = thread.channel;
          this.duplicateForm.title = thread.title;
          this.duplicateForm.body = thread.body;
          this.duplicateForm.source = thread.source;
          this.duplicateForm.location = thread.formatted_address;
          this.duplicateForm.main_subject = thread.main_subject;
          this.duplicateForm.age_restriction = thread.age_restriction;
          this.duplicateForm.anonymous = thread.anonymous;

          // this.form.channel = this.thread.channel;

          this.duplicateForm.tags = thread.tags.map((tag) => {
            return tag.name;
          });

          if (this.thread.cno == 'C') {
            this.duplicateForm.cno = {
              famous: true,
              celebrity: true,
            };
          } else if (this.thread.cno == 'N') {
            this.duplicateForm.cno = {
              famous: true,
              celebrity: false,
            };
          } else {
            this.duplicateForm.cno = {
              famous: false,
              celebrity: false,
            };
          }
        })
        .then((res) => {
          this.submitDuplicate();
        });
    },
    deleteThread() {
      this.$swal({
        title: 'Are you sure?',
        // text: "Are you sure delete this reply",
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$axios
            .$delete(`threads/${this.thread.slug}`)
            .then((res) => {
              this.$toast.open({
                type: 'success',
                position: 'top-right',
                message: 'Thread Delete Successfully.',
              });
              setTimeout(() => {
                this.loadTrending();
                this.$router.push({ name: 'index' });
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // console.log('no Delete')
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 5px 0;
  // padding:5px;
}

.tag-name {
  color: #ff4301;
}
.tag-name:link,
.tag-name:visited {
  color: #ff4301;
  text-transform: lowercase;
  text-decoration: none;
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
}
.thread-title {
  color: #000;
  font-weight: normal;
  overflow-wrap: anywhere;
  // font-family: Raleway, sans-serif;

  font-family: 'Merriweather Sans', sans-serif;

  & > *{
    font-family: 'Merriweather Sans', sans-serif;
    font-size:32px;
    font-weight: 700;
  }
}
// .count-items-row,
// .thread-body-row {
//   margin: 10px 0;
// }

.count-items {
  width: 100%;
}

.card-body {
  .row {
    margin-right: -20px;
    margin-left: -20px;
  }
}

.thread-thumbnail {
  display: flex;
  width: 100%;
  text-align: center;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}


.thread-image {
  // display: inline-block;
  max-height: 240px;
  min-height: 240px;
}

.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
}

.thread-body {
  color:black;
  line-height:22px;
}

.thread-body p {
  margin-top: 1rem;
}

.thread-body img {
  max-width: 100% !important;
}



 @media only screen and (max-width:600px) {
    .thread-title {
      font-size: 16px;
      line-height: 20px;
    }
  } // less 600px


 @media only screen and (min-width:600px) {
    .thread-title {
      font-size: 20px;
      line-height: 25px;
    }
  } //600px

  @media only screen and (min-width: 900px) {
     .thread-title {
      font-size: 22px;
      line-height: 30px;
    }
  } //900px

  @media only screen and (min-width: 1200px) {
     .thread-title {
      font-size: 25px;
      line-height: 35px;
    }
  } //1200px
  @media only screen and (min-width: 1400px) {
     .thread-title {
      font-size: 28px;
      line-height: 40px;
    }
  } //1200px


  @media only screen and (min-width: 1800px) {
     .thread-title {
      font-size: 30px;
      line-height: 48px;
    }
  } //1200px

  @media only screen and (min-width: 1800px) {
    .thread-title {
      font-size: 30px;
      line-height: 48px;
    }
  } //1800px


</style>
