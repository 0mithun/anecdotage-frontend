<template>
  <div class="counts-item">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" class="svg-inline--fa fa-star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
    <strong>{{ favoriteCounts | formatCount }}</strong>  {{ favoriteCounts | strPlural('favorite') }}
  </div>
</template>

<script>
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
export default {
  mixins: [StrPlural, formatCount],
  props: ["thread"],
  data() {
    return {
      count: this.thread.favorites_count,
    };
  },
  computed: {
    favoriteCounts() {
      return this.count;
    },
  },
  created() {
    this.$nuxt.$on("favoriteAdded-" + this.thread.id, (thread) => {
      this.count = this.count + 1;
    });

    this.$nuxt.$on("favoriteDeleted-" + this.thread.id, (thread) => {
      this.count = this.count + -1;
    });
  },
};
</script>

<style scoped>
.fa-star {
  color: #f6d743;
}

.svg-inline--fa path {
      fill: #f6d743;
}

.svg-inline--fa{
  /* margin-right: 3px; */
}
</style>
