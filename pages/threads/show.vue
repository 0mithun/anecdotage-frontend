<template>
  <div class="container">
    <div class="row"  v-if="!needPrivacyUpdate">
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
                    <AdminButtons :thread="thread" />
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

                <div class="row author">
                  <div class="col-md-12">
                    <template v-if="thread.anonymous">
                      <nuxt-link
                        :to="{
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
                        <span>Anonymous</span>
                      </nuxt-link>
                    </template>
                    <template v-else>
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
                    </template>

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
                        class="thread-show-tools d-flex justify-content-between align-items-center flex-wrap"
                      >
                        <up-votes :thread="thread" size="small"></up-votes>
                        <down-votes :thread="thread" size="small"></down-votes>
                        <focusComment size="small"></focusComment>
                        <favorite-thread
                          :thread="thread"
                          size="small"
                        ></favorite-thread>
                        <vote-emojis
                          :thread="thread"
                          size="small"
                          position="top"
                        ></vote-emojis>


                        <ReportThread :thread="thread" />
                        <ShowSource :source="thread.source" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row card-m-5" v-if="thread.thread_image_path != ''">
                  <div class="thread-thumbnail" :style="threadThumbStyle">
                    <!-- <img
                      :src="thread.thread_image_path"
                      :alt="thread.title"
                      class="thread-image thread_thumb_image"
                    /> -->
                      <!-- <img  title="" v-lazy-load
                        :data-src="thread.thread_image_path"
                        :alt="thread.title"
                        class="thread-image thread_thumb_image"
                        heigh="240"
                        width="auto"
                      > -->
                    <client-only>
                      <CoolLightBox
                        :items="lightBoxItems"
                        :index="index"
                        @close="index = null">
                      </CoolLightBox>
                     </client-only>
                      <div class="images-wrapper">
                        <div
                          class="image"
                          v-for="(image, imageIndex) in lightBoxItems"
                          :key="imageIndex"
                          @click="index = imageIndex"
                          :style="{ backgroundImage: 'url(' + image + ')' }"
                        ></div>
                      </div>



                  </div>
                  <image-description :thread="thread"></image-description>
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
                        <focusComment size="small"></focusComment>
                        <favorite-thread
                          :thread="thread"
                          size="small"
                        ></favorite-thread>
                        <vote-emojis
                          :thread="thread"
                          size="small"
                          position="top"
                        ></vote-emojis>
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
     <!-- Modal -->
    <div
      class="modal fade"
      :id="`edit-privacy`"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      v-if="signedIn"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ needPrivacyUpdateMessage }}</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click.prevent="declineUpdatePrivacy"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-check">
              <input
                type="checkbox"
                id="restricted_13"
                value="1"
                v-model="form.restricted_13"
              />
              &nbsp;
              <label for="restricted_13"
                >I confirm that I am 13+ and wish to view PG-13 content</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                id="restricted_18"
                value="1"
                v-model="form.restricted_18"
              />
              &nbsp;
              <label for="restricted_18"
                >I confirm that I am 18+ and wish to view adult content</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="updatePrivacy"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="`edit-privacy`"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      v-if="!signedIn"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">This content is 18+. If you want to show please login or signup.</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click.prevent="declineUpdatePrivacy"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="font-14 fw-400 text-center mt-4">
              Don't have an account yet?
              <a href="#" class="color-blue" @click.prevent="goToRegister">
                Create an account
              </a>
            </p>
            <br>
            <p class="font-14 fw-400 text-center mt-4">
              Already have an account?
              <a href="#" class="color-blue"  @click.prevent="goToLogin"
                >Login</a
              >
            </p>
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
import focusComment from '@/components/comments/FocusComment';

import ReportThread from '@/components/threads/ReportThread';
import ShowSource from '@/components/threads/ShowSource';

import Sidebar from '@/layouts/partials/Sidebar';

import Replies from '@/components/replies/Replies';
import UserOnline from '@/components/chat/UserOnline';
import SimpleMap from '@/components/gmap/SimpleMap';
import scrollToTop from '@/mixins/scrollToTop';
import userStatus from '@/mixins/userStatus'
import AdminButtons from '@/components/threads/AdminButtons';
import { mapGetters } from 'vuex';

import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import ImageDescription from '~/components/threads/ImageDescription.vue';


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
    AdminButtons,
    CoolLightBox,
    ImageDescription
  },
  mixins: [scrollToTop,userStatus],
  head() {
    return {
      title: `${this.settings.site_title}: ${this.stripTagTitle}`,
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
          content: this.stripTagTitle,
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
          content: this.stripTagTitle,
          name: 'twitter:title',
        },
        {
          content: this.thread.seo_meta_description,
          name: 'twitter:description',
        },
        {
          content: this.thread.thread_image_path,
          name: 'twitter:image',
        },

        //Meta Information
        {
          content: this.stripTagTitle,
          name: 'title',
        },
        //Meta Information
        {
          content: this.thread.seo_meta_description,
          name: 'description',
        },
        {
          content: this.thread.seo_meta_keyword + this.settings.seo_meta_keyword,
          name: 'keywords',
        },
      ],
       script: [
          {
            src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
            ssr: false ,
            'data-ad-client':"ca-pub-4366805194029390",
            preconnect: true,
           }
      ]
    };
  },
  data() {
    return {
      imageDescriptionLengthLimit: 20,
      showFullImageDescription: false,
      needPrivacyUpdate: false,
      needPrivacyUpdateMessage: null,

      form: this.$vform({
        restricted_13: 1,
        restricted_18: 1,
      }),
      index: null
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      thread: 'threads/thread',
       profile_user_privacy: 'user/profileUserPrivacy',
    }),
  lightBoxItems(){
    if( this.thread.thread_image_path){
      const lists = []
      lists.push(this.thread.thread_image_path)
      return lists;
    }
    return []
  },
  threadThumbStyle() {
      return `background: rgba(${this.thread.image_path_pixel_color});`;
    },
    threadImageDescriptionLength() {
      if (
        this.thread.image_description == null ||
        this.thread.image_description == ''
      ) {
        return 0;
      }

      const description = this.thread.image_description;
      const splitDescription = description.split(/\s/);

      return splitDescription.length;
    },
    showThreadImageDescriptionLimit() {
      return this.thread.image_description
        .split(/\s/)
        .splice(0, this.imageDescriptionLengthLimit)
        .join(' ');
    },
    stripTagTitle() {
      return this.thread.title.replace(/(<([^>]+)>)/gi, '');
    },
    owns(thread) {
      if (this.signedIn) {
        return this.$store.state.auth.user.id == this.thread.user_id;
      }

      return false;
    },

  },
  async fetch({ params, query, error, $axios, store, redirect }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
      // return { thread: threadRresponse.data};
      store.commit('threads/setCurrentThread', threadRresponse.data);
       if(store.state.auth.loggedIn){
         const userRresponse = await $axios.$get(`profile/${store.state.auth.user.username}`);
         store.commit('user/SET_USER_PRIVACY', userRresponse.data.privacy);
      }

    } catch (err) {
      if (err.response.status === 404) {
        // error({ statusCode: 404, message: 'Thread Not Found' });

        redirect('/');

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
    async copyCut(e) {
      if (window.getSelection) {
        let text = window.getSelection().toString();
        let url = window.location.href;
        // text = `${text} Read More: ${url}/?utm_campaign=clip`;
        text = `${text} Read More: ${url}`;
        await navigator.clipboard.writeText(text);
      }
    },
    async updatePrivacy(){
      try {
        const user = await this.form.put(
          `user/${this.$auth.user.username}/privacy`,
          this.form
        );
        await this.$auth.fetchUser();
        $('#edit-privacy').modal('hide')
        location.reload()
      } catch (error) {

      }
    },
    declineUpdatePrivacy(){
      location.href = '/'
    },
    checkPrivacy(){
      if(this.isAdmin){
        return true;
      }
      if(this.thread.age_restriction == 0){
        return true;
      }else if(this.thread.age_restriction == 13){
        if(!this.signedIn){
          this.needPrivacyUpdate = true;
          this.needPrivacyUpdateMessage = 'This content is 13+. If you want to show please update your privacy.'
          return;
        }
        if(this.profile_user_privacy.restricted_18 == 1 ){
          return true;
        }
        if(this.profile_user_privacy.restricted_13 == 1 ){
          return true;
        }
        this.needPrivacyUpdate = true;
        this.needPrivacyUpdateMessage = 'This content is 13+. If you want to show please update your privacy.'
      }
      else if(this.thread.age_restriction == 18){
        if(!this.signedIn){
          this.needPrivacyUpdate = true;
          this.needPrivacyUpdateMessage = 'This content is 18+. If you want to show please update your privacy.'
          return;
        }
        if(this.profile_user_privacy.restricted_18 == 1 ){
          return true;
        }
        this.needPrivacyUpdate = true;
        this.needPrivacyUpdateMessage = 'This content is 18+. If you want to show please update your privacy.'
      }
    },

    setRedirectUrl(){
      let routeData = this.$router.resolve({
        name: 'threads.show',
        params: { slug: this.thread.slug },
      }).href;

      localStorage.setItem('privacy-redirect-route', 'profile.settings.search');
      localStorage.setItem('thread-show-url', routeData);
    },
    goToLogin(){
      this.setRedirectUrl()

       $('#edit-privacy').modal('hide')
      this.$router.push({name:'login'})
    },
    goToRegister(){
      this.setRedirectUrl()

       $('#edit-privacy').modal('hide')
      this.$router.push({name:'register'})
    },
  },
  mounted() {
    let p = document.querySelectorAll('p');
    let iframe = document.querySelectorAll('iframe');

    for (let i = 0; i < p.length; i++) {
      // x[i].style.backgroundColor = "red";
      p[i].style.marginBottom = '1rem';
    }

    for (let i = 0; i < iframe.length; i++) {
      iframe[i].width = 560;
      iframe[i].height = 315;
    }


    if (process.client) {
      if ('threads.show' === this.$route.name) {
        const threadCard = document.getElementById('thread-card');
        threadCard.addEventListener('copy', this.copyCut);
        threadCard.addEventListener('cut', this.copyCut);
      }
    }

    this.checkPrivacy();

    if(this.needPrivacyUpdate){

      $('#edit-privacy').modal('show')
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
  font-weight: 700;
  // font-family: Raleway, sans-serif;
      font-family: 'Merriweather', serif;
   & > *{
        font-family: 'Merriweather', serif;
      }
}
.count-items-row,
.thread-body-row {
  margin: 15px 0;
}

.thread-body {
  display: inline;

  p {
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
  // display: flex;
  width: 100%;
  text-align: center;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.thread-image {
  display: inline-block;
  max-height: 240px;
  min-height: 240px;
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


p {
  display: inline;
  margin-top: 0;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.thread-body {
  width: 100%;
  height: 100%;
  color:black;

  img {
    max-width: 100%;
  }
}

.thread-body img {
    max-width: 100% !important;
    height: auto;
}
.images-wrapper{
  height:240px;
}


.images-wrapper .image {
    cursor: pointer;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    /* padding-top: 100%; */
    width: 100%;
    height: 100%;
}
</style>
