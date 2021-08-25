<template>
  <nav>
    <ul class="pagination" v-if="show">
      <li :class="{ disabled: !prev }" class="page-item">

        <!-- <a @click.prevent="goToPage(1)" class="page-link" :href="`?page=1`">
          <span>
            <span>&laquo;</span>
          </span>
        </a> -->
        <a @click.prevent="goToPage(1)" class="page-link" href="#">
          <span>
            <span>&laquo;</span>
          </span>
        </a>
      </li>

      <li
        v-for="(link, index) in links"
        :key="index"
        :class="{
          active: pagination.current_page == link,
          disabled: isNaN(link),
        }"
        class="page-item"


      >
        <a
          @click.prevent="goToPage(1)"
          class="page-link"
          :rel="getRelation(link)"
          href="#"
          v-if="link == 1"
        >
          <span>
            <span>{{ link }}</span>
          </span>
        </a>
        <a
          @click.prevent="goToPage(link)"
          class="page-link"
          :rel="getRelation(link)"
          :href="`?page=${link}`"
          v-else
        >
          <span>
            <span>{{ link }}</span>
          </span>
        </a>
      </li>
      <li :class="{ disabled: !next }" class="page-item">
        <a
          @click.prevent="goToPage(pagination.last_page)"
          class="page-link"
          :href="`?page=${pagination.last_page}`"
        >
          <span>
            <span>&raquo;</span>
          </span>
        </a>
      </li>
    </ul>
    <div
      class="alert alert-danger card-m-5"
      v-if="pagination.total < 1 || pagination.from == null"
    >
      No Results Found
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
    param: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      limit: 4,
      // q: {}
    };
  },

  computed: {
    ...mapGetters({
      q: 'pagination/q',
    }),
    pages() {
      let pages = [];
      for (let i = 1; i <= this.pagination.last_page; i++) {
        pages.push(i);
      }
      return pages;
    },
    links() {
      let first = [1, '...'],
        last = ['...', this.pagination.last_page],
        range = [];

      if (this.pagination.current_page <= this.limit) {
        range = this.range(1, this.limit + 1);
        return this.pagination.current_page + range.length <=
          this.pagination.last_page
          ? range.concat(last)
          : range;
      } else if (
        this.pagination.current_page >
        this.pagination.last_page - this.limit
      ) {
        range = this.range(
          this.pagination.last_page - this.limit,
          this.pagination.last_page
        );
        return this.pagination.current_page - range.length >= 1
          ? first.concat(range)
          : range;
      } else {
        range = this.range(
          this.pagination.current_page - Math.ceil(this.limit / 2),
          this.pagination.current_page + Math.ceil(this.limit / 2)
        );
        return first.concat(range).concat(last);
      }
    },
    next() {
      let next = this.pagination.current_page + 1;
      return next <= this.pagination.last_page ? next : false;
    },
    prev() {
      return this.pagination.current_page - 1;
    },
    show() {
      return this.pagination.last_page > 1;
    },
  },
  methods: {
    getRelation(link){
      if((this.pagination.current_page - 1) == link){
        return 'next'
      }
      else if((this.pagination.current_page  + 1 ) == link){
        return 'prev'
      }
      else if(this.pagination.current_page == link){
        return 'canonical'
      }else {
        return false;
      }
    },
    range(start, end) {
      let pages = [];

      for (let i = start - 1; i < end; i++) {
        if (this.pages[i]) {
          pages.push(this.pages[i]);
        }
      }
      return pages;
    },
    go(page) {
      if (isNaN(page)) {
        return;
      }
    },
    goToFirstPage(){
      let params = {};
      params[this.param.key] = this.param.value;
      console.log(params)
       this.$router.push({
        name: this.routeName,
        params: params,
        query: {...this.q },
      });
    },
    goToPage(link) {
      let params = {};
      params[this.param.key] = this.param.value;
      this.$router.push({
        name: this.routeName,
        params: params,
        query: { page: link, ...this.q },
      });

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
};
</script>


