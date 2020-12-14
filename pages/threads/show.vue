<template>
  <div class="container">

    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-12">

            <div class="card card-m-5">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <nuxt-link
                      class="tag-name"
                      :to="{ name: 'tags', params: { slug: thread.channel.slug } }"
                    >
                      #{{ thread.channel.name }}
                    </nuxt-link>
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
                        <map-location :location="thread.location"></map-location>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row author">
                  <div class="col-md-12"></div>
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

                        <ReportThread :thread="thread"  />
                        <ShowSource  :source="thread.source" />

                      </div>
                    </div>
                  </div>
                </div>

                <div class="row card-m-5">
                  <div class="thread-thumbnail" :style="threadThumbStyle">
                      <img
                        :src="thread.thread_image_path"
                        :alt="thread.title"
                        class=" thread-image thread_thumb_image"
                      />

                  </div>
                </div>


                <div class="row thread-body-row">
                  <div class="col-md-12">
                    <div class="thread-body" v-html="thread.body"></div>
                  </div>
                </div>

                <div class="row thread-tag-list ">
                  <div class="col-md-12">
                    Tags: <nuxt-link v-for="tag in thread.tags" :key="tag.id" :to="{name:'tags', params:{slug:tag.slug}}" class="tag-name">#{{ tag.name }}</nuxt-link>
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
                        <ReportThread :thread="thread"  />
                        <ShowSource  :source="thread.source" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
import focusComment from '@/components/comments/FocusComment'

import ReportThread from '@/components/threads/ReportThread'
import ShowSource from '@/components/threads/ShowSource'

import Sidebar from '@/layouts/partials/Sidebar'


import Replies from '@/components/replies/Replies';

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
    Replies

  },
   computed: {
    threadThumbStyle() {
      return `background: rgba(${this.thread.image_path_pixel_color});`;
    },
    thread(){
      return this.$store.state.threads.thread;
    }
  },
  async fetch({ params, query, error, $axios, store }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
      // return { thread: threadRresponse.data};
      store.commit('threads/setCurrentThread', threadRresponse.data)

    } catch (err) {
      if(err.response.status === 404){
        error({statusCode : 404, message:'Thread Not Found'})
      }else if(err.response.status === 429){
        error({statusCode : 429, message:'Too Many Attempt'})
      }else if(err.response.status === 401){
        redirect('/login');
      }else{
        error({statusCode : 500, message:'Server Error'})
      }
    }
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
    max-width: 100%;
    height: 240px;
}


</style>
