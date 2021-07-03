<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="card card-m-5">
          <div class="card-body">
            <div class="row profile-header">
              <div class="profile-avatar">
                <img :src="tag.photo_url" alt class="profile-img" />
                <div
                  style="text-align:center;overflow"
                  @click="showDescription = !showDescription"
                >
                  <i class="fa fa-question-circle tooltip-icon"></i>
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
                <div class="profile-buttons">
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
                    class="btn btn-sm btn-primary"
                    :to="{ name: 'tag.edit', params: { slug: tag.slug } }"
                    >Edit Tag</nuxt-link
                  >
                  <!-- <button
                    class="btn btn-sm btn-primary"
                    @click.prevent="editTag = true"
                    v-if="isAdmin"
                  >
                    Edit Tag
                  </button> -->
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

            <div class="row">
              <div class="col-md-12">
                <div class="post-header">
                  <div class="post-counts">
                    {{ postCounts | formatCount }}
                    {{ postCounts | strPlural('post') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
export default {
  name: 'index',
  components: {
    SingleThread,
    Sidebar,
    PostCounts,
    FollowingCounts,
    Pagination,
  },
  data() {
    return {
      isFollow: null,
      showDescription: false,

      tagPhoto: null,
      // posts: this.threads,
      // followings: [],
      // isFollow: null,
      editTag: false,
    };
  },
  head() {
    return {
      // title: this.settings.site_title,
      title: 'Funny facts, jokes, stories, and anecdotes about TAG',
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
          content: 'Funny facts, jokes, stories, and anecdotes about TAG' + ' ' + this.tag.name,
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
            async: true
           }
      ]
    };
  },
  mounted() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
    isAdmin() {
      if (this.$auth.loggedIn) {
        return this.$store.state.auth.user.is_admin;
      }
      return false;
    },
    isUserFollow() {
      return this.isFollow ? this.isFollow : this.tag.is_follow;
    },
    postCounts() {
      // return abbreviate(this.pageinateData.total, 1);
      return this.pageinateData.total;
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
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Tag Not Found' });
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
  font-size: 30px;
  font-weight: 500;
  line-height: 33px;
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

