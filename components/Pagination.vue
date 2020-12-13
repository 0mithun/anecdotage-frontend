<template>
  <nav v-if="show" >
    <ul class="pagination">
      <li :class="{ disabled: ! prev }" class="page-item">
        <nuxt-link :to="{name:routeName, params:{'param.key': 'param.value'}, query: {page: 1}}" class="page-link">
        <span>&laquo;</span>
        </nuxt-link>
        </li>
      <li v-for="(link, index) in links" :key="index"  :class="{ active: pagination.current_page == link, disabled: isNaN(link) }" class="page-item">
        <nuxt-link :to="{name:routeName, params:{'param.key': 'param.value'}, query: {page: link}}" class="page-link">
          <span>
            <span>{{ link }}</span>
          </span>
        </nuxt-link>
      </li>
      <li :class="{ disabled: ! next }"  class="page-item">
        <nuxt-link  :to="{name:routeName, params:{'param.key': 'param.value'}, query: {page: next}}" class="page-link">
            <span aria-hidden="true">&raquo;</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
     props:{
        pagination:{
          type:Object,
          required: true
        },
        routeName:{
          type: String,
          required: true,
        },
        param:{
          type: Object,
          required: true
        }
    },
    data(){
      return {
        limit: 4
      }
    },

    computed: {
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
                return (this.pagination.current_page + range.length) <= this.pagination.last_page ? range.concat(last) : range;
            } else if (this.pagination.current_page > (this.pagination.last_page - this.limit)) {
                range = this.range(this.pagination.last_page - (this.limit), this.pagination.last_page);
                return (this.pagination.current_page - range.length) >= 1 ? first.concat(range) : range;
            } else {
                range = this.range(this.pagination.current_page - Math.ceil(this.limit / 2), this.pagination.current_page + Math.ceil(this.limit / 2));
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
            return this.pagination.last_page > 1
        }
    },
    methods: {
        range (start, end) {
            let pages = [];

            for (let i = start - 1; i < end; i++) {
                if (this.pages[i]) {
                    pages.push(this.pages[i]);
                }
            }
            return pages;        },
        go(page) {
            if (isNaN(page)) {
                return;
            }
        }
    }
  }
</script>


