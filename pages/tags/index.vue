<template>
  <div class="container">
    <div></div>
    <div class="row">
      <div class="col-md-8">
        <div></div>
        <div class="card card-m-5">
          <div class="card-body">
            <div class="row profile-header">
              <div class="profile-avatar">
                <!-- <img :src="tag.photo_url" alt class="profile-img" /> -->
                <img
                  title=""
                  v-lazy-load
                  :data-src="tag.photo_url"
                  :alt="tag.name"
                  class="profile-img"
                  heigh="120"
                  width="120"
                >
                <div
                  style="text-align:center;overflow"
                  @click="showDescription = !showDescription"
                >
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" class="svg-inline--fa fa-question-circle tooltip-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
                </div>
              </div>
              <div class="profile-details">
                <h2 class="profile-name">
                  <span>#{{ tag.name.toLowerCase() }}</span>
                </h2>
                <div class="profile-count">
                  <post-counts :post_count="pageinateData.total"></post-counts>
                  <following-counts
                    :following_count="tag.followers_count"
                  ></following-counts>
                </div>
                <div class="profile-buttons" v-if="signedIn">
                  <button
                    class="btn btn-sm unfollow-btn"
                    @click.prevent="toggleFollow"
                    v-if="isUserFollow"
                  >
                    Unfllow
                  </button>
                  <button
                    class="btn btn-sm follow-btn"
                    @click.prevent="toggleFollow"
                    v-else
                  >
                    Follow
                  </button>
                  <nuxt-link
                  v-if="isAdmin"
                    class="btn btn-sm btn-primary"
                    :to="{ name: 'tag.edit', params: { slug: tag.slug } }"
                    >Edit Tag</nuxt-link
                  >

                </div>
              </div>
            </div>

            <div class="row description" v-if="showDescription">
              <div class="col-md-12">
                <div
                  v-html="tag.description"
                  style="overflow: hidden; overflow-wrap: anywhere"
                ></div>
              </div>
            </div>

              <safe-search :postCounts="postCounts" :totalThreadsCount="totalThreadsCount"></safe-search>

          </div>
        </div>
        <div></div>
        <SingleThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        ></SingleThread>
        <Pagination
          :pagination="pageinateData"
          routeName="tags"
          :param="{ key: 'slug', value: this.tag.slug }"
        />
      </div>
      <div class="col-md-4">
        <div></div>
        <Sidebar />
      </div>
    </div>

  </div>
</template>

<script>
import SingleThread from '@/components/threads/SingeThread';
import Sidebar from '@/layouts/partials/Sidebar';

import PostCounts from '@/components/counts/PostCounts';
import FollowingCounts from '@/components/counts/FollowingCounts';

import Pagination from '@/components/Pagination';
import { mapGetters } from 'vuex';
import scrollToTop from '@/mixins/scrollToTop'
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
import userStatus from '@/mixins/userStatus'
import SafeSearch from '@/components/SafeSearch.vue';
export default {
  name: 'index',
  mixins:[scrollToTop, StrPlural, formatCount, userStatus],
  components: {
    SingleThread,
    Sidebar,
    PostCounts,
    FollowingCounts,
    Pagination,
    SafeSearch,
  },
  data() {
    return {
      isFollow: null,
      showDescription: false,

      tagPhoto: null,
      editTag: false,
    };
  },
  head() {
    return {
      // title: this.settings.site_title,
      title: `${this.tag.name.charAt(0).toUpperCase() + this.tag.name.slice(1)} | Anecdotage | Funny stories & anecdotes about ${this.tag.name}.`,
      // title: 'Funny facts, jokes, stories, and anecdotes about TAG',
      meta: [

        {
          content: this.settings.site_name,
          property: 'og:site_name',
        },
        {
          content: 'Funny facts, jokes, stories, and anecdotes about TAG',
          property: 'og:title',
        },


        //Meta Information
        {
          content: 'Funny facts, jokes, stories, and anecdotes about TAG',
          name: 'title',
        },
        //Meta Information
        {
          content: 'Funny facts, jokes, stories, and anecdotes about' + ' ' + this.tag.name,
          name: 'description',
        },
        {
          content: this.tag.name + ',' + this.settings.seo_meta_keyword,
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
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),

    isUserFollow() {
      return this.isFollow ? this.isFollow : this.tag.is_follow;
    },
    postCounts() {
      // return abbreviate(this.pageinateData.total, 1);
      return this.pageinateData.total;
    },
    totalThreadsCount() {
      return this.$store.state.tags.totalThreadsCount;
    },
    tag() {
      return this.$store.state.tags.tag;
    },
    threads() {
      return this.$store.state.tags.threads;
    },
    pageinateData() {
      return this.$store.state.tags.pageinateData;
    },
  },

  methods: {
    toggleFollow() {
      if (this.isUserFollow) {
        this.$axios.$delete(`tags/${this.tag.slug}/follow`).then((res) => {
          this.isFollow = false;
        });
      } else {
        this.$axios.$post(`tags/${this.tag.slug}/follow`).then((res) => {
          this.isFollow = true;
        });
      }
    },
  },
  // watch: {
  //   '$route.query': '$fetch'
  // },

  watchQuery: true,

  async fetch({ params, query, error, $axios, store }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');

    try {
      const tagRresponse = await $axios.$get(`tags/${params.slug}?${q}`);
      store.commit('tags/setTags', tagRresponse.tag.data);
      store.commit('tags/setThreads', tagRresponse.threads.data);
      store.commit('tags/setPageinateData', tagRresponse.threads.meta);
      store.commit('tags/setTotalThreadsCount', tagRresponse.total_threads_count);
    } catch (err) {
      if (err.response.status === 404) {
        // error({ statusCode: 404, message: 'Tag Not Found' });
        redirect('/');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>




<style  scoped>
.profile-header {
  margin: 30px auto;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0px;
}
.profile-name {
  padding: 0;
  margin: 0;
  font-size: 36px;
  font-weight: 500;
  line-height: 40px;
}
.profile-name span {
  color: rgb(255, 67, 1);
  color: #ed7d30;
}
.profile-buttons {
  padding: 10px 0px;
}
.profile-img {
  width: 120px;
  height: 120px;
  padding: 3px;
  border: 2px solid rgb(255, 67, 1);
  border-radius: 50%;
  display: block;
}

.profile-avatar {
  margin-right: 30px;
}
.profile-count {
  display: flex;
  align-items: center;
}

.profile-count > * {
  margin-left: 5px;
  margin-right: 5px;
}

.follow-btn {
  width: 100px;
  background-color: rgb(255, 67, 1);
  color: white;
}

.unfollow-btn {
  width: 100px;
  background-color: red;
  color: white;
}

.single-tags-name {
  color: black;
}
.single-tags-name span {
  color: rgb(255, 67, 1);
}
.post-counts {
  color: black;
  padding: 0;
  font-weight: bold;
  padding-bottom: 0px;
}
.sidebar {
  /* margin: 30px auto; */
}

.pagination li {
  cursor: pointer;
}

.tools-row {
  margin-bottom: 20px;
}

.tooltip-icon {
  font-size: 14px;
  cursor: pointer;
}

.description {
  transition: cubic-bezier(0.075, 0.82, 0.165, 0.3) ease-in;
  overflow: hidden;
}

.thread-thumb-placeholder {
  width: 100px;
  height: 100px;
  background-color: #eeeeee;
}

#tinymce iframe {
  width: 100% !important;
  height: 350px !important;
}
.tox-tinymce {
  min-height: 500px !important;
}

.error {
  color: red;
}
.help-block.error {
  color: red;
}

a.btn.cart-btn {
  font-size: 12px;
}
</style>

