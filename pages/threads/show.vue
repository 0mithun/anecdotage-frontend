<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-m-5" id="thread-card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 actions">
                    <div class="tag">
                      <nuxt-link
                        class="tag-name"
                        :to="{
                          name: 'tags',
                          params: { slug: thread.channel.slug },
                        }"
                      >
                        #{{ thread.channel.name }}
                      </nuxt-link>
                    </div>
                    <div class="action-menu" v-if="isAdmin || owns">
                      <nuxt-link
                        class="btn btn-primary"
                        :to="{
                          name: 'threads.edit',
                          params: { slug: thread.slug },
                        }"
                        >Edit</nuxt-link
                      >
                      <button class="btn btn-danger" @click="deleteThread">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <a class="thread-title">
                      <strong v-html="thread.title"></strong>
                    </a>
                  </div>
                </div>

                <div class="row count-items-row">
                  <div class="col-md-12">
                    <div
                      class="count-items d-flex justify-content-between align-items-center"
                    >
                      <view-counts :thread="thread"></view-counts>
                      <comment-counts :thread="thread"></comment-counts>
                      <point-counts :thread="thread"></point-counts>
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

                <div class="row author">
                  <div class="col-md-12">
                    <nuxt-link
                      :to="{
                        name: 'profile.show',
                        params: { username: thread.creator.username },
                      }"
                      class="creator_name"
                    >
                      <img
                        :src="thread.creator.photo_url"
                        :alt="thread.creator.name"
                        width="40"
                        height="40"
                        class="avatar-photo"
                      />
                      <!-- <user-online :user="reply.owner"></user-online> -->
                      <UserOnline :user="thread.creator" />
                      <span>{{ thread.creator.name }}</span>
                    </nuxt-link>
                  </div>
                </div>

                <div class="row">
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
                        <focusComment></focusComment>
                        <vote-emojis
                          :thread="thread"
                          size="small"
                          position="top"
                        ></vote-emojis>
                        <favorite-thread
                          :thread="thread"
                          size="small"
                        ></favorite-thread>
                        <up-votes :thread="thread" size="small"></up-votes>
                        <down-votes :thread="thread" size="small"></down-votes>

                        <ReportThread :thread="thread" />
                        <ShowSource :source="thread.source" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row card-m-5">
                  <div class="thread-thumbnail" :style="threadThumbStyle">
                    <img
                      :src="thread.thread_image_path"
                      :alt="thread.title"
                      class="thread-image thread_thumb_image"
                    />
                  </div>
                  <div
                    class="image_description"
                    v-html="thread.image_description"
                  ></div>
                </div>

                <div class="row thread-body-row">
                  <div class="col-md-12">
                    <div class="thread-body" v-html="thread.body"></div>
                  </div>
                </div>

                <div class="row thread-tag-list">
                  <div class="col-md-12">
                    Tags:
                    <nuxt-link
                      v-for="tag in thread.tags"
                      :key="tag.id"
                      :to="{ name: 'tags', params: { slug: tag.slug } }"
                      class="tag-name"
                      >#{{ tag.name }}</nuxt-link
                    >
                  </div>
                </div>

                <div class="row card-m-5">
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
                        <focusComment></focusComment>
                        <vote-emojis
                          :thread="thread"
                          size="small"
                          position="top"
                        ></vote-emojis>
                        <favorite-thread
                          :thread="thread"
                          size="small"
                        ></favorite-thread>
                        <up-votes :thread="thread" size="small"></up-votes>
                        <down-votes :thread="thread" size="small"></down-votes>
                        <ReportThread :thread="thread" />
                        <ShowSource :source="thread.source" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row card-m-5" v-if="thread.location != null">
          <div class="col-md-12">
            <SimpleMap :thread="thread" />
          </div>
        </div>
        <div class="row card-m-5">
          <div class="col-md-12">
            <Replies />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <Sidebar />
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
import focusComment from '@/components/comments/FocusComment';

import ReportThread from '@/components/threads/ReportThread';
import ShowSource from '@/components/threads/ShowSource';

import Sidebar from '@/layouts/partials/Sidebar';

import Replies from '@/components/replies/Replies';
import UserOnline from '@/components/chat/UserOnline';
import SimpleMap from '@/components/gmap/SimpleMap';

//image_path_pixel_color
export default {
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
    Sidebar,
    focusComment,
    ShowSource,
    ReportThread,
    Replies,
    UserOnline,
    SimpleMap,
  },
  head() {
    return {
      title: this.settings.site_title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          content: this.thread.thread_image_path,
          property: 'og:image',
        },
        {
          content: this.settings.site_name,
          property: 'og:site_name',
        },
        {
          content: this.thread.title,
          property: 'og:title',
        },
        {
          content: this.$router.resolve({
            name: 'threads.show',
            params: { slug: this.thread.slug },
          }).href,
          property: 'og:url',
        },
        {
          content: 'article',
          property: 'og:type',
        },
        {
          content: this.thread.excerpt,
          property: 'og:description',
        },
        {
          content: 'summary_large_image',
          name: 'twitter:card',
        },
        {
          content: '@anecdotage',
          name: 'twitter:site',
        },
        {
          content: '@anecdotage',
          name: 'twitter:creator',
        },
        {
          content: this.$router.resolve({
            name: 'threads.show',
            params: { slug: this.thread.slug },
          }).href,
          name: 'twitter:url',
        },
        {
          content: this.thread.title,
          name: 'twitter:title',
        },
        {
          content: this.thread.excerpt,
          name: 'twitter:description',
        },
        {
          content: this.thread.thread_image_path,
          name: 'twitter:image',
        },

        //Meta Information
        {
          content: this.thread.title,
          name: 'title',
        },
        //Meta Information
        {
          content: this.thread.excerpt,
          name: 'description',
        },
      ],

      //       <meta property="og:image" content="{{ $thread->threadImagePath }}"/>
      // <meta property="og:site_name" content="{{ config('app.name') }}">
      // <meta property="og:title" content="{{ $thread->title }}">
      // <meta property="og:url" content="{{ url($thread->path) }}">
      // <meta property="og:type" content="article">
      // <meta property="og:description" content="{{ $thread->excerpt }}">

      // <meta name=twitter:card content=summary_large_image />
      // <meta name=twitter:site content="@anecdotage" />
      // <meta name=twitter:creator content="@anecdotage" />
      // <meta name=twitter:url content="{{ url($thread->path) }}" />
      // <meta name=twitter:title content="{{ $thread->title }}" />
      // <meta name=twitter:description content="{{ $thread->excerpt }}" />
      // <meta name=twitter:image content="{{ $thread->threadImagePath }}" />
    };
  },
  computed: {
    threadThumbStyle() {
      return `background: rgba(${this.thread.image_path_pixel_color});`;
    },
    thread() {
      return this.$store.state.threads.thread;
    },
    settings() {
      return this.$store.state.settings;
    },
    owns(thread) {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },
    isBan() {
      return this.$store.state.auth.user.is_ban;
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
  async fetch({ params, query, error, $axios, store }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
      // return { thread: threadRresponse.data};
      store.commit('threads/setCurrentThread', threadRresponse.data);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Thread Not Found' });
      } else if (err.response.status === 429) {
        error({ statusCode: 429, message: 'Too Many Attempt' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
  methods: {
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
.tag-name {
  color: #ff4301;
}
.tag-name:link,
.tag-name:visited {
  color: #ff4301;
  text-transform: lowercase;
  text-decoration: none;
  display: inline-block;
  // padding-right: 5px;
  padding-left: 5px;
  font-size: 14px;
  font-weight: normal;
}
.thread-title {
  color: #000;
  font-weight: normal;
  overflow-wrap: anywhere;
  font-size: 30px;
  line-height: 48px;
  font-family: Raleway, sans-serif;
}
.count-items-row,
.thread-body-row {
  margin: 10px 0;
}

.thread-body {
  p{
    display: inline;
  }
}

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
  display: inline-block;
  max-height: 240px;
}
.col-md-12.actions {
  display: flex;
  justify-content: space-between;
}
.creator_name {
  display: flex;
  align-items: center;
  color: #ff4301;
  font-size: 18px;
  font-weight: normal;
  font-family: Raleway, sans-serif;

  img {
    margin-right: 5px;
    border-radius: 50%;
  }
}

.image_description {
  margin: 5px 10px;
  font-size: 12px;
}
</style>
