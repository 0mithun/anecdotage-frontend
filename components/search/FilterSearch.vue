<template>
  <div class="card card-m-5">
    <div class="card-body">
      <div class="row">
        <div class="col-md-12 filter-search">
          <div class="count-column">
            {{ threadsCount | formatCount }}
            {{ threadsCount | strPlural('Result') }}
          </div>
          <div class="sort-column">
            <!-- Extra small button group -->
            <div class="btn-group">
              <button
                class="btn btn-link btn-xs dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <template v-if="sort_by == 'top'">
                  <strong class="dark">Top Rated</strong>
                </template>
                <template v-if="sort_by == 'recent'">
                  <strong class="dark">Most Recent</strong>
                </template>
                <template v-if="sort_by == 'like'">
                  <strong class="dark">Most Liked</strong>
                </template>
                <!-- <template v-if="sort_by == 'favorite'">
                  <strong class="dark">Most Favorited</strong>
                </template> -->
                <template v-if="sort_by == 'visits'">
                  <strong class="dark">Most Visits</strong>
                </template>

                <span class="fas fa-caret-down"></span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a href="#" @click.prevent="sortBy('top')">Top Rated</a>
                </li>
                <li>
                  <a href="#" @click.prevent="sortBy('recent')">Most Recent</a>
                </li>
                <li>
                  <a href="#" @click.prevent="sortBy('like')">Most Liked</a>
                </li>
                <li>
                  <a href="#" @click.prevent="sortBy('favorite')"
                    >Most Favorited</a
                  >
                </li>
                <li>
                  <a href="#" @click.prevent="sortBy('visits')">Most Visits</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-link btn-xs dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Tags
              <span class="fas fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu search-dropdown">
              <li v-for="tag in tags" :key="tag.id">
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      :value="tag.id"
                      v-model="filter_tags"
                    />
                    {{ tag.name.toLowerCase() }}
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-link btn-xs dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All People
              <span class="fas fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu search-dropdown">
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      value="C"
                      v-model="category"
                    />
                    Celebrities
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      value="N"
                      v-model="category"
                    />
                    Other notables
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      value="O"
                      v-model="category"
                    />
                    Other People
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-link btn-xs dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Moods
              <span class="fas fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu search-dropdown">
              <li v-for="emoji in emojis" :key="emoji.id">
                <div class="checkbox filter-item">
                  <label class="emoji-filter-label">
                    <input
                      type="checkbox"
                      name="like"
                      id
                      :value="emoji.id"
                      class="filter-emoji-checkbox"
                      v-model="filter_emojis"
                    />
                    <span
                      class="filter-emoji"
                      :class="emoji.name"
                      :key="emoji.id"
                      v-bind:style="{
                        'background-image': `url(${emoji.photo_url})`,
                      }"
                      >{{ emoji.name }}</span
                    >
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-link btn-xs dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Lengths
              <span class="fas fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu search-dropdown">
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="length"
                      id
                      value="sort"
                      v-model="filter_length"
                    />
                    Sort
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="length"
                      id
                      value="medium"
                      v-model="filter_length"
                    />
                    Medium
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="length"
                      id
                      value="long"
                      v-model="filter_length"
                    />
                    Long
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              class="btn btn-link btn-xs dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              G/PG
              <span class="fas fa-caret-down"></span>
            </button>
            <ul class="dropdown-menu search-dropdown">
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      :value="0"
                      v-model="filter_rated"
                    />
                    G-rated
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      :value="13"
                      v-model="filter_rated"
                    />
                    PG-rated
                  </label>
                </div>
              </li>
              <li>
                <div class="checkbox filter-item">
                  <label>
                    <input
                      type="checkbox"
                      name="rated"
                      id
                      :value="18"
                      v-model="filter_rated"
                    />
                    R-rated
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div class="map-column">
            <nuxt-link :to="{ name: 'maps' }" class="map-link">
              <img src="~assets/images/map-icon-red.png" class="map-icon" alt />
              Map
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
export default {
  mixins: [StrPlural, formatCount],
  props: {
    routeName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sort_by: 'top',
      filter_emojis: [],
      filter_rated: [],
      search: false,
      category: [],
      // famous:[0,1],
      filter_tags: [],
      filter_length: [],
      queryString: {},
    };
  },
  computed: {
    ...mapGetters({
      emojis: 'emojis',
      q: 'pagination/q',
    }),

    threads() {
      return this.$store.getters[`${this.routeName}/threads`];
    },
    tags() {
      return this.$store.getters[`${this.routeName}/tags`];
    },
    threadsCount() {
      return this.$store.getters[`${this.routeName}/threadsCount`];
    },
  },

  methods: {
    sortBy(sort) {
      this.sort_by = sort;
      // let threads = _.orderBy(this.allThreads, [this.sort_by], "desc");
      // this.allThreads = threads;
      // this.paginate(this.perPage, this.page);
    },
    filterThreads() {
      this.queryString = {};
      if (this.filter_rated.length > 0) {
        // data = this.filterByRated(this.filter_rated, data);
        this.queryString.ages = this.filter_rated.join(',');
      }

      if (this.category.length > 0) {
        // data = this.filterByCategory(this.category, data);
        this.queryString.cno = this.category.join(',');
      }

      if (this.filter_tags.length > 0) {
        // data = this.filterByTags(this.filter_tags, data);
        this.queryString.tags = this.filter_tags.join(',');
      }

      if (this.filter_emojis.length > 0) {
        // data = this.filterByEmojis(this.filter_emojis, data);
        this.queryString.emojis = this.filter_emojis.join(',');
      }

      if (this.filter_length.length > 0) {
        // data = this.filterByLength(this.filter_length, data);
        this.queryString.length = this.filter_length.join(',');
      }

      if (this.q.hasOwnProperty('q')) {
        this.queryString.q = this.q.q;
      } else {
        if (this.routeName == 'emoji') {
        } else {
          this.$router.push('/');
        }
      }

      this.queryString.sort_by = this.sort_by;

      this.$store.commit('pagination/SET_QUERY_STRING', this.queryString);
      this.$router.push({
        name: this.$route.name,
        query: { ...this.queryString },
      });
    },
  },
  watch: {
    sort_by(filter) {
      this.filterThreads();
    },
    filter_length(filter) {
      this.filterThreads();
    },
    filter_emojis(filter) {
      this.filterThreads();
    },
    filter_rated(filter) {
      this.filterThreads();
    },
    category(filter) {
      this.filterThreads();
    },
    filter_tags(filter) {
      this.filterThreads();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-title {
  margin-top: 10px;
}

.filter-emoji {
  height: 20px;
  background-color: transparent;
  background-size: 20px;
  background-repeat: no-repeat;
  display: flex;
  margin-right: 20px;
  padding-left: 25px;
  align-items: center;
}

.filter-rated {
  display: inline-flex;
  margin-right: 20px;
  padding-top: 3px;
  margin-top: 10px;
}

.btn-link {
  color: #636b6f;
  text-decoration: none;
}

.btn-link:hover {
  color: #636b6f;
  text-decoration: none;
}

.btn-link:focus {
  outline: none;
  text-decoration: none;
}
.dropdown-menu.search-dropdown {
  font-size: 12px;
}

.dropdown-menu.search-dropdown li a:hover {
  background-color: #eeeeee;
}

.filter-item {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
}
.filter-item:hover {
  background-color: #eeeeee;
}
.search-results-sorting {
  display: flex;
  align-items: center;
  color: black;
  font-size: 13px;
}
.search-results-sorting > * {
  margin-right: 25px;
}

.sortBy {
  background-color: transparent;
  border: none;
  outline: none;
  width: auto;
  /* color: rgb(255, 67, 1); */
  color: black;
  font-weight: bold;
  box-shadow: none;
  font-size: 12px;
}
.sortBy:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
hr {
  margin: 5px 0;
}
.map-column a {
  color: black;
  font-size: 13px;
  text-decoration: none;
}

.pagination li {
  cursor: pointer;
}
.filter-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px;
  button.btn {
    font-size: 12px;
  }
}

.count-column {
  font-size: 13px;
}
.dark {
  color: black;
}
.card-body {
  padding-top: 5px;
  padding-bottom: 5px;
}
ul.dropdown-menu li a {
  color: black;
  padding-right: 0px;
  padding-left: 5px;
}

.map-icon {
  margin-right: 5px;
}
.map-link {
  display: flex;
}
.emoji-filter-label {
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
}
</style>
